import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  User, 
  Mail, 
  Phone, 
  Users, 
  Calendar,
  Shield,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { affiliateService } from '../../services/affiliateService';
import { AffiliateApplication, Affiliate } from '../../types';

const AdminAffiliates: React.FC = () => {
  const [applications, setApplications] = useState<AffiliateApplication[]>([]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'applications' | 'affiliates'>('applications');
  const [credentialsModal, setCredentialsModal] = useState<{
    isOpen: boolean;
    email: string;
    password: string;
    affiliateCode: string;
  }>({
    isOpen: false,
    email: '',
    password: '',
    affiliateCode: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [applicationsData, affiliatesData] = await Promise.all([
        affiliateService.getAllApplications(),
        affiliateService.getAllAffiliates()
      ]);

      // Transform backend snake_case to frontend camelCase
      const transformedApplications = applicationsData.map((app: any) => ({
        id: app.id,
        fullName: app.full_name,
        email: app.email,
        phone: app.phone,
        socialMediaHandles: app.social_media_handles ? JSON.parse(app.social_media_handles) : {},
        audienceSize: app.audience_size,
        audienceDescription: app.audience_description,
        motivation: app.motivation,
        status: app.status,
        createdAt: app.created_at,
        updatedAt: app.updated_at,
        reviewedBy: app.reviewed_by,
        reviewedAt: app.reviewed_at,
        rejectionReason: app.rejection_reason
      }));

      const transformedAffiliates = affiliatesData.map((aff: any) => ({
        id: aff.id,
        userId: aff.user_id || aff.id,
        applicationId: aff.application_id || aff.id,
        fullName: aff.full_name,
        email: aff.email,
        phone: aff.phone,
        socialMediaHandles: aff.social_media_handles ? JSON.parse(aff.social_media_handles) : {},
        audienceSize: aff.audience_size,
        audienceDescription: aff.audience_description,
        motivation: aff.motivation,
        affiliateCode: aff.affiliate_code,
        commissionRate: aff.commission_rate,
        totalEarnings: aff.total_earnings,
        totalReferrals: aff.total_referrals,
        activeReferrals: aff.total_referrals,
        status: aff.status,
        joinedAt: aff.created_at,
        lastActivityAt: aff.updated_at,
        paymentInfo: {
          bankName: '',
          accountNumber: '',
          accountName: ''
        }
      }));

      setApplications(transformedApplications);
      setAffiliates(transformedAffiliates);
    } catch (err: any) {
      setError(`Failed to load affiliate data: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewApplication = async (applicationId: string, status: 'approved' | 'rejected', rejectionReason?: string) => {
    try {
      const result = await affiliateService.reviewApplication(applicationId, status, rejectionReason);
      
      if (status === 'approved' && result.credentials) {
        setCredentialsModal({
          isOpen: true,
          email: result.credentials.email,
          password: result.credentials.password,
          affiliateCode: result.affiliateCode || ''
        });
      }
      
      await loadData(); // Reload data
    } catch (err: any) {
      setError(`Failed to review application: ${err.message || err}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading affiliate data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, Admin</h1>
              <p className="text-gray-600">Manage affiliate applications and approved affiliates</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab('applications')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Applications ({applications.length})
            </button>
            <button
              onClick={() => setSelectedTab('affiliates')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'affiliates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approved Affiliates ({affiliates.length})
            </button>
          </nav>
        </div>

        {/* Applications Tab */}
        {selectedTab === 'applications' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Affiliate Applications</h2>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
                <p className="mt-1 text-sm text-gray-500">No affiliate applications have been submitted yet.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {applications.map((application) => (
                  <div key={application.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{application.fullName}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            application.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4" />
                            {application.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4" />
                            {application.phone || 'Not provided'}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            {application.audienceSize ? `${application.audienceSize.toLocaleString()} followers` : 'Not specified'}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            {new Date(application.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Audience Description</h4>
                            <p className="text-sm text-gray-600">{application.audienceDescription}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Motivation</h4>
                            <p className="text-sm text-gray-600">{application.motivation}</p>
                          </div>
                        </div>
                      </div>

                      {application.status === 'pending' && (
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleReviewApplication(application.id, 'approved')}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Please provide a reason for rejection:');
                              if (reason) {
                                handleReviewApplication(application.id, 'rejected', reason);
                              }
                            }}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Affiliates Tab */}
        {selectedTab === 'affiliates' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Approved Affiliates</h2>
            {affiliates.length === 0 ? (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No approved affiliates</h3>
                <p className="mt-1 text-sm text-gray-500">No affiliate applications have been approved yet.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {affiliates.map((affiliate) => (
                  <div key={affiliate.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{affiliate.fullName}</h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4" />
                            {affiliate.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4" />
                            {affiliate.phone || 'Not provided'}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            {affiliate.audienceSize ? `${affiliate.audienceSize.toLocaleString()} followers` : 'Not specified'}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            {new Date(affiliate.joinedAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-sm font-medium text-blue-900">Affiliate Code</div>
                            <div className="text-lg font-mono text-blue-700">{affiliate.affiliateCode}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-sm font-medium text-green-900">Commission Rate</div>
                            <div className="text-lg font-semibold text-green-700">{(affiliate.commissionRate * 100).toFixed(1)}%</div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <div className="text-sm font-medium text-purple-900">Total Referrals</div>
                            <div className="text-lg font-semibold text-purple-700">{affiliate.totalReferrals}</div>
                          </div>
                        </div>

                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-yellow-900 mb-2">Payment Information</div>
                          <div className="text-sm text-yellow-800">
                            {affiliate.paymentInfo.bankName ? (
                              <>
                                <div>Bank: {affiliate.paymentInfo.bankName}</div>
                                <div>Account: {affiliate.paymentInfo.accountNumber}</div>
                                <div>Name: {affiliate.paymentInfo.accountName}</div>
                              </>
                            ) : (
                              'No payment information provided'
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Credentials Modal */}
      {credentialsModal.isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Affiliate Approved!</h3>
              <div className="mt-4 text-left">
                <p className="text-sm text-gray-600 mb-4">
                  The affiliate has been approved. Here are their login credentials:
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 p-2 bg-gray-50 border rounded text-sm font-mono">{credentialsModal.email}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1 p-2 bg-gray-50 border rounded text-sm font-mono">{credentialsModal.password}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Affiliate Code</label>
                    <div className="mt-1 p-2 bg-gray-50 border rounded text-sm font-mono">{credentialsModal.affiliateCode}</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Please share these credentials with the affiliate. They should change their password after first login.
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => setCredentialsModal({ ...credentialsModal, isOpen: false })}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAffiliates;
