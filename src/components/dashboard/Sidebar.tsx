import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      href: '/dashboard',
    },
    {
      label: 'My Programs',
      icon: <BookOpen size={20} />,
      href: '/dashboard/courses',
    },
    {
      label: 'Profile',
      icon: <User size={20} />,
      href: '/dashboard/profile',
    },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
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
                      : 'text-gray-700 hover:bg-gray-100'
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
      
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-3 py-2 w-full text-left rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
        
        <Link 
          to="/courses" 
          className="mt-4 block text-center text-sm text-primary font-medium hover:underline"
        >
          Browse Programs
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;