import 'package:flutter/material.dart';
import 'core/theme/app_colors.dart';
import 'features/auth/screens/role_selection_screen.dart';
import 'features/seller/screens/seller_home_screen.dart';
import 'features/seller/screens/create_offer_screen.dart';
import 'features/buyer/screens/buyer_home_screen.dart';
import 'features/buyer/screens/create_need_screen.dart';
import 'features/buyer/screens/source_comparison_screen.dart';
import 'features/matches/screens/match_decision_screen.dart';
import 'features/transfers/screens/transfer_tracking_screen.dart';
import 'features/impact/screens/personal_impact_screen.dart';

void main() {
  runApp(const ResavoApp());
}

class ResavoApp extends StatelessWidget {
  const ResavoApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RESAVO',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: AppColors.canvasBackground,
        primaryColor: AppColors.primaryNavy,
        fontFamily: 'Roboto',
      ),
      home: const MainNavigationShell(),
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({Key? key}) : super(key: key);

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;
  String _activeRole = 'SELLER';

  @override
  Widget build(BuildContext context) {
    final List<Widget> pages = [
      _activeRole == 'SELLER'
          ? SellerHomeScreen(
              onCreateOfferPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const CreateOfferScreen()),
                );
              },
              onFindMatchPressed: (offerId) {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => MatchDecisionScreen(offerId: offerId),
                  ),
                );
              },
            )
          : BuyerHomeScreen(
              onCreateNeedPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const CreateNeedScreen()),
                );
              },
              onCompareSourcesPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const SourceComparisonScreen()),
                );
              },
            ),
      _activeRole == 'SELLER'
          ? MatchDecisionScreen(offerId: 'off-1')
          : const SourceComparisonScreen(),
      const TransferTrackingScreen(),
      const PersonalImpactScreen(),
      _buildProfileScreen(),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (idx) => setState(() => _currentIndex = idx),
        selectedItemColor: AppColors.primaryNavy,
        unselectedItemColor: AppColors.textMuted,
        type: BottomNavigationBarType.fixed,
        backgroundColor: AppColors.surfaceWhite,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.compare_arrows), label: 'Matches'),
          BottomNavigationBarItem(icon: Icon(Icons.local_shipping_outlined), label: 'Transfers'),
          BottomNavigationBarItem(icon: Icon(Icons.nature_people_outlined), label: 'Impact'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'Profile'),
        ],
      ),
    );
  }

  Widget _buildProfileScreen() {
    return Scaffold(
      backgroundColor: AppColors.canvasBackground,
      appBar: AppBar(
        backgroundColor: AppColors.primaryNavy,
        title: const Text('USER PROFILE & ROLE SWITCH'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Asha Sharma',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.primaryNavy),
            ),
            const Text('asha.sharma@resavo.org', style: TextStyle(color: AppColors.textMuted)),
            const SizedBox(height: 24),
            const Text(
              'Active Operational Role Mode',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.primaryNavy),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: ChoiceChip(
                    label: const Text('SELLER / PROVIDER'),
                    selected: _activeRole == 'SELLER',
                    selectedColor: AppColors.impactGreen.withOpacity(0.2),
                    onSelected: (val) {
                      if (val) setState(() => _activeRole = 'SELLER');
                    },
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ChoiceChip(
                    label: const Text('BUYER / RECEIVER'),
                    selected: _activeRole == 'BUYER',
                    selectedColor: AppColors.routeBlue.withOpacity(0.2),
                    onSelected: (val) {
                      if (val) setState(() => _activeRole = 'BUYER');
                    },
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
