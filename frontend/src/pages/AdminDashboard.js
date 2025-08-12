import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminServices from '../components/admin/AdminServices';
import AdminBookings from '../components/admin/AdminBookings';
import AdminGallery from '../components/admin/AdminGallery';
import AdminOverview from '../components/admin/AdminOverview';

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/services" element={<AdminServices />} />
            <Route path="/bookings" element={<AdminBookings />} />
            <Route path="/gallery" element={<AdminGallery />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
