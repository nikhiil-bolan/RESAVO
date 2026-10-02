from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from typing import List

from app.database import get_db
from app.models.all_models import User, Offer, Item, ItemEvidence, ItemCategory
from app.schemas.schemas import OfferCreate, OfferResponse
from app.api.deps import get_current_user
from app.services.food_intelligence import FoodIntelligenceService
from app.services.ai_service import AIServiceInterface

router = APIRouter()

@router.post("/", response_model=OfferResponse)
def create_offer(req: OfferCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Creates a resource offer with food risk analysis and AI image suggestions."""
    # Find or create item definition
    item = db.query(Item).filter(
        Item.category == req.category,
        Item.canonical_name == req.item_name
    ).first()

    if not item:
        item = Item(
            category=req.category,
            canonical_name=req.item_name,
            handling_class="REFRIGERATED" if req.category in [ItemCategory.DAIRY, ItemCategory.PREPARED_SURPLUS_FOOD] else "STANDARD"
        )
        db.add(item)
        db.commit()
        db.refresh(item)

    # Calculate expiration time
    available_until = datetime.now(timezone.utc) + timedelta(hours=req.available_hours or 24)

    # Calculate food risk score
    risk_info = FoodIntelligenceService.calculate_loss_risk(req.category, req.available_hours or 24)

    offer = Offer(
        provider_id=user.id,
        item_id=item.id,
        title=f"{req.quantity} {req.unit} {req.item_name}",
        quantity=req.quantity,
        unit=req.unit,
        condition=req.condition,
        offer_mode=req.offer_mode,
        expected_price=req.expected_price or 0.0,
        available_until=available_until,
        pickup_preference=req.pickup_preference,
        latitude=req.latitude,
        longitude=req.longitude,
        address_approx=req.address_approx,
        status="ACTIVE",
        at_risk=risk_info["at_risk"],
        risk_reason=risk_info["recommended_action"] if risk_info["at_risk"] else None,
        notes=req.notes
    )
    db.add(offer)
    db.commit()
    db.refresh(offer)

    # Add evidence if photo provided
    if req.photo_url:
        evidence = ItemEvidence(
            offer_id=offer.id,
            photo_url=req.photo_url,
            source_type="USER_UPLOAD",
            condition_declared=req.condition,
            ai_confidence=0.95
        )
        db.add(evidence)
        db.commit()

    return offer

@router.get("/me", response_model=List[OfferResponse])
def get_my_offers(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Fetches active and past offers created by the logged-in user."""
    return db.query(Offer).filter(Offer.provider_id == user.id).order_by(Offer.created_at.desc()).all()

@router.get("/{id}", response_model=OfferResponse)
def get_offer_by_id(id: str, db: Session = Depends(get_db)):
    """Fetches single offer details by ID."""
    offer = db.query(Offer).filter(Offer.id == id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    return offer

@router.post("/{id}/cancel")
def cancel_offer(id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Cancels an active offer."""
    offer = db.query(Offer).filter(Offer.id == id, Offer.provider_id == user.id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found or unauthorized")
    offer.status = "CANCELLED"
    db.commit()
    return {"status": "SUCCESS", "message": "Offer cancelled successfully"}

@router.post("/classify-image")
def classify_image(photo_url: str):
    """AI endpoint: Returns category suggestion and confidence score for uploaded photos."""
    return AIServiceInterface.classify_item_image(photo_url)
