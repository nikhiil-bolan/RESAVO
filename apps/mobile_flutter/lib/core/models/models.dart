class ResourceOffer {
  final String id;
  final String title;
  final String category;
  final double quantity;
  final String unit;
  final String condition;
  final String offerMode;
  final double expectedPrice;
  final String addressApprox;
  final String status;
  final bool atRisk;
  final String? riskReason;

  ResourceOffer({
    required this.id,
    required this.title,
    required this.category,
    required this.quantity,
    required this.unit,
    required this.condition,
    required this.offerMode,
    required this.expectedPrice,
    required this.addressApprox,
    required this.status,
    required this.atRisk,
    this.riskReason,
  });

  factory ResourceOffer.fromJson(Map<String, dynamic> json) {
    return ResourceOffer(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      category: json['category'] ?? 'FRESH_FOOD',
      quantity: (json['quantity'] ?? 0.0).toDouble(),
      unit: json['unit'] ?? 'kg',
      condition: json['condition'] ?? 'Good',
      offerMode: json['offer_mode'] ?? 'FREE',
      expectedPrice: (json['expected_price'] ?? 0.0).toDouble(),
      addressApprox: json['address_approx'] ?? '',
      status: json['status'] ?? 'ACTIVE',
      atRisk: json['at_risk'] ?? false,
      riskReason: json['risk_reason'],
    );
  }
}

class ResourceNeed {
  final String id;
  final String title;
  final String category;
  final double quantity;
  final String unit;
  final String purpose;
  final String address;
  final String status;

  ResourceNeed({
    required this.id,
    required this.title,
    required this.category,
    required this.quantity,
    required this.unit,
    required this.purpose,
    required this.address,
    required this.status,
  });

  factory ResourceNeed.fromJson(Map<String, dynamic> json) {
    return ResourceNeed(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      category: json['category'] ?? 'FRESH_FOOD',
      quantity: (json['quantity'] ?? 0.0).toDouble(),
      unit: json['unit'] ?? 'kg',
      purpose: json['purpose'] ?? 'Personal use',
      address: json['address'] ?? '',
      status: json['status'] ?? 'ACTIVE',
    );
  }
}

class MatchSuggestion {
  final String matchId;
  final double score;
  final String decision;
  final String explanation;
  final List<String> reasons;
  final Map<String, dynamic>? alternativeDetails;
  final ResourceOffer offer;
  final ResourceNeed need;

  MatchSuggestion({
    required this.matchId,
    required this.score,
    required this.decision,
    required this.explanation,
    required this.reasons,
    this.alternativeDetails,
    required this.offer,
    required this.need,
  });

  factory MatchSuggestion.fromJson(Map<String, dynamic> json) {
    return MatchSuggestion(
      matchId: json['match_id'] ?? '',
      score: (json['score'] ?? 0.0).toDouble(),
      decision: json['decision'] ?? 'MATCH',
      explanation: json['explanation'] ?? '',
      reasons: List<String>.from(json['reasons'] ?? []),
      alternativeDetails: json['alternative_details'],
      offer: ResourceOffer.fromJson(json['offer'] ?? {}),
      need: ResourceNeed.fromJson(json['need'] ?? {}),
    );
  }
}

class TransferTask {
  final String id;
  final String title;
  final String category;
  final double quantity;
  final String unit;
  final String status;
  final String mode;
  final String providerName;
  final String requesterName;

  TransferTask({
    required this.id,
    required this.title,
    required this.category,
    required this.quantity,
    required this.unit,
    required this.status,
    required this.mode,
    required this.providerName,
    required this.requesterName,
  });

  factory TransferTask.fromJson(Map<String, dynamic> json) {
    return TransferTask(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      category: json['category'] ?? 'FRESH_FOOD',
      quantity: (json['quantity'] ?? 0.0).toDouble(),
      unit: json['unit'] ?? 'kg',
      status: json['status'] ?? 'ASSIGNED',
      mode: json['mode'] ?? 'Buyer Pickup',
      providerName: json['provider_name'] ?? 'Provider',
      requesterName: json['requester_name'] ?? 'Requester',
    );
  }
}
