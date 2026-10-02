from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models.all_models import User, UserRole

security_scheme = HTTPBearer(auto_error=False)

def get_current_user(
    db: Session = Depends(get_db),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme)
) -> User:
    if not credentials:
        # Development fallback mode user if token not provided
        dev_user = db.query(User).filter(User.phone_or_email == "dev_user@resavo.org").first()
        if not dev_user:
            dev_user = User(
                phone_or_email="dev_user@resavo.org",
                full_name="Asha Sharma",
                role_flags=["SELLER", "BUYER", "ADMIN"],
                active_role=UserRole.SELLER
            )
            db.add(dev_user)
            db.commit()
            db.refresh(dev_user)
        return dev_user

    token = credentials.credentials
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token claims")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if user.status == "SUSPENDED":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account suspended")
    return user
