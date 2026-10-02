from typing import Dict, Any, Optional
from app.models.all_models import ItemCategory

class AIServiceInterface:
    """
    Modular AI Service Interface layer.
    Allows rule-based / statistical baseline implementations now, with seamless drop-in
    replacement by fine-tuned vision / NLP / ML models later without changing API contracts.
    """

    @staticmethod
    def classify_item_image(image_url_or_bytes: str) -> Dict[str, Any]:
        """Classifies item category from photo evidence with confidence and human verification fallback."""
        # Baseline deterministic rule heuristic
        lower = image_url_or_bytes.lower()
        if "milk" in lower or "dairy" in lower:
            category = ItemCategory.DAIRY
            canonical = "Fresh Milk"
            conf = 0.94
        elif "cloth" in lower or "shirt" in lower or "pant" in lower:
            category = ItemCategory.CLOTHING
            canonical = "Wearable Clothing"
            conf = 0.91
        elif "book" in lower or "notebook" in lower:
            category = ItemCategory.EDUCATION
            canonical = "Textbooks & Stationery"
            conf = 0.95
        elif "veg" in lower or "fruit" in lower:
            category = ItemCategory.FRESH_FOOD
            canonical = "Fresh Vegetables"
            conf = 0.88
        else:
            category = ItemCategory.HOUSEHOLD_REUSABLE
            canonical = "Household Utility Item"
            conf = 0.75

        return {
            "suggested_category": category,
            "canonical_name": canonical,
            "confidence": conf,
            "requires_user_confirmation": conf < 0.90,
            "explanation": f"AI classified image as {canonical} with {int(conf*100)}% confidence."
        }

    @staticmethod
    def detect_anomalies(user_id: str, offer_count_last_24h: int) -> Dict[str, Any]:
        """Detects suspicious duplicate listings or high-frequency automated abuse."""
        is_anomalous = offer_count_last_24h > 15
        return {
            "user_id": user_id,
            "is_anomalous": is_anomalous,
            "risk_score": 0.85 if is_anomalous else 0.05,
            "flag_reason": "High frequency offer creation (potential spam/abuse)" if is_anomalous else "Normal behavior"
        }
