import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/services/api_service.dart';

class CreateNeedScreen extends StatefulWidget {
  const CreateNeedScreen({Key? key}) : super(key: key);

  @override
  State<CreateNeedScreen> createState() => _CreateNeedScreenState();
}

class _CreateNeedScreenState extends State<CreateNeedScreen> {
  final _formKey = GlobalKey<FormState>();

  String _selectedCategory = 'DAIRY';
  final TextEditingController _itemController = TextEditingController(text: 'Milk');
  final TextEditingController _qtyController = TextEditingController(text: '3');
  final TextEditingController _unitController = TextEditingController(text: 'kg');
  final TextEditingController _purposeController = TextEditingController(text: 'Bakery production');
  final TextEditingController _addressController = TextEditingController(text: '12th Main Indiranagar Bakery');
  bool _isSubmitting = false;

  void _submitNeed() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isSubmitting = true);

    final payload = {
      'category': _selectedCategory,
      'item_name': _itemController.text,
      'quantity': double.parse(_qtyController.text),
      'unit': _unitController.text,
      'needed_within_hours': 12,
      'purpose': _purposeController.text,
      'preferred_mode': 'FREE',
      'fulfillment_preference': 'Either',
      'latitude': 12.9780,
      'longitude': 77.6440,
      'address': _addressController.text,
    };

    final success = await ApiService.createNeed(payload);
    setState(() => _isSubmitting = false);

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Resource need posted successfully!')),
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
          'CREATE RESOURCE NEED',
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
                'Request a Resource Need',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: AppColors.primaryNavy,
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Specify quantity, deadline, and recipient purpose (Bakery, NGO, Family, School).',
                style: TextStyle(fontSize: 12, color: AppColors.textMuted),
              ),
              const SizedBox(height: 24),

              // Item Name
              const Text('Resource Required', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryNavy)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _itemController,
                validator: (v) => v == null || v.isEmpty ? 'Enter item name' : null,
                decoration: _inputDecoration('e.g. Milk, Clothes, Books'),
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
                          validator: (v) => v == null || v.isEmpty ? 'Required' : null,
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
                          decoration: _inputDecoration('kg, piece'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 16),

              // Purpose
              const Text('Recipient Purpose', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryNavy)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _purposeController,
                decoration: _inputDecoration('e.g. Bakery production, NGO distribution, School hostel'),
              ),

              const SizedBox(height: 16),

              // Address
              const Text('Delivery / Receiving Location', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primaryNavy)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _addressController,
                decoration: _inputDecoration('Enter location address'),
              ),

              const SizedBox(height: 28),

              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: _isSubmitting ? null : _submitNeed,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.routeBlue,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: _isSubmitting
                      ? const CircularProgressIndicator(color: Colors.white)
                      : const Text(
                          'Find Options',
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
