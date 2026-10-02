from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from typing import List

from app.database import get_db
from app.models.all_models import User, Need, Item, ItemCategory
from app.schemas.schemas import NeedCreate, NeedResponse
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/", response_model=NeedResponse)
def create_need(req: NeedCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Creates a buyer/receiver resource need."""
    item = db.query(Item).filter(
        Item.category == req.category,
        Item.canonical_name == req.item_name
    ).first()

    if not item:
        item = Item(
            category=req.category,
            canonical_name=req.item_name
        )
        db.add(item)
        db.commit()
        db.refresh(item)

    needed_by = datetime.now(timezone.utc) + timedelta(hours=req.needed_within_hours or 12)

    need = Need(
        requester_id=user.id,
        item_id=item.id,
        title=f"Need {req.quantity} {req.unit} {req.item_name}",
        quantity=req.quantity,
        unit=req.unit,
        needed_by=needed_by,
        purpose=req.purpose,
        preferred_mode=req.preferred_mode,
        fulfillment_preference=req.fulfillment_preference,
        latitude=req.latitude,
        longitude=req.longitude,
        address=req.address,
        status="ACTIVE",
        notes=req.notes
    )
    db.add(need)
    db.commit()
    db.refresh(need)

    return need

@router.get("/me", response_model=List[NeedResponse])
def get_my_needs(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Lists resource needs requested by the logged-in user."""
    return db.query(Need).filter(Need.requester_id == user.id).order_by(Need.created_at.desc()).all()

@router.get("/{id}", response_model=NeedResponse)
def get_need_by_id(id: str, db: Session = Depends(get_db)):
    """Fetches single need request details by ID."""
    need = db.query(Need).filter(Need.id == id).first()
    if not need:
        raise HTTPException(status_code=404, detail="Need not found")
    return need
