import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/models/models.dart';
import '../../../core/services/api_service.dart';

class BuyerHomeScreen extends StatefulWidget {
  final VoidCallback onCreateNeedPressed;
  final VoidCallback onCompareSourcesPressed;

  const BuyerHomeScreen({
    Key? key,
    required this.onCreateNeedPressed,
    required this.onCompareSourcesPressed,
  }) : super(key: key);

  @override
  State<BuyerHomeScreen> createState() => _BuyerHomeScreenState();
}

class _BuyerHomeScreenState extends State<BuyerHomeScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.canvasBackground,
      appBar: AppBar(
        backgroundColor: AppColors.primaryNavy,
        elevation: 0,
        title: const Text(
          'BUYER / RECEIVER DASHBOARD',
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
              'What do you need?',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.extrabold,
                color: AppColors.primaryNavy,
              ),
            ),
            const SizedBox(height: 12),

            // Search input box matching spec
            TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Search milk, clothes, vegetables, books...',
                hintStyle: const TextStyle(fontSize: 13, color: AppColors.textMuted),
                prefixIcon: const Icon(Icons.search, color: AppColors.textMuted),
                filled: true,
                fillColor: AppColors.surfaceWhite,
                contentPadding: const EdgeInsets.symmetric(vertical: 12),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: AppColors.borderGray),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: AppColors.borderGray),
                ),
              ),
            ),

            const SizedBox(height: 20),

            // Active Need Card (Matches Figure 6 Prototype Screen in Spec!)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.primaryNavy,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text(
                        'NEED: 3 kg milk by 5:00 PM',
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      Icon(Icons.access_time, color: AppColors.cautionAmber, size: 18),
                    ],
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Best available option is not always the nearest seller.',
                    style: TextStyle(fontSize: 11, color: Colors.white70),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: widget.onCompareSourcesPressed,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.routeBlue,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: const Text(
                        'Compare Supply Sources',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            const Text(
              'Recommended sources',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: AppColors.primaryNavy,
              ),
            ),
            const SizedBox(height: 12),

            // Source A: Local Shop (RECOMMENDED)
            _buildSourceOptionCard(
              title: 'Local Milk Shop',
              distance: '300 m',
              price: '₹ 180',
              subtitle: 'Recommended • Local verified shop',
              isRecommended: true,
              badgeColor: AppColors.impactGreen,
            ),
            const SizedBox(height: 12),

            // Source B: Family A (Alternative)
            _buildSourceOptionCard(
              title: 'Family A',
              distance: '1.0 km',
              price: '₹ 165',
              subtitle: 'Lower price, extra travel burden',
              isRecommended: false,
              badgeColor: AppColors.routeBlue,
            ),
            const SizedBox(height: 12),

            // Source C: Producer B (Not Feasible)
            _buildSourceOptionCard(
              title: 'Producer B',
              distance: '2.1 km',
              price: '₹ 150',
              subtitle: 'Not feasible in time window',
              isRecommended: false,
              badgeColor: AppColors.textMuted,
            ),

            const SizedBox(height: 24),

            // Create Need CTA Button
            SizedBox(
              width: double.infinity,
              height: 50,
              child: OutlinedButton.icon(
                onPressed: widget.onCreateNeedPressed,
                icon: const Icon(Icons.add, color: AppColors.primaryNavy),
                label: const Text(
                  'Post a New Resource Need',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: AppColors.primaryNavy,
                  ),
                ),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: AppColors.primaryNavy, width: 1.5),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSourceOptionCard({
    required String title,
    required String distance,
    required String price,
    required String subtitle,
    required bool isRecommended,
    required Color badgeColor,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surfaceWhite,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: isRecommended ? AppColors.impactGreen : AppColors.borderGray,
          width: isRecommended ? 1.5 : 1,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: AppColors.primaryNavy,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    distance,
                    style: const TextStyle(fontSize: 12, color: AppColors.textMuted),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: isRecommended ? FontWeight.bold : FontWeight.normal,
                  color: badgeColor,
                ),
              ),
            ],
          ),
          Text(
            price,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.extrabold,
              color: AppColors.primaryNavy,
            ),
          ),
        ],
      ),
    );
  }
}
