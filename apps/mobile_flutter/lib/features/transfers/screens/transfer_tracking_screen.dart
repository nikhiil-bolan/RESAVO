import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class TransferTrackingScreen extends StatefulWidget {
  const TransferTrackingScreen({Key? key}) : super(key: key);

  @override
  State<TransferTrackingScreen> createState() => _TransferTrackingScreenState();
}

class _TransferTrackingScreenState extends State<TransferTrackingScreen> {
  String _transferStatus = 'IN_TRANSIT';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.canvasBackground,
      appBar: AppBar(
        backgroundColor: AppColors.primaryNavy,
        elevation: 0,
        title: const Text(
          'TRANSFER & VERIFICATION',
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
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surfaceWhite,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.borderGray),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'TR-8841 • 20 Warm Clothes',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: AppColors.primaryNavy,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.horizontal(8, py: 4),
                        decoration: BoxDecoration(
                          color: _transferStatus == 'COMPLETED'
                              ? AppColors.impactGreen.withOpacity(0.15)
                              : AppColors.routeBlue.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          _transferStatus,
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: _transferStatus == 'COMPLETED'
                                ? AppColors.impactGreen
                                : AppColors.routeBlue,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Provider: Asha Household → Requester: Hope Foundation NGO',
                    style: TextStyle(fontSize: 12, color: AppColors.textMuted),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            const Text(
              'Verification Lifecycle Timeline',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: AppColors.primaryNavy,
              ),
            ),
            const SizedBox(height: 16),

            _buildTimelineStep(
              title: 'Match Accepted',
              subtitle: 'Task created for 20 clothes at low price offer mode.',
              isDone: true,
            ),
            _buildTimelineStep(
              title: 'Pickup Confirmed (Step 1)',
              subtitle: 'Provider confirmed quantity (20 pieces) & good condition at pickup.',
              isDone: true,
            ),
            _buildTimelineStep(
              title: 'In Transit',
              subtitle: 'En route to Koramangala 5th Block Shelter.',
              isDone: _transferStatus == 'IN_TRANSIT' || _transferStatus == 'COMPLETED',
            ),
            _buildTimelineStep(
              title: 'Receipt Confirmed (Step 2 — Impact Entry)',
              subtitle: 'Receiver confirms quantity received and accepted condition.',
              isDone: _transferStatus == 'COMPLETED',
              isLast: true,
            ),

            const SizedBox(height: 32),

            if (_transferStatus == 'IN_TRANSIT') ...[
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton.icon(
                  onPressed: () {
                    setState(() => _transferStatus = 'COMPLETED');
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Receipt confirmed! Verified impact recorded in ledger.'),
                      ),
                    );
                  },
                  icon: const Icon(Icons.check_circle, color: Colors.white),
                  label: const Text(
                    'Confirm Receipt & Verify Impact',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.impactGreen,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
            ] else ...[
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: AppColors.impactGreen.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Center(
                  child: Text(
                    '✓ Transfer Completed & Verified in Impact Ledger',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: AppColors.impactGreen,
                    ),
                  ),
                ),
              )
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildTimelineStep({
    required String title,
    required String subtitle,
    required bool isDone,
    bool isLast = false,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Icon(
              isDone ? Icons.check_circle : Icons.radio_button_unchecked,
              color: isDone ? AppColors.impactGreen : AppColors.borderGray,
              size: 22,
            ),
            if (!isLast)
              Container(
                width: 2,
                height: 36,
                color: isDone ? AppColors.impactGreen : AppColors.borderGray,
              ),
          ],
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: isDone ? AppColors.primaryNavy : AppColors.textMuted,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: const TextStyle(fontSize: 12, color: AppColors.textMuted),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ],
    );
  }
}
