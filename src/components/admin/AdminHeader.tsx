import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Get current page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Admin Dashboard';
    if (path === '/admin/users') return 'Manage Users';
    if (path === '/admin/payments') return 'Payment Records';
    if (path === '/admin/settings') return 'System Settings';
    return 'Admin Dashboard';
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16">
      <div className="px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <button className="md:hidden mr-4 text-gray-600">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">System Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-800">New user registered</p>
                    <p className="text-xs text-gray-500 mt-1">Emeka Johnson has created a new account.</p>
                    <p className="text-xs text-gray-400 mt-1">30 minutes ago</p>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-800">New payment received</p>
                    <p className="text-xs text-gray-500 mt-1">Payment of ₦45,000 received from Ada Okafor.</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="p-2 text-center border-t border-gray-200">
                  <a href="#" className="text-xs text-primary hover:underline">View all notifications</a>
                </div>
              </div>
            )}
          </div>

          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div className="hidden md:block">
                <span className="text-sm font-medium text-gray-700">Admin User</span>
                <ChevronDown size={16} className="inline ml-1" />
              </div>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="p-2">
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile Settings
                  </a>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;