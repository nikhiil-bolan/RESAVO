import pytest
from fastapi.testclient import TestClient
from app.main import app
from seed import seed_database

client = TestClient(app)

@pytest.fixture(scope="module", autouse=True)
def setup_test_db():
    seed_database()

def get_asha_headers():
    res = client.post("/api/v1/auth/verify-otp", json={"phone_or_email": "asha.sharma@resavo.org", "otp": "123456"})
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "HEALTHY"

def test_send_and_verify_otp():
    res1 = client.post("/api/v1/auth/send-otp", json={"phone_or_email": "test.user@resavo.org"})
    assert res1.status_code == 200

    res2 = client.post("/api/v1/auth/verify-otp", json={"phone_or_email": "test.user@resavo.org", "otp": "123456"})
    assert res2.status_code == 200
    data = res2.json()
    assert "access_token" in data
    assert data["active_role"] == "SELLER"

def test_get_my_offers():
    headers = get_asha_headers()
    response = client.get("/api/v1/offers/me", headers=headers)
    assert response.status_code == 200
    offers = response.json()
    assert len(offers) >= 1

def test_create_offer_and_need():
    headers = get_asha_headers()
    # Create new offer
    offer_data = {
        "category": "FRESH_FOOD",
        "item_name": "Fresh Organic Tomatoes",
        "quantity": 5.0,
        "unit": "kg",
        "condition": "Fresh",
        "offer_mode": "FREE",
        "available_hours": 12,
        "pickup_preference": "Buyer Pickup",
        "latitude": 12.9716,
        "longitude": 77.6412,
        "address_approx": "Indiranagar, Bangalore"
    }
    res = client.post("/api/v1/offers/", json=offer_data, headers=headers)
    assert res.status_code == 200
    created_offer = res.json()
    assert created_offer["title"] == "5.0 kg Fresh Organic Tomatoes"

def test_get_admin_metrics():
    response = client.get("/api/v1/admin/metrics")
    assert response.status_code == 200
    metrics = response.json()
    assert metrics["active_users"] >= 1
    assert metrics["system_health_pct"] > 90.0

def test_match_suggestions():
    headers = get_asha_headers()
    offers_res = client.get("/api/v1/offers/me", headers=headers)
    offer_id = offers_res.json()[0]["id"]

    response = client.get(f"/api/v1/matches/suggestions?offer_id={offer_id}", headers=headers)
    assert response.status_code == 200
    suggestions = response.json()
    assert isinstance(suggestions, list)
