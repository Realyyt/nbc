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
  EyeOff,
  Star,
  Target,
  Zap,
  Award,
  Share2,
  Link as LinkIcon,
  Activity,
  PieChart,
  TrendingDown,
  Gift,
  Trophy,
  Sparkles
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
        affiliateService.getAffiliateReferrals()
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
    if (affiliate?.affiliate_code) {
      const affiliateLink = `${window.location.origin}/register?ref=${affiliate.affiliate_code}`;
      try {
        await navigator.clipboard.writeText(affiliateLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadDashboardData}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!affiliate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Not an Approved Affiliate</h2>
          <p className="text-gray-600 mb-6">You need to be approved as an affiliate to access this dashboard.</p>
          <Link
            to="/affiliate-application"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors inline-block"
          >
            Apply Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-primary font-bold text-xl flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mr-2">
                  N
                </div>
                NBTA Learning
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-medium">Affiliate Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Online</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    Welcome back, {affiliate?.full_name || 'Affiliate'}! 👋
                  </h1>
                  <p className="text-white/90 text-lg mb-4">
                    Here's your affiliate performance overview
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      <span>ID: {affiliate?.affiliate_code}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      <span>Commission: {affiliate?.commission_rate ? (affiliate.commission_rate * 100).toFixed(1) : '10.0'}%</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1" />
                      <span>Status: {affiliate?.status || 'Active'}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">{stats?.totalReferrals || 0}</div>
                      <div className="text-sm text-white/80">Total Referrals</div>
                      <div className="mt-2 flex items-center justify-center text-green-300">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-xs">+{stats?.monthlyReferrals || 0} this month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ₦{stats?.totalEarnings?.toLocaleString() || '0'}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">₦{stats?.monthlyEarnings?.toLocaleString() || '0'} this month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Referrals</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats?.activeReferrals || 0}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">{stats?.activeReferrals || 0} completed</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Commission Rate</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {affiliate?.commission_rate ? (affiliate.commission_rate * 100).toFixed(1) : '10.0'}%
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-violet-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-gray-600 font-medium">Standard rate</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payout</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ₦{stats?.pendingCommissions?.toLocaleString() || '0'}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-gray-600 font-medium">₦{stats?.paidCommissions?.toLocaleString() || '0'} paid</span>
              </div>
            </div>
          </div>

          {/* Affiliate Code Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Your Affiliate Link</h3>
                <p className="text-gray-600 mt-1">Share this link to start earning commissions</p>
              </div>
              <button
                onClick={copyAffiliateCode}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border">
              <div className="flex items-center space-x-3">
                <LinkIcon className="h-5 w-5 text-gray-400" />
                <code className="text-sm text-gray-800 flex-1 font-mono">
                  {`${window.location.origin}/register?ref=${affiliate.affiliate_code}`}
                </code>
                <button
                  onClick={() => setShowAffiliateCode(!showAffiliateCode)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showAffiliateCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                <Share2 className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-900 mb-1">Share on Social</p>
                <p className="text-xs text-gray-600">Post your link on social media</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                <ExternalLink className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-900 mb-1">Direct Link</p>
                <p className="text-xs text-gray-600">Send directly to friends</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                <Download className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-900 mb-1">QR Code</p>
                <p className="text-xs text-gray-600">Generate QR code</p>
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Referrals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Referrals</h3>
                  <Link
                    to="/affiliate/referrals"
                    className="text-sm text-primary hover:text-primary-600 flex items-center font-medium"
                  >
                    View all
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                {referrals.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No referrals yet</h4>
                    <p className="text-gray-600 mb-4">Start sharing your affiliate link to earn commissions!</p>
                    <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium">
                      Share Your Link
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {referrals.slice(0, 5).map((referral) => (
                      <div key={referral.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{referral.referred_user_name}</p>
                            <p className="text-sm text-gray-600">{referral.referred_user_email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">₦{referral.commission_amount?.toLocaleString()}</p>
                          <div className="flex items-center text-sm">
                            {referral.status === 'completed' ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-600 font-medium">Completed</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-yellow-600 font-medium">Pending</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Conversion Rate</p>
                      <p className="text-sm text-gray-600">Last 30 days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {stats?.totalReferrals > 0 ? ((stats?.activeReferrals / stats?.totalReferrals) * 100).toFixed(1) : '0'}%
                    </p>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>{stats?.activeReferrals || 0} completed</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <PieChart className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Avg. Commission</p>
                      <p className="text-sm text-gray-600">Per referral</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      ₦{stats?.totalReferrals > 0 ? (stats?.totalEarnings / stats?.totalReferrals).toFixed(0) : '0'}
                    </p>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>per referral</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Affiliate Code</p>
                      <p className="text-sm text-gray-600">Your unique code</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{affiliate?.affiliate_code || 'N/A'}</p>
                    <div className="flex items-center text-sm text-blue-600">
                      <span>Your affiliate code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/affiliate/referrals"
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-3 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
                  <p className="text-gray-600 text-sm">View detailed performance metrics</p>
                </div>
              </div>
            </Link>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg">
                  <Settings className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
                  <p className="text-gray-600 text-sm">Update payment info and preferences</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-purple-100 to-violet-100 p-3 rounded-lg">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                  <p className="text-gray-600 text-sm">Track your milestones and badges</p>
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Sparkles className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Keep up the great work!</h3>
                <p className="text-gray-600">You're on track to reach your affiliate goals. Share your link and start earning more commissions today!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;