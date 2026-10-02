from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from jose import jwt

from app.config import settings
from app.database import get_db
from app.models.all_models import User, Profile, UserRole, ProfileType
from app.schemas.schemas import SendOTPRequest, VerifyOTPRequest, TokenResponse, RoleSwitchRequest
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/send-otp")
def send_otp(req: SendOTPRequest):
    """Sends OTP to user phone or email."""
    # In production, integrates with FCM/SMS gateway. In dev/test mode, OTP is 123456.
    return {
        "status": "SUCCESS",
        "message": f"OTP sent to {req.phone_or_email}",
        "dev_note": "Use OTP 123456 for testing"
    }

@router.post("/verify-otp", response_model=TokenResponse)
def verify_otp(req: VerifyOTPRequest, db: Session = Depends(get_db)):
    """Verifies OTP and issues JWT token."""
    if req.otp != "123456":
        raise HTTPException(status_code=400, detail="Invalid OTP code")

    user = db.query(User).filter(User.phone_or_email == req.phone_or_email).first()
    if not user:
        # Create user on first sign in
        user = User(
            phone_or_email=req.phone_or_email,
            full_name=req.phone_or_email.split("@")[0].capitalize(),
            role_flags=["SELLER", "BUYER"],
            active_role=UserRole.SELLER
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        # Create default profile
        profile = Profile(
            user_id=user.id,
            profile_type=ProfileType.INDIVIDUAL,
            address="Koramangala, Bangalore",
            latitude=12.9352,
            longitude=77.6245
        )
        db.add(profile)
        db.commit()

    token_data = {"sub": user.id, "role": user.active_role.value}
    expires_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = jwt.encode({"sub": user.id, "exp": datetime.now(timezone.utc) + expires_delta}, settings.JWT_SECRET, algorithm=settings.ALGORITHM)

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user_id=user.id,
        active_role=user.active_role,
        full_name=user.full_name
    )

@router.get("/me")
def get_me(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Fetches current user profile and active role capabilities."""
    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    return {
        "id": user.id,
        "phone_or_email": user.phone_or_email,
        "full_name": user.full_name,
        "role_flags": user.role_flags,
        "active_role": user.active_role,
        "status": user.status,
        "profile": {
            "profile_type": profile.profile_type if profile else "INDIVIDUAL",
            "address": profile.address if profile else "",
            "latitude": profile.latitude if profile else 0.0,
            "longitude": profile.longitude if profile else 0.0,
            "verification_state": profile.verification_state if profile else "UNVERIFIED"
        }
    }

@router.post("/role")
def switch_role(req: RoleSwitchRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Switches current active role between SELLER, BUYER, and ADMIN."""
    if req.role.value not in user.role_flags and user.active_role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Role not granted to user account")

    user.active_role = req.role
    db.commit()
    return {"status": "SUCCESS", "active_role": user.active_role}
