import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Settings, LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      href: '/admin',
    },
    {
      label: 'Users',
      icon: <Users size={20} />,
      href: '/admin/users',
    },
    {
      label: 'Programs',
      icon: <BookOpen size={20} />,
      href: '/admin/programs',
    },
    {
      label: 'Payments',
      icon: <CreditCard size={20} />,
      href: '/admin/payments',
    },
    {
      label: 'Settings',
      icon: <Settings size={20} />,
      href: '/admin/settings',
    },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-900 text-gray-200">
      <div className="p-5 border-b border-gray-800">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <div>
            <p className="font-bold text-white">Admin Panel</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary text-white font-medium'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-3 py-2 w-full text-left rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
        
        <Link 
          to="/" 
          className="mt-4 block text-center text-sm text-gray-400 hover:text-white transition-colors"
        >
          View Website
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;