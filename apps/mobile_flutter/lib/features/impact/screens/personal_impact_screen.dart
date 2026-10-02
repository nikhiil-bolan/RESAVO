import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class PersonalImpactScreen extends StatelessWidget {
  const PersonalImpactScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.canvasBackground,
      appBar: AppBar(
        backgroundColor: AppColors.primaryNavy,
        elevation: 0,
        title: const Text(
          'YOUR PERSONAL IMPACT',
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
              'Impact Summary',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.extrabold,
                color: AppColors.primaryNavy,
              ),
            ),
            const SizedBox(height: 4),
            const Text(
              'Strict separation of audit-verified outcomes from active estimates.',
              style: TextStyle(fontSize: 12, color: AppColors.textMuted),
            ),
            const SizedBox(height: 20),

            // VERIFIED IMPACT CARD
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.surfaceWhite,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.impactGreen, width: 2),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text(
                        'AUDIT-VERIFIED IMPACT',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.extrabold,
                          color: AppColors.impactGreen,
                          letterSpacing: 0.8,
                        ),
                      ),
                      Icon(Icons.verified, color: AppColors.impactGreen, size: 20),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    '₹ 4,800',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.black,
                      color: AppColors.primaryNavy,
                    ),
                  ),
                  const Text(
                    'Verified value preserved across 2 confirmed handovers',
                    style: TextStyle(fontSize: 12, color: AppColors.textMuted),
                  ),
                  const SizedBox(height: 16),
                  const Divider(color: AppColors.borderGray),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text('Quantity Preserved:', style: TextStyle(fontSize: 13, color: AppColors.textDark)),
                      Text('35 units / kg', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.impactGreen)),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // ESTIMATED POTENTIAL CARD
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surfaceWhite,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderGray),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'ESTIMATED POTENTIAL (ACTIVE OFFERS)',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textMuted,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    '23 units currently active in network pipeline',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.primaryNavy),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            const Text(
              'Verified History Ledger',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: AppColors.primaryNavy,
              ),
            ),
            const SizedBox(height: 12),

            _buildHistoryItem('20 Warm Clothes delivered to NGO', '₹4,500 value • Verified'),
            _buildHistoryItem('5 kg Fresh Milk transferred', '₹300 value • Verified'),
          ],
        ),
      ),
    );
  }

  Widget _buildHistoryItem(String title, String subtitle) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.surfaceWhite,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.borderGray),
      ),
      child: Row(
        children: [
          const Icon(Icons.check_circle, color: AppColors.impactGreen, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryNavy)),
                const SizedBox(height: 2),
                Text(subtitle, style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
