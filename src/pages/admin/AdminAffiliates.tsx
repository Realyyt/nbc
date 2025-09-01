import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign,
  Eye,
  Mail,
  Phone,
  Globe,
  TrendingUp,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { affiliateService } from '../../services/affiliateService';
import { AffiliateApplication, Affiliate } from '../../types';

const AdminAffiliates: React.FC = () => {
  console.log('AdminAffiliates component rendered');
  
  const [applications, setApplications] = useState<AffiliateApplication[]>([]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'applications' | 'affiliates'>('applications');
  const [selectedApplication, setSelectedApplication] = useState<AffiliateApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{email: string, password: string} | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      console.log('Loading admin data...');
      console.log('Admin token:', localStorage.getItem('adminToken'));
      
      const [applicationsData, affiliatesData] = await Promise.all([
        affiliateService.getAllApplications(),
        affiliateService.getAllAffiliates()
      ]);
      
      console.log('Applications data:', applicationsData);
      console.log('Affiliates data:', affiliatesData);
      
      // Transform backend snake_case fields to frontend camelCase
      const transformedApplications = applicationsData.applications.map(app => ({
        ...app,
        fullName: app.full_name,
        audienceSize: app.audience_size,
        audienceDescription: app.audience_description,
        socialMediaHandles: app.social_media_handles ? JSON.parse(app.social_media_handles) : {},
        createdAt: app.created_at,
        updatedAt: app.updated_at,
        reviewedBy: app.reviewed_by,
        reviewedAt: app.reviewed_at,
        rejectionReason: app.rejection_reason
      }));
      
      const transformedAffiliates = affiliatesData.affiliates.map(aff => ({
        ...aff,
        affiliateCode: aff.affiliate_code,
        commissionRate: aff.commission_rate,
        totalEarnings: aff.total_earnings,
        totalReferrals: aff.total_referrals,
        activeReferrals: aff.active_referrals,
        joinedAt: aff.joined_at,
        lastActivityAt: aff.last_activity_at,
        paymentInfo: aff.payment_info
      }));
      
      setApplications(transformedApplications);
      setAffiliates(transformedAffiliates);
    } catch (err) {
      console.error('Load error:', err);
      setError(`Failed to load affiliate data: ${err.message || err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveApplication = async (applicationId: string) => {
    try {
      const result = await affiliateService.reviewApplication(applicationId, 'approved');
      
      // Get the application details to show credentials
      const application = applications.find(app => app.id === applicationId);
      if (application && result.credentials) {
        setGeneratedCredentials({
          email: application.email,
          password: result.credentials.password
        });
        setShowCredentialsModal(true);
      }
      
      await loadData(); // Reload data
    } catch (err) {
      setError('Failed to approve application');
      console.error('Approval error:', err);
    }
  };

  const handleRejectApplication = async (applicationId: string) => {
    if (!rejectionReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }

    try {
      await affiliateService.reviewApplication(applicationId, 'rejected', rejectionReason);
      setShowRejectionModal(false);
      setRejectionReason('');
      setSelectedApplication(null);
      await loadData(); // Reload data
    } catch (err) {
      setError('Failed to reject application');
      console.error('Rejection error:', err);
    }
  };

  const openRejectionModal = (application: AffiliateApplication) => {
    setSelectedApplication(application);
    setShowRejectionModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAffiliateStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-4" />
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
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="text-primary font-bold text-xl">
                NBTA Admin
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Affiliate Management</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, Admin
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  localStorage.removeItem('adminUser');
                  window.location.href = '/admin/login';
                }}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <Users className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved Affiliates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {affiliates.filter(aff => aff.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Affiliates</p>
                <p className="text-2xl font-bold text-gray-900">{affiliates.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Applications ({applications.length})
              </button>
              <button
                onClick={() => setActiveTab('affiliates')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'affiliates'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Active Affiliates ({affiliates.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-600">
                <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-4">
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No applications found</p>
                  </div>
                ) : (
                  applications.map((application) => (
                    <div key={application.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.fullName}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <Mail size={14} className="mr-1" />
                              {application.email}
                            </span>
                            <span className="flex items-center">
                              <Phone size={14} className="mr-1" />
                              {application.phone}
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Audience Size</p>
                          <p className="text-sm text-gray-600">{application.audienceSize.toLocaleString()} followers</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Website</p>
                          <p className="text-sm text-gray-600">
                            {application.website ? (
                              <a href={application.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                {application.website}
                              </a>
                            ) : (
                              'Not provided'
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700">Audience Description</p>
                        <p className="text-sm text-gray-600">{application.audienceDescription}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700">Motivation</p>
                        <p className="text-sm text-gray-600">{application.motivation}</p>
                      </div>

                      {application.socialMediaHandles && Object.keys(application.socialMediaHandles).length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Social Media Handles</p>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(application.socialMediaHandles).map(([platform, handle]) => (
                              <span key={platform} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                {platform}: {handle}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {application.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleApproveApplication(application.id)}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            <CheckCircle size={16} className="mr-2" />
                            Approve
                          </button>
                          <button
                            onClick={() => openRejectionModal(application)}
                            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            <XCircle size={16} className="mr-2" />
                            Reject
                          </button>
                        </div>
                      )}

                      {application.status === 'rejected' && application.rejectionReason && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                          <p className="text-sm text-red-700">{application.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'affiliates' && (
              <div className="space-y-4">
                {affiliates.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No affiliates found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Affiliate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Code
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Commission Rate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Earnings
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Referrals
                          </th>
                                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                             Bank Details
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                             Status
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                             Joined
                           </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {affiliates.map((affiliate) => (
                          <tr key={affiliate.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {affiliate.userId}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 font-mono">
                                {affiliate.affiliateCode}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {affiliate.commissionRate}%
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-green-600">
                                ₦{affiliate.totalEarnings.toLocaleString()}
                              </div>
                            </td>
                                                         <td className="px-6 py-4 whitespace-nowrap">
                               <div className="text-sm text-gray-900">
                                 {affiliate.totalReferrals}
                               </div>
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap">
                               <div className="text-sm text-gray-900">
                                 {affiliate.paymentInfo?.bankName ? (
                                   <div>
                                     <div className="font-medium">{affiliate.paymentInfo.bankName}</div>
                                     <div className="text-xs text-gray-500">****{affiliate.paymentInfo.accountNumber.slice(-4)}</div>
                                   </div>
                                 ) : (
                                   <span className="text-red-500 text-xs">Not provided</span>
                                 )}
                               </div>
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap">
                               <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAffiliateStatusColor(affiliate.status)}`}>
                                 {affiliate.status}
                               </span>
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                               {new Date(affiliate.joinedAt).toLocaleDateString()}
                             </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Reject Application
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Please provide a reason for rejecting {selectedApplication.fullName}'s application:
              </p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                rows={4}
                placeholder="Enter rejection reason..."
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => {
                    setShowRejectionModal(false);
                    setRejectionReason('');
                    setSelectedApplication(null);
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRejectApplication(selectedApplication.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reject Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credentials Modal */}
      {showCredentialsModal && generatedCredentials && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Application Approved!
                </h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Affiliate account created successfully. Here are the login credentials:
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={generatedCredentials.email}
                      readOnly
                      className="flex-1 p-2 bg-white border border-gray-300 rounded text-sm font-mono"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedCredentials.email)}
                      className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                      title="Copy email"
                    >
                      📋
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={generatedCredentials.password}
                      readOnly
                      className="flex-1 p-2 bg-white border border-gray-300 rounded text-sm font-mono"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedCredentials.password)}
                      className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                      title="Copy password"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                <p className="text-xs text-blue-800">
                  <strong>Important:</strong> Share these credentials securely with the affiliate. 
                  They can use them to log in at: <strong>/affiliate/login</strong>
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowCredentialsModal(false);
                    setGeneratedCredentials(null);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Close
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
