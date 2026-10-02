import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/services/api_service.dart';

class CreateOfferScreen extends StatefulWidget {
  const CreateOfferScreen({Key? key}) : super(key: key);

  @override
  State<CreateOfferScreen> createState() => _CreateOfferScreenState();
}

class _CreateOfferScreenState extends State<CreateOfferScreen> {
  final _formKey = GlobalKey<FormState>();

  String _selectedCategory = 'FRESH_FOOD';
  String _selectedOfferMode = 'FREE';
  final TextEditingController _itemController = TextEditingController();
  final TextEditingController _qtyController = TextEditingController();
  final TextEditingController _unitController = TextEditingController(text: 'kg');
  final TextEditingController _priceController = TextEditingController();
  final TextEditingController _addressController = TextEditingController(text: 'Indiranagar 100ft Rd, Bangalore');
  int _availableHours = 12;
  bool _isSubmitting = false;

  final Map<String, String> _categories = {
    'FRESH_FOOD': 'Fresh Food / Vegetables',
    'DAIRY': 'Milk / Dairy',
    'BAKERY_PACKAGED': 'Bakery / Packaged Food',
    'CLOTHING': 'Clothing & Wearables',
    'EDUCATION': 'Books & Education',
    'HOUSEHOLD_REUSABLE': 'Household Reusable',
  };

  void _submitOffer() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isSubmitting = true);

    final payload = {
      'category': _selectedCategory,
      'item_name': _itemController.text,
      'quantity': double.parse(_qtyController.text),
      'unit': _unitController.text,
      'condition': 'Good',
      'offer_mode': _selectedOfferMode,
      'expected_price': _selectedOfferMode == 'SELL' ? double.tryParse(_priceController.text) ?? 0.0 : 0.0,
      'available_hours': _availableHours,
      'pickup_preference': 'Buyer Pickup',
      'latitude': 12.9716,
      'longitude': 77.6412,
      'address_approx': _addressController.text,
    };

    final success = await ApiService.createOffer(payload);
    setState(() => _isSubmitting = false);

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Resource offer published successfully!')),
      );
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.canvasBackground,
      appBar: AppBar(
        backgroundColor: AppColors.primaryNavy,
        elevation: 0,
        title: const Text(
          'CREATE RESOURCE OFFER',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Colors.white,
            letterSpacing: 1.0,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Offer a Useful Resource',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: AppColors.primaryNavy,
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Help useful items reach a better next use in your community.',
                style: TextStyle(fontSize: 12, color: AppColors.textMuted),
              ),
              const SizedBox(height: 24),

              // Category Selector
              const Text('Resource Category', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryNavy)),
              const SizedBox(height: 6),
              DropdownButtonFormField<String>(
                value: _selectedCategory,
                items: _categories.entries
                    .map((e) => DropdownMenuItem(value: e.key, child: Text(e.value, style: const TextStyle(fontSize: 14))))
                    .toList(),
                onChanged: (val) => setState(() => _selectedCategory = val!),
                decoration: _inputDecoration('Select category'),
              ),

              const SizedBox(height: 16),

              // Item Name
              const Text('Item Name', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryNavy)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _itemController,
                validator: (v) => v == null || v.isEmpty ? 'Enter item name' : null,
                decoration: _inputDecoration('e.g. Fresh Milk, Winter Jackets, School Books'),
              ),

              const SizedBox(height: 16),

              // Quantity & Unit
              Row(
                children: [
                  Expanded(
                    flex: 2,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Quantity', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryNavy)),
                        const SizedBox(height: 6),
                        TextFormField(
                          controller: _qtyController,
                          keyboardType: TextInputType.number,
                          validator: (v) => v == null || v.isEmpty ? 'Qty required' : null,
                          decoration: _inputDecoration('e.g. 3'),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    flex: 1,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Unit', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryNavy)),
                        const SizedBox(height: 6),
                        TextFormField(
                          controller: _unitController,
                          decoration: _inputDecoration('kg, piece, L'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 16),

              // Offer Mode (Sell, Free, Donate, Exchange)
              const Text('Offer Mode', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryNavy)),
              const SizedBox(height: 6),
              DropdownButtonFormField<String>(
                value: _selectedOfferMode,
                items: ['FREE', 'SELL', 'LOW_PRICE', 'DONATE', 'EXCHANGE']
                    .map((m) => DropdownMenuItem(value: m, child: Text(m, style: const TextStyle(fontSize: 14))))
                    .toList(),
                onChanged: (val) => setState(() => _selectedOfferMode = val!),
                decoration: _inputDecoration('Select mode'),
              ),

              if (_selectedOfferMode == 'SELL' || _selectedOfferMode == 'LOW_PRICE') ...[
                const SizedBox(height: 16),
                const Text('Expected Price (₹)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryNavy)),
                const SizedBox(height: 6),
                TextFormField(
                  controller: _priceController,
                  keyboardType: TextInputType.number,
                  decoration: _inputDecoration('e.g. 165'),
                ),
              ],

              const SizedBox(height: 16),

              // Expiry / Available Hours
              const Text('Available Until (Hours)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryNavy)),
              const SizedBox(height: 6),
              Slider(
                value: _availableHours.toDouble(),
                min: 2,
                max: 72,
                divisions: 35,
                activeColor: AppColors.impactGreen,
                label: '$_availableHours hours',
                onChanged: (v) => setState(() => _availableHours = v.round()),
              ),
              Text('Available for next $_availableHours hours', style: const TextStyle(fontSize: 12, color: AppColors.textMuted)),

              const SizedBox(height: 28),

              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: _isSubmitting ? null : _submitOffer,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primaryNavy,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: _isSubmitting
                      ? const CircularProgressIndicator(color: Colors.white)
                      : const Text(
                          'Publish Offer',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  InputDecoration _inputDecoration(String hint) {
    return InputDecoration(
      hintText: hint,
      hintStyle: const TextStyle(fontSize: 13, color: AppColors.textMuted),
      filled: true,
      fillColor: AppColors.surfaceWhite,
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: AppColors.borderGray),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: AppColors.borderGray),
      ),
    );
  }
}
