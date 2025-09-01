import React, { useState } from 'react';
import { 
  Banknote, 
  Save, 
  AlertCircle, 
  CheckCircle,
  Loader2
} from 'lucide-react';
import { affiliateService } from '../services/affiliateService';
import { Affiliate } from '../types';

interface AffiliatePaymentSettingsProps {
  affiliate: Affiliate;
  onUpdate: (updatedAffiliate: Affiliate) => void;
}

const AffiliatePaymentSettings: React.FC<AffiliatePaymentSettingsProps> = ({ 
  affiliate, 
  onUpdate 
}) => {
  const [bankDetails, setBankDetails] = useState({
    bankName: affiliate.paymentInfo?.bankName || '',
    accountNumber: affiliate.paymentInfo?.accountNumber || '',
    accountName: affiliate.paymentInfo?.accountName || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      // Validate required fields
      if (!bankDetails.bankName || !bankDetails.accountNumber || !bankDetails.accountName) {
        throw new Error('Please fill in all bank details');
      }

      // Validate account number (should be numeric and reasonable length)
      if (!/^\d{10,11}$/.test(bankDetails.accountNumber)) {
        throw new Error('Please enter a valid 10-11 digit account number');
      }

      const updatedAffiliate = await affiliateService.updatePaymentInfo(bankDetails);
      onUpdate(updatedAffiliate);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update payment information');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Banknote className="h-6 w-6 text-primary mr-3" />
        <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Provide your bank account details to receive commission payments. The admin will process payments manually based on your earnings.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-600">
          <AlertCircle size={18} className="mr-2 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-600">
          <CheckCircle size={18} className="mr-2 flex-shrink-0" />
          <span className="text-sm">Payment information updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
            Bank Name *
          </label>
          <input
            id="bankName"
            name="bankName"
            type="text"
            required
            value={bankDetails.bankName}
            onChange={handleInputChange}
            className="input w-full"
            placeholder="e.g., First Bank, GT Bank, Access Bank"
          />
        </div>

        <div>
          <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Account Number *
          </label>
          <input
            id="accountNumber"
            name="accountNumber"
            type="text"
            required
            maxLength={11}
            value={bankDetails.accountNumber}
            onChange={handleInputChange}
            className="input w-full"
            placeholder="10-11 digit account number"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter your 10-11 digit bank account number
          </p>
        </div>

        <div>
          <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">
            Account Name *
          </label>
          <input
            id="accountName"
            name="accountName"
            type="text"
            required
            value={bankDetails.accountName}
            onChange={handleInputChange}
            className="input w-full"
            placeholder="Name as it appears on your bank account"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the exact name as it appears on your bank account
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Payment Information</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Commission rate: 10% of course enrollments</li>
            <li>• Payments are processed manually by admin</li>
            <li>• All payments are made via bank transfer</li>
            <li>• Ensure your account details are correct</li>
            <li>• You'll be notified when payments are processed</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Updating...
            </>
          ) : (
            <>
              <Save className="-ml-1 mr-3 h-5 w-5" />
              Save Payment Information
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AffiliatePaymentSettings;
