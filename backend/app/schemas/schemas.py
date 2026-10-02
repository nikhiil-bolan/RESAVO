from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.all_models import UserRole, ProfileType, OfferMode, ItemCategory, MatchDecision, TransferStatus, VerificationState

# Auth Schemas
class SendOTPRequest(BaseModel):
    phone_or_email: str = Field(..., example="9876543210@resavo.org")

class VerifyOTPRequest(BaseModel):
    phone_or_email: str = Field(..., example="9876543210@resavo.org")
    otp: str = Field(..., example="123456")

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    active_role: UserRole
    full_name: str

class RoleSwitchRequest(BaseModel):
    role: UserRole

# Item & Offer Schemas
class OfferCreate(BaseModel):
    category: ItemCategory
    item_name: str
    quantity: float
    unit: str
    condition: str = "Good"
    offer_mode: OfferMode = OfferMode.FREE
    expected_price: Optional[float] = 0.0
    available_hours: Optional[int] = 24
    pickup_preference: str = "Buyer Pickup"
    latitude: float
    longitude: float
    address_approx: str
    photo_url: Optional[str] = None
    notes: Optional[str] = None

class OfferResponse(BaseModel):
    id: str
    provider_id: str
    title: str
    category: ItemCategory
    quantity: float
    unit: str
    condition: str
    offer_mode: OfferMode
    expected_price: float
    available_until: Optional[datetime]
    pickup_preference: str
    address_approx: str
    status: str
    at_risk: bool
    risk_reason: Optional[str]
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

# Need Schemas
class NeedCreate(BaseModel):
    category: ItemCategory
    item_name: str
    quantity: float
    unit: str
    needed_within_hours: Optional[int] = 12
    purpose: str = "Personal use"
    preferred_mode: OfferMode = OfferMode.FREE
    fulfillment_preference: str = "Either"
    latitude: float
    longitude: float
    address: str
    notes: Optional[str] = None

class NeedResponse(BaseModel):
    id: str
    requester_id: str
    title: str
    category: ItemCategory
    quantity: float
    unit: str
    needed_by: Optional[datetime]
    purpose: str
    preferred_mode: OfferMode
    fulfillment_preference: str
    address: str
    status: str
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

# Match Schemas
class MatchSuggestionResponse(BaseModel):
    id: str
    offer_id: str
    need_id: str
    score: float
    decision: MatchDecision
    explanation: str
    reasons: List[str]
    alternative_details: Optional[Dict[str, Any]] = None
    offer: OfferResponse
    need: NeedResponse

class MatchActionRequest(BaseModel):
    reason: Optional[str] = None

# Transfer & Verification Schemas
class TransferResponse(BaseModel):
    id: str
    match_id: str
    mode: str
    planned_time: Optional[datetime]
    status: TransferStatus
    pickup_confirmed_at: Optional[datetime]
    receipt_confirmed_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True

class PickupConfirmRequest(BaseModel):
    quantity: float
    condition: str
    notes: Optional[str] = None
    evidence_url: Optional[str] = None

class ReceiptConfirmRequest(BaseModel):
    quantity_received: float
    condition_accepted: str
    notes: Optional[str] = None
    evidence_url: Optional[str] = None

class DisputeCreateRequest(BaseModel):
    reason: str
    evidence_notes: str

# Impact & Admin Schemas
class ImpactSummaryResponse(BaseModel):
    total_quantity_preserved: float
    verified_value_inr: float
    completed_transfers: int
    community_needs_fulfilled: int
    unnecessary_transfers_avoided: int
    estimated_vs_verified_breakdown: Dict[str, Any]

class AdminMetricsResponse(BaseModel):
    active_users: int
    active_sellers: int
    active_buyers: int
    total_organizations: int
    active_offers: int
    active_needs: int
    successful_match_rate: float
    verified_value_preserved_inr: float
    system_health_pct: float
    unresolved_disputes: int
