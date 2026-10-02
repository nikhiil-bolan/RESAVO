import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/models/models.dart';
import '../../../core/services/api_service.dart';

class MatchDecisionScreen extends StatefulWidget {
  final String offerId;

  const MatchDecisionScreen({Key? key, required this.offerId}) : super(key: key);

  @override
  State<MatchDecisionScreen> createState() => _MatchDecisionScreenState();
}

class _MatchDecisionScreenState extends State<MatchDecisionScreen> {
  MatchSuggestion? _suggestion;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchMatch();
  }

  Future<void> _fetchMatch() async {
    final list = await ApiService.getMatchSuggestions(offerId: widget.offerId);
    setState(() {
      if (list.isNotEmpty) {
        _suggestion = list.first;
      }
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.canvasBackground,
      appBar: AppBar(
        backgroundColor: AppColors.primaryNavy,
        elevation: 0,
        title: const Text(
          'MATCH DECISION',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Colors.white,
            letterSpacing: 1.0,
          ),
        ),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primaryNavy))
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Smart match decision',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.extrabold,
                      color: AppColors.primaryNavy,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Side-by-Side Offer vs Need Box (Matches Figure 7 Prototype in Spec!)
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFBF8E6),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.cautionAmber.withOpacity(0.3)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text(
                              'Family A',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: AppColors.impactGreen,
                              ),
                            ),
                            SizedBox(height: 2),
                            Text(
                              '3 kg milk | 1 km',
                              style: TextStyle(fontSize: 12, color: AppColors.primaryNavy),
                            ),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: const [
                            Text(
                              'Bakery B',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: AppColors.primaryNavy,
                              ),
                            ),
                            SizedBox(height: 2),
                            Text(
                              'Needs 3 kg | by 5 PM',
                              style: TextStyle(fontSize: 12, color: AppColors.primaryNavy),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Decision Banner: DO NOT TRANSFER (Matches Figure 7 Prototype!)
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceWhite,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: _suggestion?.decision == 'ALTERNATIVE' || _suggestion?.decision == 'NO_TRANSFER'
                            ? AppColors.alertRed
                            : AppColors.impactGreen,
                        width: 2,
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _suggestion?.decision == 'ALTERNATIVE' || _suggestion?.decision == 'NO_TRANSFER'
                              ? 'Decision: DO NOT TRANSFER'
                              : 'Decision: RECOMMENDED MATCH',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.extrabold,
                            color: _suggestion?.decision == 'ALTERNATIVE' || _suggestion?.decision == 'NO_TRANSFER'
                                ? AppColors.alertRed
                                : AppColors.impactGreen,
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Bulleted Reasons
                        ...(_suggestion?.reasons ?? [
                          'Bakery has a verified local shop at 300 m.',
                          'Family route would add unnecessary travel.',
                          'Preserving the resource does not require this transfer.'
                        ]).map((reason) => Padding(
                              padding: const EdgeInsets.only(bottom: 8.0),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Icon(
                                    Icons.circle,
                                    size: 8,
                                    color: AppColors.impactGreen,
                                  ),
                                  const SizedBox(width: 10),
                                  Expanded(
                                    child: Text(
                                      reason,
                                      style: const TextStyle(
                                        fontSize: 13,
                                        color: AppColors.primaryNavy,
                                        height: 1.3,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            )),
                      ],
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Next Action Prompt Box
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.impactGreen.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: AppColors.impactGreen.withOpacity(0.3)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Next action for seller:',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                            color: AppColors.primaryNavy,
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
                          'Search another nearby buyer or community distribution drive.',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: AppColors.impactGreen,
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 24),

                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton(
                      onPressed: () => Navigator.pop(context),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primaryNavy,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: const Text(
                        'Back to Dashboard',
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
