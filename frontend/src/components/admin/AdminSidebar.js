import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Scissors, 
  Calendar, 
  Image, 
  LogOut,
  PawPrint 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Overview', path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Services', path: '/admin/services', icon: <Scissors className="h-5 w-5" /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <Image className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <PawPrint className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">Admin Panel</span>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
