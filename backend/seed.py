import sys
import os
from datetime import datetime, timedelta, timezone

# Add backend directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal, engine, Base
from app.models.all_models import (
    User, Profile, Item, Offer, Need, ItemEvidence, Match, Transfer,
    Verification, ImpactEvent, Organization, Dispute, AuditLog, ModelRun,
    UserRole, ProfileType, OfferMode, ItemCategory, MatchDecision, TransferStatus, VerificationState
)
from app.services.match_engine import MatchEngine

def seed_database():
    print("Initializing RESAVO Database Schema...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    print("Seeding Users & Profiles...")
    # 1. Family Asha (Seller)
    user_asha = User(
        phone_or_email="asha.sharma@resavo.org",
        full_name="Asha Sharma",
        role_flags=["SELLER", "BUYER"],
        active_role=UserRole.SELLER
    )
    db.add(user_asha)
    db.flush()

    prof_asha = Profile(
        user_id=user_asha.id,
        profile_type=ProfileType.FAMILY,
        organization_name="Sharma Household",
        address="Indiranagar 100ft Rd, Bangalore",
        latitude=12.9716,
        longitude=77.6412,
        verification_state=VerificationState.VERIFIED
    )
    db.add(prof_asha)

    # 2. Golden Grain Bakery (Buyer)
    user_bakery = User(
        phone_or_email="orders@goldengrain.in",
        full_name="Rajesh Patel (Golden Grain Bakery)",
        role_flags=["BUYER", "SELLER"],
        active_role=UserRole.BUYER
    )
    db.add(user_bakery)
    db.flush()

    prof_bakery = Profile(
        user_id=user_bakery.id,
        profile_type=ProfileType.BAKERY,
        organization_name="Golden Grain Artisan Bakery",
        address="12th Main Indiranagar, Bangalore",
        latitude=12.9780,
        longitude=77.6440,
        verification_state=VerificationState.VERIFIED
    )
    db.add(prof_bakery)

    # 3. Hope Foundation NGO (Buyer)
    user_ngo = User(
        phone_or_email="contact@hopefoundation.org",
        full_name="Anita Roy (Hope Foundation NGO)",
        role_flags=["BUYER"],
        active_role=UserRole.BUYER
    )
    db.add(user_ngo)
    db.flush()

    prof_ngo = Profile(
        user_id=user_ngo.id,
        profile_type=ProfileType.NGO,
        organization_name="Hope Foundation Community Shelter",
        address="Koramangala 5th Block, Bangalore",
        latitude=12.9352,
        longitude=77.6245,
        verification_state=VerificationState.VERIFIED
    )
    db.add(prof_ngo)

    # 4. Green Valley Restaurant (Seller)
    user_rest = User(
        phone_or_email="kitchen@greenvalley.in",
        full_name="Chef Vikram Singh (Green Valley)",
        role_flags=["SELLER"],
        active_role=UserRole.SELLER
    )
    db.add(user_rest)
    db.flush()

    prof_rest = Profile(
        user_id=user_rest.id,
        profile_type=ProfileType.RESTAURANT,
        organization_name="Green Valley Restaurant & Kitchen",
        address="MG Road, Bangalore",
        latitude=12.9750,
        longitude=77.6080,
        verification_state=VerificationState.VERIFIED
    )
    db.add(prof_rest)

    # 5. System Admin User
    user_admin = User(
        phone_or_email="admin@resavo.org",
        full_name="RESAVO Operations Admin",
        role_flags=["ADMIN", "SELLER", "BUYER"],
        active_role=UserRole.ADMIN
    )
    db.add(user_admin)
    db.flush()

    print("Seeding Item Catalog...")
    item_milk = Item(category=ItemCategory.DAIRY, canonical_name="Fresh Farm Milk", handling_class="REFRIGERATED")
    item_clothes = Item(category=ItemCategory.CLOTHING, canonical_name="Warm Winter Jackets & Shirts", handling_class="STANDARD")
    item_veggies = Item(category=ItemCategory.FRESH_FOOD, canonical_name="Organic Spinach & Vegetables", handling_class="STANDARD")
    item_books = Item(category=ItemCategory.EDUCATION, canonical_name="Secondary School Textbooks", handling_class="STANDARD")

    db.add_all([item_milk, item_clothes, item_veggies, item_books])
    db.flush()

    print("Seeding Organizations...")
    org_hope = Organization(
        name="Hope Foundation Community Shelter",
        type=ProfileType.NGO,
        registration_number="NGO-KA-2024-8841",
        verification_state=VerificationState.VERIFIED,
        contact_email="contact@hopefoundation.org",
        contact_phone="+91 98765 43210",
        service_area="Bangalore Urban",
        capacity_notes="Accommodates 120 residents; accepts bulk clothing and food."
    )
    org_school = Organization(
        name="Vidya Niketan Primary School",
        type=ProfileType.SCHOOL,
        registration_number="SCH-KA-2019-1029",
        verification_state=VerificationState.PENDING,
        contact_email="principal@vidyaniketan.edu.in",
        contact_phone="+91 98111 22334",
        service_area="East Bangalore",
        capacity_notes="350 students requiring textbooks and stationery."
    )
    db.add_all([org_hope, org_school])
    db.flush()

    print("Seeding Offers...")
    now = datetime.now(timezone.utc)

    # Offer 1: Asha's 3kg Milk
    offer_milk = Offer(
        provider_id=user_asha.id,
        item_id=item_milk.id,
        title="3 kg Fresh Milk",
        quantity=3.0,
        unit="kg",
        condition="Fresh & Sealed",
        offer_mode=OfferMode.SELL,
        expected_price=165.0,
        available_until=now + timedelta(hours=4),
        pickup_preference="Buyer Pickup",
        latitude=12.9716,
        longitude=77.6412,
        address_approx="Indiranagar 100ft Rd",
        status="ACTIVE",
        at_risk=True,
        risk_reason="High time sensitivity (expires in 4h)",
        notes="Unused surplus from morning delivery."
    )

    # Offer 2: Asha's Clothing
    offer_clothes = Offer(
        provider_id=user_asha.id,
        item_id=item_clothes.id,
        title="20 Usable Warm Clothes",
        quantity=20.0,
        unit="piece",
        condition="Good",
        offer_mode=OfferMode.LOW_PRICE,
        expected_price=400.0,
        available_until=now + timedelta(days=7),
        pickup_preference="Either",
        latitude=12.9716,
        longitude=77.6412,
        address_approx="Indiranagar 100ft Rd",
        status="ACTIVE",
        at_risk=False,
        notes="Clean gently used sweaters and shirts for winter distribution."
    )

    # Offer 3: Green Valley Surplus Veggies
    offer_veggies = Offer(
        provider_id=user_rest.id,
        item_id=item_veggies.id,
        title="8 kg Fresh Spinach & Tomatoes",
        quantity=8.0,
        unit="kg",
        condition="Fresh",
        offer_mode=OfferMode.FREE,
        expected_price=0.0,
        available_until=now + timedelta(hours=8),
        pickup_preference="Seller Drop",
        latitude=12.9750,
        longitude=77.6080,
        address_approx="MG Road Kitchen",
        status="ACTIVE",
        at_risk=True,
        risk_reason="Perishable fresh greens",
        notes="Surplus prep from lunch shift."
    )

    db.add_all([offer_milk, offer_clothes, offer_veggies])
    db.flush()

    print("Seeding Needs...")
    # Need 1: Bakery Milk Need
    need_bakery_milk = Need(
        requester_id=user_bakery.id,
        item_id=item_milk.id,
        title="Need 3 kg Milk by 5 PM",
        quantity=3.0,
        unit="kg",
        needed_by=now + timedelta(hours=5),
        purpose="Bakery production",
        preferred_mode=OfferMode.LOW_PRICE,
        fulfillment_preference="Pickup",
        latitude=12.9780,
        longitude=77.6440,
        address="12th Main Indiranagar Bakery",
        status="ACTIVE",
        notes="Required for evening cake batch."
    )

    # Need 2: NGO Clothing Need
    need_ngo_clothes = Need(
        requester_id=user_ngo.id,
        item_id=item_clothes.id,
        title="Bulk Clothing for Shelter Distribution",
        quantity=20.0,
        unit="piece",
        needed_by=now + timedelta(days=3),
        purpose="NGO community distribution",
        preferred_mode=OfferMode.LOW_PRICE,
        fulfillment_preference="Either",
        latitude=12.9352,
        longitude=77.6245,
        address="Koramangala 5th Block Shelter",
        status="ACTIVE",
        notes="Urgent request for winter drive."
    )

    db.add_all([need_bakery_milk, need_ngo_clothes])
    db.flush()

    print("Executing Core Match Decision Engine to generate explainable recommendations...")
    # Evaluate Bakery Milk Need (Should return ALTERNATIVE local shop 300m away!)
    eval_bakery = MatchEngine.evaluate_pair(offer_milk, need_bakery_milk, local_shop_distance_km=0.3)
    match_bakery = Match(
        offer_id=offer_milk.id,
        need_id=need_bakery_milk.id,
        score=eval_bakery["score"],
        decision=eval_bakery["decision"],
        explanation=eval_bakery["explanation"],
        alternative_details=eval_bakery["alternative_details"],
        status="PROPOSED"
    )
    db.add(match_bakery)

    # Evaluate NGO Clothes Need (Should return MATCH with NGO priority boost!)
    eval_ngo = MatchEngine.evaluate_pair(offer_clothes, need_ngo_clothes)
    match_ngo = Match(
        offer_id=offer_clothes.id,
        need_id=need_ngo_clothes.id,
        score=eval_ngo["score"],
        decision=eval_ngo["decision"],
        explanation=eval_ngo["explanation"],
        alternative_details=eval_ngo["alternative_details"],
        status="ACCEPTED"
    )
    db.add(match_ngo)
    db.flush()

    # Create active Transfer for NGO match
    transfer_ngo = Transfer(
        match_id=match_ngo.id,
        mode="Buyer Pickup",
        status=TransferStatus.IN_TRANSIT,
        planned_time=now + timedelta(hours=2),
        pickup_confirmed_at=now - timedelta(minutes=30),
        pickup_notes="Verified 20 pieces in good condition by courier."
    )
    db.add(transfer_ngo)
    db.flush()

    print("Seeding Historical Verified Impact Events...")
    impact_event1 = ImpactEvent(
        source_event="TRANSFER_COMPLETED",
        user_id=user_asha.id,
        item_category=ItemCategory.CLOTHING,
        quantity_preserved=15.0,
        unit="piece",
        value_preserved_inr=4500.0,
        verified=True
    )
    impact_event2 = ImpactEvent(
        source_event="TRANSFER_COMPLETED",
        user_id=user_rest.id,
        item_category=ItemCategory.PREPARED_SURPLUS_FOOD,
        quantity_preserved=50.0,
        unit="kg",
        value_preserved_inr=2500.0,
        verified=True
    )
    impact_event3 = ImpactEvent(
        source_event="TRANSFER_COMPLETED",
        user_id=user_asha.id,
        item_category=ItemCategory.DAIRY,
        quantity_preserved=5.0,
        unit="kg",
        value_preserved_inr=300.0,
        verified=True
    )
    db.add_all([impact_event1, impact_event2, impact_event3])

    # Seed an open dispute for admin console testing
    dispute = Dispute(
        transfer_id=transfer_ngo.id,
        reporter_id=user_ngo.id,
        reason="Minor packaging torn during transit",
        evidence_notes="2 items require washing before distribution.",
        status="OPEN"
    )
    db.add(dispute)

    db.commit()
    db.close()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
