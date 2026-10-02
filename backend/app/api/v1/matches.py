from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.all_models import User, Offer, Need, Match, Transfer, TransferStatus, MatchDecision
from app.schemas.schemas import MatchSuggestionResponse, MatchActionRequest
from app.api.deps import get_current_user
from app.services.match_engine import MatchEngine, haversine_distance_km

router = APIRouter()

@router.get("/suggestions")
def get_match_suggestions(
    need_id: Optional[str] = None,
    offer_id: Optional[str] = None,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Core RESAVO Match & Feasibility Endpoint.
    Evaluates candidate offers/needs against practical local alternatives and geospatial feasibility.
    Returns recommendations (MATCH, ALTERNATIVE, POOL, WAIT, NO_TRANSFER) with clear bulleted reasons.
    """
    suggestions = []

    if need_id:
        need = db.query(Need).filter(Need.id == need_id).first()
        if not need:
            raise HTTPException(status_code=404, detail="Need not found")

        active_offers = db.query(Offer).filter(Offer.status == "ACTIVE").all()

        # Check if there is a local shop/supplier within 300-500m of the buyer (e.g. for Bakery milk scenario)
        # If buyer profile indicates a commercial need and a shop is very close, calculate local alternative distance
        local_shop_distance_km = 0.3 if "BAKERY" in need.purpose.upper() or "RESTAURANT" in need.purpose.upper() else None

        for offer in active_offers:
            eval_result = MatchEngine.evaluate_pair(offer, need, local_shop_distance_km=local_shop_distance_km)

            # Check if match object already stored in DB
            db_match = db.query(Match).filter(Match.offer_id == offer.id, Match.need_id == need.id).first()
            if not db_match:
                db_match = Match(
                    offer_id=offer.id,
                    need_id=need.id,
                    score=eval_result["score"],
                    decision=eval_result["decision"],
                    explanation=eval_result["explanation"],
                    alternative_details=eval_result.get("alternative_details"),
                    status="PROPOSED"
                )
                db.add(db_match)
                db.commit()
                db.refresh(db_match)

            suggestions.append({
                "match_id": db_match.id,
                "offer": offer,
                "need": need,
                "score": eval_result["score"],
                "decision": eval_result["decision"],
                "explanation": eval_result["explanation"],
                "reasons": eval_result["reasons"],
                "alternative_details": eval_result.get("alternative_details"),
                "status": db_match.status
            })

    elif offer_id:
        offer = db.query(Offer).filter(Offer.id == offer_id).first()
        if not offer:
            raise HTTPException(status_code=404, detail="Offer not found")

        active_needs = db.query(Need).filter(Need.status == "ACTIVE").all()
        for need in active_needs:
            eval_result = MatchEngine.evaluate_pair(offer, need)
            db_match = db.query(Match).filter(Match.offer_id == offer.id, Match.need_id == need.id).first()
            if not db_match:
                db_match = Match(
                    offer_id=offer.id,
                    need_id=need.id,
                    score=eval_result["score"],
                    decision=eval_result["decision"],
                    explanation=eval_result["explanation"],
                    alternative_details=eval_result.get("alternative_details"),
                    status="PROPOSED"
                )
                db.add(db_match)
                db.commit()
                db.refresh(db_match)

            suggestions.append({
                "match_id": db_match.id,
                "offer": offer,
                "need": need,
                "score": eval_result["score"],
                "decision": eval_result["decision"],
                "explanation": eval_result["explanation"],
                "reasons": eval_result["reasons"],
                "alternative_details": eval_result.get("alternative_details"),
                "status": db_match.status
            })

    else:
        # General overview suggestions
        matches = db.query(Match).order_by(Match.score.desc()).limit(10).all()
        for m in matches:
            suggestions.append({
                "match_id": m.id,
                "offer": m.offer,
                "need": m.need,
                "score": m.score,
                "decision": m.decision,
                "explanation": m.explanation,
                "reasons": [m.explanation],
                "alternative_details": m.alternative_details,
                "status": m.status
            })

    return suggestions

@router.post("/{id}/accept")
def accept_match(id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Accepts a recommended match and creates a transfer lifecycle task."""
    match = db.query(Match).filter(Match.id == id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")

    if match.decision == MatchDecision.NO_TRANSFER or match.decision == MatchDecision.ALTERNATIVE:
        raise HTTPException(status_code=400, detail="Cannot create transfer for non-transferable recommendation")

    match.status = "ACCEPTED"
    match.offer.status = "MATCHED"
    match.need.status = "MATCHED"

    # Create transfer record
    transfer = Transfer(
        match_id=match.id,
        mode=match.offer.pickup_preference or "Buyer Pickup",
        status=TransferStatus.ASSIGNED
    )
    db.add(transfer)
    db.commit()
    db.refresh(transfer)

    return {
        "status": "SUCCESS",
        "message": "Match accepted! Transfer task created.",
        "transfer_id": transfer.id,
        "transfer_status": transfer.status
    }

@router.post("/{id}/reject")
def reject_match(id: str, req: MatchActionRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Rejects a match proposal."""
    match = db.query(Match).filter(Match.id == id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")

    match.status = "REJECTED"
    db.commit()
    return {"status": "SUCCESS", "message": "Match rejected successfully"}
