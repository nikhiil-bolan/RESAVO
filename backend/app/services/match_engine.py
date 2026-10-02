import math
from typing import List, Dict, Any, Tuple
from app.models.all_models import Offer, Need, MatchDecision, ItemCategory, ProfileType

def haversine_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate the great circle distance between two points on the earth in kilometers."""
    R = 6371.0  # Earth radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

class MatchEngine:
    """
    RESAVO Core Match & Feasibility Decision Engine.
    Evaluates real-world practical feasibility before recommending a transfer.
    """

    @staticmethod
    def evaluate_pair(offer: Offer, need: Need, local_shop_distance_km: float = None) -> Dict[str, Any]:
        reasons = []
        score = 100.0

        # 1. Category & Item Fit
        if offer.item_id != need.item_id and offer.item.category != need.item.category:
            return {
                "decision": MatchDecision.NO_TRANSFER,
                "score": 0.0,
                "explanation": "Item categories do not match.",
                "reasons": ["Incompatible item category."]
            }

        # 2. Distance Calculation
        dist_km = haversine_distance_km(offer.latitude, offer.longitude, need.latitude, need.longitude)
        reasons.append(f"Distance between provider and requester is {dist_km} km.")

        # 3. Local Alternative Supply Check (The Core RESAVO Differentiation Rule!)
        # If a local verified shop/supplier is significantly closer than the offering family,
        # RESAVO recommends using the local alternative instead of creating a needless transfer!
        if local_shop_distance_km is not None and local_shop_distance_km < dist_km and local_shop_distance_km <= 0.5:
            explanation = (
                f"Do not transfer from the family. A verified local supply is available only {int(local_shop_distance_km * 1000)}m away. "
                "Preserving community supply chain efficiency without unnecessary vehicle transit."
            )
            reasons.append(f"Verified local shop is {int(local_shop_distance_km * 1000)}m away from buyer.")
            reasons.append("Family route adds unnecessary transport burden.")
            return {
                "decision": MatchDecision.ALTERNATIVE,
                "score": 45.0,
                "explanation": explanation,
                "reasons": reasons,
                "alternative_details": {
                    "type": "LOCAL_SHOP",
                    "distance_m": int(local_shop_distance_km * 1000),
                    "recommendation": "Purchase or source from nearby store"
                }
            }

        # 4. Quantity Fit Evaluation
        quantity_diff_ratio = abs(offer.quantity - need.quantity) / max(need.quantity, 1.0)
        if offer.quantity < need.quantity * 0.3:
            score -= 30.0
            reasons.append(f"Offer quantity ({offer.quantity} {offer.unit}) is far below required need ({need.quantity} {need.unit}).")
        elif offer.quantity >= need.quantity:
            score += 10.0
            reasons.append(f"Quantity ({offer.quantity} {offer.unit}) fully satisfies required need.")

        # 5. Time Window & Perishability Check
        if offer.available_until and need.needed_by:
            if offer.available_until < need.needed_by:
                score += 5.0
                reasons.append("Item availability aligns well with requested deadline.")
            else:
                reasons.append("Time windows overlap acceptably.")

        # 6. Organization & Social Purpose Prioritization (e.g. NGO distribution)
        if "NGO" in need.purpose.upper() or "COMMUNITY" in need.purpose.upper() or "SCHOOL" in need.purpose.upper():
            score += 15.0
            reasons.append("Priority boost applied for verified community/NGO social purpose.")

        # 7. Distance Burden Penalty
        if dist_km > 10.0:
            score -= 40.0
            reasons.append("Distance exceeds 10 km local threshold; high transport burden.")
        elif dist_km > 5.0:
            score -= 15.0
            reasons.append("Moderate route distance (5-10 km).")

        # 8. Decision Finalizer
        if score >= 70.0:
            decision = MatchDecision.MATCH
            explanation = (
                f"Recommended match: Buyer needs {need.quantity} {need.unit}, provider is {dist_km} km away. "
                "No closer verified alternative was found and time window is feasible."
            )
        elif score >= 50.0:
            decision = MatchDecision.POOL
            explanation = (
                f"Partial match: Consider pooling with additional nearby offers to satisfy total requirement of {need.quantity} {need.unit}."
            )
        else:
            decision = MatchDecision.NO_TRANSFER
            explanation = "Transfer burden outweighs benefit or constraints are not satisfied."

        return {
            "decision": decision,
            "score": min(max(round(score, 1), 0.0), 100.0),
            "explanation": explanation,
            "reasons": reasons,
            "alternative_details": None
        }
