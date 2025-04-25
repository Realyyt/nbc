import { Link } from 'react-router-dom';
import { 
  Users, BookOpen, CreditCard, ShoppingBag,
  TrendingUp, ChevronRight, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { mockUsers, mockPayments } from '../../data/mockData';

const AdminDashboard = () => {
  // Calculate overview stats
  const totalUsers = mockUsers.length;
  const totalCourses = 10;
  const totalRevenue = mockPayments.reduce((total, payment) => total + payment.amount, 0);
  const recentPayments = mockPayments.slice(0, 5);
  const recentUsers = mockUsers.slice(0, 5);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of your learning platform
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold mt-1">{totalUsers}</p>
              <div className="flex items-center mt-2 text-xs text-success">
                <ArrowUpRight size={14} className="mr-1" />
                <span>3 new this week</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Users size={24} className="text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Courses</p>
              <p className="text-2xl font-semibold mt-1">{totalCourses}</p>
              <div className="flex items-center mt-2 text-xs text-success">
                <ArrowUpRight size={14} className="mr-1" />
                <span>2 new this month</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <BookOpen size={24} className="text-secondary" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold mt-1">₦{totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-xs text-success">
                <ArrowUpRight size={14} className="mr-1" />
                <span>12% this month</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-success/10 rounded-full flex items-center justify-center">
              <CreditCard size={24} className="text-success" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Enrollments</p>
              <p className="text-2xl font-semibold mt-1">9</p>
              <div className="flex items-center mt-2 text-xs text-error">
                <ArrowDownRight size={14} className="mr-1" />
                <span>5% this week</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center">
              <ShoppingBag size={24} className="text-accent" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Revenue chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
          <select className="border border-gray-300 rounded-md text-sm p-2">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
        
        <div className="h-64 flex items-center justify-center">
          {/* This would be a chart in a real application */}
          <div className="text-center">
            <TrendingUp size={48} className="text-primary mx-auto mb-4" />
            <p className="text-gray-500">Chart placeholder - would show revenue trend</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent payments */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Recent Payments</h2>
            <Link to="/admin/payments" className="text-sm text-primary font-medium flex items-center hover:underline">
              View all <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                          {payment.user.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">{payment.user}</p>
                          <p className="text-xs text-gray-500">{payment.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-800">₦{payment.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{payment.method}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-800">
                        {new Date(payment.date).toLocaleDateString('en-NG', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent users */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Recent Users</h2>
            <Link to="/admin/users" className="text-sm text-primary font-medium flex items-center hover:underline">
              View all <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-800">{user.courses}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-800">₦{user.totalSpent.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-800">
                        {new Date(user.lastActive).toLocaleDateString('en-NG', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;