import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Copy, 
  ExternalLink,
  Download,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';
import { affiliateService } from '../../services/affiliateService';
import { Affiliate, AffiliateStats, AffiliateReferral } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import AffiliatePaymentSettings from '../../components/AffiliatePaymentSettings';

const AffiliateDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [referrals, setReferrals] = useState<AffiliateReferral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAffiliateCode, setShowAffiliateCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'payments'>('dashboard');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [affiliateData, statsData, referralsData] = await Promise.all([
        affiliateService.getAffiliateProfile(),
        affiliateService.getAffiliateStats(),
        affiliateService.getReferrals()
      ]);

      setAffiliate(affiliateData);
      setStats(statsData);
      setReferrals(referralsData.referrals);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAffiliateUpdate = (updatedAffiliate: Affiliate) => {
    setAffiliate(updatedAffiliate);
  };

  const copyAffiliateCode = async () => {
    if (affiliate?.affiliateCode) {
      try {
        await navigator.clipboard.writeText(affiliate.affiliateCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  const getAffiliateLink = () => {
    if (affiliate?.affiliateCode) {
      return `${window.location.origin}/register?ref=${affiliate.affiliateCode}`;
    }
    return '';
  };

  const copyAffiliateLink = async () => {
    const link = getAffiliateLink();
    if (link) {
      try {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!affiliate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">You are not an approved affiliate</p>
          <Link
            to="/affiliate-application"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Apply Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Test Message */}
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
        <strong>Debug:</strong> AffiliateDashboard component is rendering!
      </div>
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-primary font-bold text-xl">
                NBTA Learning
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Affiliate Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {affiliate.userId}!
              </h1>
              <p className="text-gray-600">
                Your affiliate status: 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(affiliate.status)}`}>
                  {affiliate.status}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Commission Rate</p>
              <p className="text-2xl font-bold text-primary">{affiliate.commissionRate}%</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-primary/10 rounded-full p-3">
                  <DollarSign className="text-primary" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">₦{stats.totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-3">
                  <Users className="text-green-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalReferrals}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3">
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Referrals</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeReferrals}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-3">
                  <TrendingUp className="text-purple-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Commission Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{affiliate.commissionRate}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Affiliate Code Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Affiliate Code</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Affiliate Code
              </label>
              <div className="flex">
                <input
                  type={showAffiliateCode ? 'text' : 'password'}
                  value={affiliate.affiliateCode}
                  readOnly
                  className="flex-1 input rounded-r-none"
                />
                <button
                  onClick={() => setShowAffiliateCode(!showAffiliateCode)}
                  className="px-3 py-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200"
                >
                  {showAffiliateCode ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={copyAffiliateCode}
                  className="px-3 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark ml-1"
                >
                  <Copy size={16} />
                </button>
              </div>
              {copied && (
                <p className="text-green-600 text-sm mt-1 flex items-center">
                  <CheckCircle size={14} className="mr-1" />
                  Copied to clipboard!
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Affiliate Link
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={getAffiliateLink()}
                  readOnly
                  className="flex-1 input rounded-r-none"
                />
                <button
                  onClick={copyAffiliateLink}
                  className="px-3 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark"
                >
                  <Copy size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Share this link to start earning commissions
              </p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h2>
          {affiliate.paymentInfo?.bankName ? (
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Bank Name</p>
                <p className="text-lg font-semibold text-gray-900">{affiliate.paymentInfo.bankName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Account Number</p>
                <p className="text-lg font-semibold text-gray-900">****{affiliate.paymentInfo.accountNumber.slice(-4)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Account Name</p>
                <p className="text-lg font-semibold text-gray-900">{affiliate.paymentInfo.accountName}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Banknote className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">No payment information provided</p>
              <p className="text-sm text-gray-400">Please update your payment information to receive commissions</p>
            </div>
          )}
        </div>

        {/* Recent Referrals */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Referrals</h2>
            <Link
              to="/affiliate/referrals"
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              View All
            </Link>
          </div>
          
          {referrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {referrals.slice(0, 5).map((referral) => (
                    <tr key={referral.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {referral.referredUserName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {referral.referredUserEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{referral.courseTitle}</div>
                        <div className="text-sm text-gray-500">₦{referral.coursePrice.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          ₦{referral.commissionAmount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(referral.paymentStatus)}`}>
                          {referral.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(referral.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No referrals yet. Start sharing your affiliate link!</p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'payments'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Payment Settings
              </button>

            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div>
                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Link
                    to="/affiliate/referrals"
                    className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                  >
                    <BarChart3 className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">View All Referrals</h3>
                    <p className="text-gray-600 text-sm">See detailed analytics and performance metrics</p>
                  </Link>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <Settings className="h-8 w-8 text-gray-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Settings</h3>
                    <p className="text-gray-600 text-sm">Update payment info and preferences</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && affiliate && (
              <AffiliatePaymentSettings 
                affiliate={affiliate} 
                onUpdate={handleAffiliateUpdate} 
              />
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
