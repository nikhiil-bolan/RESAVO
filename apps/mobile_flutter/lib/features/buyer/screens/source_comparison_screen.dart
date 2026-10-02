import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class SourceComparisonScreen extends StatelessWidget {
  const SourceComparisonScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.canvasBackground,
      appBar: AppBar(
        backgroundColor: AppColors.primaryNavy,
        elevation: 0,
        title: const Text(
          'COMPARE SUPPLY SOURCES',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Colors.white,
            letterSpacing: 1.0,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Feasibility Source Comparison',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.extrabold,
                color: AppColors.primaryNavy,
              ),
            ),
            const SizedBox(height: 4),
            const Text(
              'Need: 3 kg Milk by 5:00 PM (Bakery Production)',
              style: TextStyle(fontSize: 12, color: AppColors.textMuted),
            ),
            const SizedBox(height: 20),

            // Option A: Local Milk Shop (RECOMMENDED)
            _buildDetailedOptionCard(
              optionTag: 'OPTION A — RECOMMENDED SOURCE',
              title: 'Local Milk Shop (0.3 km)',
              price: '₹ 180 (Store Price)',
              mode: 'Buyer Pickup • Verified Supplier',
              reason: 'Recommended because existing local supply satisfies your need without creating an additional vehicle transfer trip.',
              isRecommended: true,
              tagColor: AppColors.impactGreen,
            ),

            const SizedBox(height: 16),

            // Option B: Family A (Alternative)
            _buildDetailedOptionCard(
              optionTag: 'OPTION B — FAMILY OFFER',
              title: 'Family Asha (1.0 km)',
              price: '₹ 165 (Low Price Offer)',
              mode: 'Buyer Pickup',
              reason: 'Alternative — lower item price, but adds extra 1 km transit route burden.',
              isRecommended: false,
              tagColor: AppColors.routeBlue,
            ),

            const SizedBox(height: 16),

            // Option C: Producer B (Not Feasible)
            _buildDetailedOptionCard(
              optionTag: 'OPTION C — PRODUCER B',
              title: 'Producer B (2.1 km)',
              price: '₹ 150',
              mode: 'Seller Drop',
              reason: 'Not feasible — delivery window exceeds 5 PM deadline.',
              isRecommended: false,
              tagColor: AppColors.alertRed,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailedOptionCard({
    required String optionTag,
    required String title,
    required String price,
    required String mode,
    required String reason,
    required bool isRecommended,
    required Color tagColor,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surfaceWhite,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isRecommended ? AppColors.impactGreen : AppColors.borderGray,
          width: isRecommended ? 2 : 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.horizontal(10, py: 4),
            decoration: BoxDecoration(
              color: tagColor.withOpacity(0.12),
              borderRadius: BorderRadius.circular(6),
            ),
            child: Text(
              optionTag,
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.bold,
                color: tagColor,
              ),
            ),
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: AppColors.primaryNavy,
                ),
              ),
              Text(
                price,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.extrabold,
                  color: AppColors.primaryNavy,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            mode,
            style: const TextStyle(fontSize: 12, color: AppColors.textMuted),
          ),
          const SizedBox(height: 12),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppColors.canvasBackground,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(Icons.info_outline, size: 16, color: AppColors.primaryNavy),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    reason,
                    style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w500,
                      color: AppColors.primaryNavy,
                      height: 1.3,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
