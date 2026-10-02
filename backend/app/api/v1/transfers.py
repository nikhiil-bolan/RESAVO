from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from typing import List

from app.database import get_db
from app.models.all_models import (
    User, Transfer, Verification, Dispute, ImpactEvent, TransferStatus, ItemCategory
)
from app.schemas.schemas import PickupConfirmRequest, ReceiptConfirmRequest, DisputeCreateRequest
from app.api.deps import get_current_user

router = APIRouter()

@router.get("/me")
def get_my_transfers(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Lists transfers associated with user's offers or needs."""
    transfers = db.query(Transfer).all()
    # Filter for user's relevant transfers
    user_transfers = []
    for t in transfers:
        if t.match and (t.match.offer.provider_id == user.id or t.match.need.requester_id == user.id):
            user_transfers.append({
                "id": t.id,
                "match_id": t.match_id,
                "title": t.match.offer.title,
                "category": t.match.offer.item.category,
                "quantity": t.match.offer.quantity,
                "unit": t.match.offer.unit,
                "mode": t.mode,
                "status": t.status,
                "pickup_confirmed_at": t.pickup_confirmed_at,
                "receipt_confirmed_at": t.receipt_confirmed_at,
                "created_at": t.created_at,
                "provider_name": t.match.offer.provider.full_name,
                "requester_name": t.match.need.requester.full_name
            })
    return user_transfers

@router.get("/{id}")
def get_transfer_detail(id: str, db: Session = Depends(get_db)):
    """Gets detailed transfer tracking state with verification history."""
    transfer = db.query(Transfer).filter(Transfer.id == id).first()
    if not transfer:
        raise HTTPException(status_code=404, detail="Transfer not found")

    return {
        "id": transfer.id,
        "match_id": transfer.match_id,
        "status": transfer.status,
        "mode": transfer.mode,
        "offer_title": transfer.match.offer.title,
        "category": transfer.match.offer.item.category,
        "quantity": transfer.match.offer.quantity,
        "unit": transfer.match.offer.unit,
        "provider": {
            "name": transfer.match.offer.provider.full_name,
            "address": transfer.match.offer.address_approx
        },
        "requester": {
            "name": transfer.match.need.requester.full_name,
            "address": transfer.match.need.address
        },
        "pickup_confirmed_at": transfer.pickup_confirmed_at,
        "receipt_confirmed_at": transfer.receipt_confirmed_at,
        "verifications": [
            {
                "event_type": v.event_type,
                "quantity_verified": v.quantity_verified,
                "condition_verified": v.condition_verified,
                "timestamp": v.timestamp
            } for v in transfer.verifications
        ]
    }

@router.post("/{id}/pickup")
def confirm_pickup(id: str, req: PickupConfirmRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Pickup Verification Step: Sender or courier confirms quantity and condition at pickup."""
    transfer = db.query(Transfer).filter(Transfer.id == id).first()
    if not transfer:
        raise HTTPException(status_code=404, detail="Transfer not found")

    now = datetime.now(timezone.utc)
    transfer.status = TransferStatus.PICKED_UP
    transfer.pickup_confirmed_at = now
    transfer.pickup_notes = req.notes

    verification = Verification(
        transfer_id=transfer.id,
        actor_id=user.id,
        event_type="PICKUP",
        quantity_verified=req.quantity,
        condition_verified=req.condition,
        evidence_url=req.evidence_url
    )
    db.add(verification)
    db.commit()

    return {"status": "SUCCESS", "message": "Pickup confirmed successfully", "transfer_status": transfer.status}

@router.post("/{id}/receive")
def confirm_receipt(id: str, req: ReceiptConfirmRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Receipt Verification Step: Receiver confirms quantity received and condition.
    Triggers addition of verified outcome into the Impact Ledger!
    """
    transfer = db.query(Transfer).filter(Transfer.id == id).first()
    if not transfer:
        raise HTTPException(status_code=404, detail="Transfer not found")

    now = datetime.now(timezone.utc)
    transfer.status = TransferStatus.COMPLETED
    transfer.receipt_confirmed_at = now
    transfer.receipt_notes = req.notes

    # Update parent offer and need status to completed
    transfer.match.offer.status = "COMPLETED"
    transfer.match.need.status = "COMPLETED"

    # Add verification event
    verification = Verification(
        transfer_id=transfer.id,
        actor_id=user.id,
        event_type="RECEIPT",
        quantity_verified=req.quantity_received,
        condition_verified=req.condition_accepted,
        evidence_url=req.evidence_url
    )
    db.add(verification)

    # Calculate monetary value preserved (estimated average INR per unit)
    unit_value_inr = {
        ItemCategory.DAIRY: 60.0,  # e.g. 60 INR per kg milk
        ItemCategory.FRESH_FOOD: 40.0,
        ItemCategory.CLOTHING: 300.0,
        ItemCategory.EDUCATION: 150.0,
        ItemCategory.BAKERY_PACKAGED: 50.0
    }.get(transfer.match.offer.item.category, 50.0)

    value_preserved = req.quantity_received * unit_value_inr

    # Add to Verified Impact Ledger
    impact_event = ImpactEvent(
        source_event="TRANSFER_COMPLETED",
        user_id=user.id,
        item_category=transfer.match.offer.item.category,
        quantity_preserved=req.quantity_received,
        unit=transfer.match.offer.unit,
        value_preserved_inr=value_preserved,
        verified=True
    )
    db.add(impact_event)

    db.commit()

    return {
        "status": "SUCCESS",
        "message": "Receipt confirmed! Verified impact recorded.",
        "transfer_status": transfer.status,
        "quantity_preserved": req.quantity_received,
        "verified_value_inr": value_preserved
    }

@router.post("/{id}/dispute")
def create_dispute(id: str, req: DisputeCreateRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Files a dispute on a damaged or unfulfilled transfer."""
    transfer = db.query(Transfer).filter(Transfer.id == id).first()
    if not transfer:
        raise HTTPException(status_code=404, detail="Transfer not found")

    transfer.status = TransferStatus.DISPUTED
    dispute = Dispute(
        transfer_id=transfer.id,
        reporter_id=user.id,
        reason=req.reason,
        evidence_notes=req.evidence_notes,
        status="OPEN"
    )
    db.add(dispute)
    db.commit()

    return {"status": "SUCCESS", "message": "Dispute filed for admin resolution"}
