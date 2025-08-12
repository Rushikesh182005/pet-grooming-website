import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, PawPrint } from 'lucide-react';
import api from '../config/api';
import toast from 'react-hot-toast';

const Booking = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    petName: '',
    petType: 'dog',
    petBreed: '',
    services: [],
    appointmentDate: '',
    appointmentTime: '',
    specialRequests: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/services');
      setServices(response.data);
    } catch (error) {
      toast.error('Failed to load services');
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const calculateTotal = () => {
    return services
      .filter(service => formData.services.includes(service._id))
      .reduce((total, service) => total + service.price, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.services.length === 0) {
      toast.error('Please select at least one service');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/bookings', formData);
      toast.success('Booking submitted successfully! We will contact you soon.');
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        petName: '',
        petType: 'dog',
        petBreed: '',
        services: [],
        appointmentDate: '',
        appointmentTime: '',
        specialRequests: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit booking');
    } finally {
      setSubmitting(false);
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  if (loading) {
    return (
      <div className="section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-xl text-gray-600">
            Schedule your pet's grooming session with our professional team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Information */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="h-6 w-6 mr-2 text-primary-600" />
              Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* Pet Information */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <PawPrint className="h-6 w-6 mr-2 text-primary-600" />
              Pet Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Name *
                </label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="Enter pet's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Type *
                </label>
                <select
                  name="petType"
                  value={formData.petType}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Breed
                </label>
                <input
                  type="text"
                  name="petBreed"
                  value={formData.petBreed}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Enter pet's breed"
                />
              </div>
            </div>
          </div>

          {/* Services Selection */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Select Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service._id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.services.includes(service._id)
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => handleServiceToggle(service._id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <p className="text-sm text-gray-500">{service.duration} minutes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary-600">${service.price}</p>
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service._id)}
                        onChange={() => {}}
                        className="sr-only"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {formData.services.length > 0 && (
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="text-lg font-semibold text-primary-900">
                  Total: ${calculateTotal()}
                </p>
              </div>
            )}
          </div>

          {/* Appointment Scheduling */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-primary-600" />
              Schedule Appointment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <select
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Special Requests
            </h2>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows="4"
              className="input-field"
              placeholder="Any special requests or notes about your pet..."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
