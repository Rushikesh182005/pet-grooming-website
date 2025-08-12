const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Public
router.post('/', [
  body('customerName').notEmpty().withMessage('Customer name is required'),
  body('customerEmail').isEmail().withMessage('Please enter a valid email'),
  body('customerPhone').notEmpty().withMessage('Phone number is required'),
  body('petName').notEmpty().withMessage('Pet name is required'),
  body('petType').isIn(['dog', 'cat', 'other']).withMessage('Invalid pet type'),
  body('services').isArray().withMessage('Services must be an array'),
  body('appointmentDate').notEmpty().withMessage('Appointment date is required'),
  body('appointmentTime').notEmpty().withMessage('Appointment time is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      petName,
      petType,
      petBreed,
      services,
      appointmentDate,
      appointmentTime,
      specialRequests
    } = req.body;

    // Calculate total price
    const serviceDetails = await Service.find({ _id: { $in: services } });
    const totalPrice = serviceDetails.reduce((sum, service) => sum + service.price, 0);

    const booking = new Booking({
      customerName,
      customerEmail,
      customerPhone,
      petName,
      petType,
      petBreed,
      services,
      appointmentDate,
      appointmentTime,
      totalPrice,
      specialRequests
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings (admin only)
// @access  Private
router.get('/', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('services')
      .sort({ appointmentDate: -1, appointmentTime: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get booking by ID (admin only)
// @access  Private
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('services');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status (admin only)
// @access  Private
router.put('/:id/status', [
  adminAuth,
  body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, notes } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    ).populate('services');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking details (admin only)
// @access  Private
router.put('/:id', [
  adminAuth,
  body('customerName').notEmpty().withMessage('Customer name is required'),
  body('customerEmail').isEmail().withMessage('Please enter a valid email'),
  body('customerPhone').notEmpty().withMessage('Phone number is required'),
  body('petName').notEmpty().withMessage('Pet name is required'),
  body('petType').isIn(['dog', 'cat', 'other']).withMessage('Invalid pet type'),
  body('services').isArray().withMessage('Services must be an array'),
  body('appointmentDate').notEmpty().withMessage('Appointment date is required'),
  body('appointmentTime').notEmpty().withMessage('Appointment time is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      petName,
      petType,
      petBreed,
      services,
      appointmentDate,
      appointmentTime,
      specialRequests,
      status,
      notes
    } = req.body;

    // Calculate total price
    const serviceDetails = await Service.find({ _id: { $in: services } });
    const totalPrice = serviceDetails.reduce((sum, service) => sum + service.price, 0);

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        customerName,
        customerEmail,
        customerPhone,
        petName,
        petType,
        petBreed,
        services,
        appointmentDate,
        appointmentTime,
        totalPrice,
        specialRequests,
        status,
        notes
      },
      { new: true }
    ).populate('services');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Delete a booking (admin only)
// @access  Private
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
