from datetime import datetime, timedelta, timezone
from typing import Dict, Any
from app.models.all_models import ItemCategory

class FoodIntelligenceService:
    """
    Food-specific intelligence layer derived from SIH 26234.
    Handles surplus prediction, loss-risk scoring, freshness estimation, and production adjustments.
    """

    @staticmethod
    def calculate_loss_risk(category: ItemCategory, hours_available: float, temperature_ambient_c: float = 28.0) -> Dict[str, Any]:
        """Calculates loss-risk score (0.0 = low risk, 1.0 = high risk) based on food perishable profile."""
        if category not in [ItemCategory.FRESH_FOOD, ItemCategory.DAIRY, ItemCategory.PREPARED_SURPLUS_FOOD, ItemCategory.BAKERY_PACKAGED]:
            return {"risk_score": 0.0, "at_risk": False, "recommended_action": "Standard storage"}

        base_shelf_hours = {
            ItemCategory.PREPARED_SURPLUS_FOOD: 4.0,
            ItemCategory.DAIRY: 8.0,
            ItemCategory.FRESH_FOOD: 48.0,
            ItemCategory.BAKERY_PACKAGED: 36.0,
        }.get(category, 24.0)

        # Temperature acceleration factor
        temp_multiplier = 1.0 + max(0.0, (temperature_ambient_c - 20.0) * 0.05)
        adjusted_shelf_hours = base_shelf_hours / temp_multiplier

        remaining_hours = max(0.0, adjusted_shelf_hours - hours_available)
        risk_score = round(1.0 - (remaining_hours / adjusted_shelf_hours), 2)
        at_risk = risk_score > 0.6

        action = "Prioritize local transfer within 2 hours" if at_risk else "Normal matching window active"

        return {
            "risk_score": max(0.0, min(1.0, risk_score)),
            "at_risk": at_risk,
            "hours_remaining": round(remaining_hours, 1),
            "recommended_action": action
        }

    @staticmethod
    def forecast_institutional_surplus(daily_prep_kg: float, historical_consumption_rate: float = 0.85) -> Dict[str, Any]:
        """Predicts expected surplus for institutional kitchens to adjust production upstream."""
        expected_consumed = daily_prep_kg * historical_consumption_rate
        predicted_surplus_kg = max(0.0, daily_prep_kg - expected_consumed)
        suggested_prep_reduction_kg = round(predicted_surplus_kg * 0.7, 1)

        return {
            "daily_prep_kg": daily_prep_kg,
            "predicted_surplus_kg": round(predicted_surplus_kg, 1),
            "suggested_prep_adjustment_kg": suggested_prep_reduction_kg,
            "explanation": f"Reduce initial prep by {suggested_prep_reduction_kg} kg to eliminate waste before cooking."
        }
