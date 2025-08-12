import React, { useState, useEffect } from 'react';
import { Eye, Check, X, Clock } from 'lucide-react';
import api from '../../config/api';
import toast from 'react-hot-toast';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/api/bookings');
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await api.put(`/api/bookings/${bookingId}/status`, { status });
      toast.success('Booking status updated');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Bookings</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pet</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Services</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                    <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                    <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{booking.petName}</div>
                  <div className="text-sm text-gray-500 capitalize">{booking.petType}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {new Date(booking.appointmentDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">{booking.appointmentTime}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {booking.services.map(service => service.name).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">${booking.totalPrice}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium space-x-2">
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowModal(true);
                    }}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(booking._id, 'confirmed')}
                        className="text-green-600 hover:text-green-900"
                        title="Confirm"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => updateStatus(booking._id, 'cancelled')}
                        className="text-red-600 hover:text-red-900"
                        title="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => updateStatus(booking._id, 'completed')}
                      className="text-blue-600 hover:text-blue-900"
                      title="Mark Complete"
                    >
                      <Clock className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Booking Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Customer Information</h3>
                  <p><strong>Name:</strong> {selectedBooking.customerName}</p>
                  <p><strong>Email:</strong> {selectedBooking.customerEmail}</p>
                  <p><strong>Phone:</strong> {selectedBooking.customerPhone}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Pet Information</h3>
                  <p><strong>Name:</strong> {selectedBooking.petName}</p>
                  <p><strong>Type:</strong> {selectedBooking.petType}</p>
                  <p><strong>Breed:</strong> {selectedBooking.petBreed || 'Not specified'}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Appointment</h3>
                  <p><strong>Date:</strong> {new Date(selectedBooking.appointmentDate).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {selectedBooking.appointmentTime}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status}
                    </span>
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Services</h3>
                  <ul className="list-disc list-inside">
                    {selectedBooking.services.map((service, index) => (
                      <li key={index}>{service.name} - ${service.price}</li>
                    ))}
                  </ul>
                  <p className="mt-2"><strong>Total:</strong> ${selectedBooking.totalPrice}</p>
                </div>
                
                {selectedBooking.specialRequests && (
                  <div>
                    <h3 className="font-semibold text-gray-900">Special Requests</h3>
                    <p>{selectedBooking.specialRequests}</p>
                  </div>
                )}
                
                {selectedBooking.notes && (
                  <div>
                    <h3 className="font-semibold text-gray-900">Notes</h3>
                    <p>{selectedBooking.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
