import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column, String, Text, Float, Integer, Boolean, DateTime, ForeignKey, Enum as SQLEnum, JSON
)
from sqlalchemy.orm import relationship
import enum
from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

def utc_now():
    return datetime.now(timezone.utc)

class UserRole(str, enum.Enum):
    SELLER = "SELLER"
    BUYER = "BUYER"
    ADMIN = "ADMIN"

class ProfileType(str, enum.Enum):
    INDIVIDUAL = "INDIVIDUAL"
    FAMILY = "FAMILY"
    BAKERY = "BAKERY"
    RESTAURANT = "RESTAURANT"
    NGO = "NGO"
    SCHOOL = "SCHOOL"
    HOSTEL = "HOSTEL"
    COMMUNITY_KITCHEN = "COMMUNITY_KITCHEN"
    INSTITUTION = "INSTITUTION"

class OfferMode(str, enum.Enum):
    SELL = "SELL"
    LOW_PRICE = "LOW_PRICE"
    FREE = "FREE"
    DONATE = "DONATE"
    EXCHANGE = "EXCHANGE"
    COMMUNITY_TRANSFER = "COMMUNITY_TRANSFER"

class ItemCategory(str, enum.Enum):
    FRESH_FOOD = "FRESH_FOOD"
    DAIRY = "DAIRY"
    BAKERY_PACKAGED = "BAKERY_PACKAGED"
    STAPLES_INGREDIENTS = "STAPLES_INGREDIENTS"
    PREPARED_SURPLUS_FOOD = "PREPARED_SURPLUS_FOOD"
    CLOTHING = "CLOTHING"
    WARMTH_BEDDING = "WARMTH_BEDDING"
    FOOTWEAR = "FOOTWEAR"
    EDUCATION = "EDUCATION"
    HOUSEHOLD_REUSABLE = "HOUSEHOLD_REUSABLE"
    BUSINESS_SURPLUS = "BUSINESS_SURPLUS"

class MatchDecision(str, enum.Enum):
    MATCH = "MATCH"
    ALTERNATIVE = "ALTERNATIVE"
    POOL = "POOL"
    WAIT = "WAIT"
    NO_TRANSFER = "NO_TRANSFER"

class TransferStatus(str, enum.Enum):
    CREATED = "CREATED"
    ASSIGNED = "ASSIGNED"
    PICKUP_SCHEDULED = "PICKUP_SCHEDULED"
    PICKED_UP = "PICKED_UP"
    IN_TRANSIT = "IN_TRANSIT"
    DELIVERED = "DELIVERED"
    RECEIVED = "RECEIVED"
    PARTIALLY_COMPLETED = "PARTIALLY_COMPLETED"
    DISPUTED = "DISPUTED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class VerificationState(str, enum.Enum):
    UNVERIFIED = "UNVERIFIED"
    PENDING = "PENDING"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"

# --- Models ---

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    phone_or_email = Column(String, unique=True, nullable=False, index=True)
    full_name = Column(String, nullable=False)
    role_flags = Column(JSON, default=lambda: ["SELLER", "BUYER"])  # Roles allowed
    active_role = Column(SQLEnum(UserRole), default=UserRole.SELLER)
    status = Column(String, default="ACTIVE")  # ACTIVE, SUSPENDED
    consent_status = Column(Boolean, default=True)
    created_at = Column(DateTime, default=utc_now)

    profile = relationship("Profile", back_populates="user", uselist=False)
    offers = relationship("Offer", back_populates="provider")
    needs = relationship("Need", back_populates="requester")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, unique=True)
    profile_type = Column(SQLEnum(ProfileType), default=ProfileType.INDIVIDUAL)
    organization_name = Column(String, nullable=True)
    address = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    service_area = Column(String, default="Local 5km")
    verification_state = Column(SQLEnum(VerificationState), default=VerificationState.UNVERIFIED)
    preferences = Column(JSON, default=dict)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="profile")

class Item(Base):
    __tablename__ = "items"

    id = Column(String, primary_key=True, default=generate_uuid)
    category = Column(SQLEnum(ItemCategory), nullable=False)
    canonical_name = Column(String, nullable=False, index=True)
    handling_class = Column(String, default="STANDARD")  # AMBIENT, REFRIGERATED, HEAVY, FRAGILE

    offers = relationship("Offer", back_populates="item")
    needs = relationship("Need", back_populates="item")

class Offer(Base):
    __tablename__ = "offers"

    id = Column(String, primary_key=True, default=generate_uuid)
    provider_id = Column(String, ForeignKey("users.id"), nullable=False)
    item_id = Column(String, ForeignKey("items.id"), nullable=False)
    title = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    unit = Column(String, nullable=False)  # kg, litre, piece, box, pair, packet
    condition = Column(String, default="Good")  # New, Good, Usable, Fresh
    offer_mode = Column(SQLEnum(OfferMode), default=OfferMode.FREE)
    expected_price = Column(Float, default=0.0)
    available_until = Column(DateTime, nullable=True)
    pickup_preference = Column(String, default="Buyer Pickup")  # Seller Drop, Buyer Pickup, Either
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    address_approx = Column(String, nullable=False)  # Public approx address
    status = Column(String, default="ACTIVE", index=True)  # ACTIVE, MATCHED, TRANSFERRED, CANCELLED, EXPIRED
    at_risk = Column(Boolean, default=False)
    risk_reason = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

    provider = relationship("User", back_populates="offers")
    item = relationship("Item", back_populates="offers")
    evidence = relationship("ItemEvidence", back_populates="offer")
    matches = relationship("Match", back_populates="offer")

    @property
    def category(self):
        return self.item.category if self.item else ItemCategory.FRESH_FOOD

