import pytest
from app.models.all_models import Offer, Need, OfferMode, ItemCategory, MatchDecision, Item
from app.services.match_engine import MatchEngine

def test_match_engine_alternative_local_shop():
    """
    Core RESAVO Business Requirement Test:
    A family has 3kg milk 1km away from a bakery.
    A local milk shop is 300m away from the bakery.
    The system MUST recommend ALTERNATIVE / NO_TRANSFER rather than forcing a needless transfer!
    """
    dummy_item = Item(id="item-1", category=ItemCategory.DAIRY, canonical_name="Fresh Milk")

    offer = Offer(
        id="off-1",
        item=dummy_item,
        quantity=3.0,
        unit="kg",
        offer_mode=OfferMode.SELL,
        latitude=12.9716,
        longitude=77.6412  # ~1.0 km away
    )

    need = Need(
        id="need-1",
        item=dummy_item,
        quantity=3.0,
        unit="kg",
        purpose="Bakery production",
        latitude=12.9780,
        longitude=77.6440
    )

    result = MatchEngine.evaluate_pair(offer, need, local_shop_distance_km=0.3)

    assert result["decision"] == MatchDecision.ALTERNATIVE
    assert "local supply is available only 300m away" in result["explanation"]
    assert any("Verified local shop" in r for r in result["reasons"])

def test_match_engine_ngo_priority_match():
    """
    Tests valid match for bulk clothing requested by an NGO.
    """
    dummy_item = Item(id="item-2", category=ItemCategory.CLOTHING, canonical_name="Warm Clothes")

    offer = Offer(
        id="off-2",
        item=dummy_item,
        quantity=20.0,
        unit="piece",
        offer_mode=OfferMode.LOW_PRICE,
        latitude=12.9352,
        longitude=77.6245
    )

    need = Need(
        id="need-2",
        item=dummy_item,
        quantity=20.0,
        unit="piece",
        purpose="NGO community distribution",
        latitude=12.9360,
        longitude=77.6250
    )

    result = MatchEngine.evaluate_pair(offer, need)

    assert result["decision"] == MatchDecision.MATCH
    assert result["score"] >= 80.0
    assert any("community/NGO" in r for r in result["reasons"])