class Need(Base):
    __tablename__ = "needs"

    id = Column(String, primary_key=True, default=generate_uuid)
    requester_id = Column(String, ForeignKey("users.id"), nullable=False)
    item_id = Column(String, ForeignKey("items.id"), nullable=False)
    title = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    needed_by = Column(DateTime, nullable=True)
    purpose = Column(String, default="Personal use")  # Personal use, Bakery production, NGO distribution, etc.
    preferred_mode = Column(SQLEnum(OfferMode), default=OfferMode.FREE)
    fulfillment_preference = Column(String, default="Either")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    address = Column(String, nullable=False)
    status = Column(String, default="ACTIVE", index=True)  # ACTIVE, MATCHED, FULFILLED, CANCELLED
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

    requester = relationship("User", back_populates="needs")
    item = relationship("Item", back_populates="needs")
    matches = relationship("Match", back_populates="need")

    @property
    def category(self):
        return self.item.category if self.item else ItemCategory.FRESH_FOOD

class ItemEvidence(Base):
    __tablename__ = "item_evidence"

    id = Column(String, primary_key=True, default=generate_uuid)
    offer_id = Column(String, ForeignKey("offers.id"), nullable=False)
    photo_url = Column(String, nullable=True)
    source_type = Column(String, default="USER_UPLOAD")  # USER_UPLOAD, AI_PREDICTION
    condition_declared = Column(String, nullable=False)
    ai_confidence = Column(Float, default=0.95)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

    offer = relationship("Offer", back_populates="evidence")

class Match(Base):
    __tablename__ = "matches"

    id = Column(String, primary_key=True, default=generate_uuid)
    offer_id = Column(String, ForeignKey("offers.id"), nullable=False)
    need_id = Column(String, ForeignKey("needs.id"), nullable=False)
    score = Column(Float, nullable=False)
    decision = Column(SQLEnum(MatchDecision), nullable=False)
    explanation = Column(Text, nullable=False)
    alternative_details = Column(JSON, nullable=True)
    status = Column(String, default="PROPOSED")  # PROPOSED, ACCEPTED, REJECTED, EXPIRED
    created_at = Column(DateTime, default=utc_now)

    offer = relationship("Offer", back_populates="matches")
    need = relationship("Need", back_populates="matches")
    transfers = relationship("Transfer", back_populates="match")

class Transfer(Base):
    __tablename__ = "transfers"

    id = Column(String, primary_key=True, default=generate_uuid)
    match_id = Column(String, ForeignKey("matches.id"), nullable=False)
    mode = Column(String, default="Buyer Pickup")
    planned_time = Column(DateTime, nullable=True)
    status = Column(SQLEnum(TransferStatus), default=TransferStatus.CREATED)
    pickup_confirmed_at = Column(DateTime, nullable=True)
    pickup_notes = Column(Text, nullable=True)
    receipt_confirmed_at = Column(DateTime, nullable=True)
    receipt_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

    match = relationship("Match", back_populates="transfers")
    verifications = relationship("Verification", back_populates="transfer")
    disputes = relationship("Dispute", back_populates="transfer")

class Verification(Base):
    __tablename__ = "verifications"

    id = Column(String, primary_key=True, default=generate_uuid)
    transfer_id = Column(String, ForeignKey("transfers.id"), nullable=False)
    actor_id = Column(String, ForeignKey("users.id"), nullable=False)
    event_type = Column(String, nullable=False)  # PICKUP, RECEIPT
    quantity_verified = Column(Float, nullable=False)
    condition_verified = Column(String, nullable=False)
    evidence_url = Column(String, nullable=True)
    timestamp = Column(DateTime, default=utc_now)

    transfer = relationship("Transfer", back_populates="verifications")

class ImpactEvent(Base):
    __tablename__ = "impact_events"

    id = Column(String, primary_key=True, default=generate_uuid)
    source_event = Column(String, nullable=False)  # TRANSFER_COMPLETED, AVOIDED_TRANSFER
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    item_category = Column(SQLEnum(ItemCategory), nullable=False)
    quantity_preserved = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    value_preserved_inr = Column(Float, default=0.0)
    confidence = Column(Float, default=1.0)
    verified = Column(Boolean, default=True)  # True = Verified, False = Estimated
    created_at = Column(DateTime, default=utc_now)

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    type = Column(SQLEnum(ProfileType), nullable=False)
    registration_number = Column(String, nullable=True)
    verification_state = Column(SQLEnum(VerificationState), default=VerificationState.PENDING)
    contact_email = Column(String, nullable=False)
    contact_phone = Column(String, nullable=False)
    service_area = Column(String, default="City-wide")
    capacity_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

class Dispute(Base):
    __tablename__ = "disputes"

    id = Column(String, primary_key=True, default=generate_uuid)
    transfer_id = Column(String, ForeignKey("transfers.id"), nullable=False)
    reporter_id = Column(String, ForeignKey("users.id"), nullable=False)
    reason = Column(String, nullable=False)
    evidence_notes = Column(Text, nullable=True)
    status = Column(String, default="OPEN")  # OPEN, RESOLVED, REJECTED
    resolution = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)

    transfer = relationship("Transfer", back_populates="disputes")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    actor_id = Column(String, nullable=False)
    action = Column(String, nullable=False)
    target_object = Column(String, nullable=False)
    metadata_json = Column(JSON, default=dict)
    timestamp = Column(DateTime, default=utc_now)

class ModelRun(Base):
    __tablename__ = "model_runs"

    id = Column(String, primary_key=True, default=generate_uuid)
    model_name = Column(String, nullable=False)
    model_version = Column(String, nullable=False)
    metrics = Column(JSON, default=dict)
    timestamp = Column(DateTime, default=utc_now)
