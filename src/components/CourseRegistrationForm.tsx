import React, { useState } from 'react';
import { Program } from '../lib/supabase';
import { paystackService } from '../services/paystackService';

interface CourseRegistrationFormProps {
  course: Program;
  onClose: () => void;
  onSubmit: (formData: RegistrationFormData) => void;
  isSubmitting?: boolean;
}

export interface RegistrationFormData {
  // Section 1: Personal Information
  fullName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  nationality: string;
  stateOfOrigin: string;
  currentAddress: string;
  phoneNumber: string;
  emailAddress: string;

  // Section 2: Educational Background
  educationLevel: string;
  lastInstitution: string;
  yearCompleted: string;

  // Section 3: Technical Access
  hasDeviceAccess: boolean;
  hasInternetAccess: boolean;

  // Section 4: Motivation and Commitment
  motivation: string;

  // Section 5: Consent and Declaration
  consent: boolean;
  signature: string;
  signatureDate: string;
}

const CourseRegistrationForm: React.FC<CourseRegistrationFormProps> = ({ 
  course, 
  onClose, 
  onSubmit,
  isSubmitting = false 
}) => {
  const [formData, setFormData] = useState<any>({
    fullName: '',
    gender: 'male',
    dateOfBirth: '',
    nationality: '',
    phoneNumber: '',
    emailAddress: '',
    currentAddress: '',
  });
  const [step, setStep] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before proceeding
    if (!formData.emailAddress || !formData.emailAddress.includes('@')) {
      alert('Please enter a valid email address before proceeding with payment.');
      return;
    }
    
    try {
      setPaymentStatus('processing');
      
      // Initialize payment
      await paystackService.initializePayment({
        email: formData.emailAddress,
        amount: course.price,
        reference: paystackService.generateReference(),
        onSuccess: (reference) => {
          setPaymentStatus('success');
          // Submit form data after successful payment
          onSubmit(formData);
        },
        onCancel: () => {
          setPaymentStatus('failed');
        }
      });
    } catch (error) {
      console.error('Payment initialization failed:', error);
      setPaymentStatus('failed');
      alert('Payment initialization failed. Please check your email address and try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleRadioChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Define steps for each mode
  let steps: { title: string; content: JSX.Element }[] = [];

  if (course.mode === 'online') {
    steps = [
      {
        title: 'Personal Information',
        content: (
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <div className="flex gap-4">
                {['male','female','other'].map(g => (
                  <label key={g} className="inline-flex items-center">
                    <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={() => handleRadioChange('gender', g)} className="form-radio" />
                    <span className="ml-2 capitalize">{g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input type="date" id="dateOfBirth" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
              <input type="text" id="nationality" name="nationality" required value={formData.nationality} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="stateOfOrigin" className="block text-sm font-medium text-gray-700 mb-1">State of Origin *</label>
              <input type="text" id="stateOfOrigin" name="stateOfOrigin" required value={formData.stateOfOrigin || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="currentAddress" className="block text-sm font-medium text-gray-700 mb-1">Current Residential Address *</label>
              <textarea id="currentAddress" name="currentAddress" required value={formData.currentAddress} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input type="email" id="emailAddress" name="emailAddress" required value={formData.emailAddress} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        ),
      },
      {
        title: 'Educational Background',
        content: (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Highest Level of Education Completed *</label>
              <div className="flex flex-wrap gap-4">
                {['Primary','Secondary','OND','HND','BSc/BA','Other'].map(level => (
                  <label key={level} className="inline-flex items-center">
                    <input type="radio" name="educationLevel" value={level} checked={formData.educationLevel === level} onChange={() => handleRadioChange('educationLevel', level)} className="form-radio" />
                    <span className="ml-2">{level}</span>
                  </label>
                ))}
                {formData.educationLevel === 'Other' && (
                  <input type="text" name="educationLevelOther" placeholder="Other: specify" value={formData.educationLevelOther || ''} onChange={handleChange} className="ml-2 px-2 py-1 border rounded" />
                )}
              </div>
            </div>
            <div>
              <label htmlFor="lastInstitution" className="block text-sm font-medium text-gray-700 mb-1">Name of Last Institution Attended *</label>
              <input type="text" id="lastInstitution" name="lastInstitution" required value={formData.lastInstitution || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="yearCompleted" className="block text-sm font-medium text-gray-700 mb-1">Year Completed *</label>
              <input type="text" id="yearCompleted" name="yearCompleted" required value={formData.yearCompleted || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        ),
      },
      {
        title: 'Technical Access',
        content: (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Do you have access to a smartphone, tablet, or computer? *</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="hasDeviceAccess" checked={formData.hasDeviceAccess === true} onChange={() => handleRadioChange('hasDeviceAccess', true)} className="form-radio" />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="hasDeviceAccess" checked={formData.hasDeviceAccess === false} onChange={() => handleRadioChange('hasDeviceAccess', false)} className="form-radio" />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Do you have a stable internet connection? *</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="hasInternetAccess" checked={formData.hasInternetAccess === true} onChange={() => handleRadioChange('hasInternetAccess', true)} className="form-radio" />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="hasInternetAccess" checked={formData.hasInternetAccess === false} onChange={() => handleRadioChange('hasInternetAccess', false)} className="form-radio" />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'Motivation and Commitment',
        content: (
          <div>
            <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">Why do you want to join the NBTA program? *</label>
            <textarea id="motivation" name="motivation" required value={formData.motivation || ''} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
        ),
      },
      {
        title: 'Consent and Declaration',
        content: (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">By submitting this form, I affirm that the information provided is true and complete to the best of my knowledge. I agree to comply with NBTA's academic guidelines, code of conduct, and digital learning policies.</p>
            </div>
            <div>
              <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-1">Signature *</label>
              <input type="text" id="signature" name="signature" required value={formData.signature || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="signatureDate" className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input type="date" id="signatureDate" name="signatureDate" required value={formData.signatureDate || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        ),
      },
    ];
  } else if (course.mode === 'physical') {
    steps = [
      {
        title: 'SECTION A: PERSONAL DETAILS',
        content: (
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" id="fullName" name="fullName" required value={formData.fullName || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input type="date" id="dateOfBirth" name="dateOfBirth" required value={formData.dateOfBirth || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <div className="flex gap-4">
                {['male','female','other'].map(g => (
                  <label key={g} className="inline-flex items-center">
                    <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={() => handleRadioChange('gender', g)} className="form-radio" />
                    <span className="ml-2 capitalize">{g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
              <input type="text" id="nationality" name="nationality" required value={formData.nationality || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" required value={formData.phoneNumber || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input type="email" id="emailAddress" name="emailAddress" required value={formData.emailAddress || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="currentAddress" className="block text-sm font-medium text-gray-700 mb-1">Residential Address *</label>
              <textarea id="currentAddress" name="currentAddress" required value={formData.currentAddress || ''} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        ),
      },
      {
        title: 'SECTION B: EDUCATION & QUALIFICATIONS',
        content: (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Highest Educational Qualification *</label>
              <div className="flex flex-wrap gap-4">
                {['Primary','Secondary','Tertiary','Technical/Vocational','Other'].map(level => (
                  <label key={level} className="inline-flex items-center">
                    <input type="radio" name="educationLevel" value={level} checked={formData.educationLevel === level} onChange={() => handleRadioChange('educationLevel', level)} className="form-radio" />
                    <span className="ml-2">{level}</span>
                  </label>
                ))}
                {formData.educationLevel === 'Other' && (
                  <input type="text" name="educationLevelOther" placeholder="Other: specify" value={formData.educationLevelOther || ''} onChange={handleChange} className="ml-2 px-2 py-1 border rounded" />
                )}
              </div>
            </div>
            <div>
              <label htmlFor="lastInstitution" className="block text-sm font-medium text-gray-700 mb-1">Name of Institution(s) *</label>
              <input type="text" id="lastInstitution" name="lastInstitution" required value={formData.lastInstitution || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="yearCompleted" className="block text-sm font-medium text-gray-700 mb-1">Year Completed *</label>
              <input type="text" id="yearCompleted" name="yearCompleted" required value={formData.yearCompleted || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        ),
      },
      {
        title: 'SECTION C: PROGRAM DETAILS',
        content: (
          <div className="space-y-4">
            <div>
              <label htmlFor="courseOfInterest" className="block text-sm font-medium text-gray-700 mb-1">Course of Interest *</label>
              <input type="text" id="courseOfInterest" name="courseOfInterest" required value={formData.courseOfInterest || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="preferredLocation" className="block text-sm font-medium text-gray-700 mb-1">Preferred Location for Physical Training *</label>
              <input type="text" id="preferredLocation" name="preferredLocation" required value={formData.preferredLocation || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability for On-the-Job Training *</label>
              <div className="flex flex-wrap gap-4">
                {['Weekdays','Weekends','Full-Time'].map(option => (
                  <label key={option} className="inline-flex items-center">
                    <input type="checkbox" name="availability" value={option} checked={formData.availability?.includes(option)} onChange={() => {
                      setFormData((prev: any) => {
                        const arr = prev.availability || [];
                        return arr.includes(option)
                          ? { ...prev, availability: arr.filter((a: string) => a !== option) }
                          : { ...prev, availability: [...arr, option] };
                      });
                    }} className="form-checkbox" />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Do you have any prior experience in this field? *</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="hasExperience" checked={formData.hasExperience === true} onChange={() => handleRadioChange('hasExperience', true)} className="form-radio" />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="hasExperience" checked={formData.hasExperience === false} onChange={() => handleRadioChange('hasExperience', false)} className="form-radio" />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {formData.hasExperience && (
                <textarea name="experienceDetails" placeholder="If yes, briefly explain" value={formData.experienceDetails || ''} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2" />
              )}
            </div>
          </div>
        ),
      },
      {
        title: 'SECTION D: EMPLOYMENT INFORMATION (If Applicable)',
        content: (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Are you currently employed or attached to a company? *</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="isEmployed" checked={formData.isEmployed === true} onChange={() => handleRadioChange('isEmployed', true)} className="form-radio" />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="isEmployed" checked={formData.isEmployed === false} onChange={() => handleRadioChange('isEmployed', false)} className="form-radio" />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            {formData.isEmployed && (
              <>
                <div>
                  <label htmlFor="employerName" className="block text-sm font-medium text-gray-700 mb-1">Name of Employer</label>
                  <input type="text" id="employerName" name="employerName" value={formData.employerName || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Job Title/Role</label>
                  <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="employmentDuration" className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input type="text" id="employmentDuration" name="employmentDuration" value={formData.employmentDuration || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </>
            )}
          </div>
        ),
      },
      {
        title: 'SECTION E: EMERGENCY CONTACT',
        content: (
          <div className="space-y-4">
            <div>
              <label htmlFor="emergencyName" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" id="emergencyName" name="emergencyName" required value={formData.emergencyName || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="emergencyRelationship" className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
              <input type="text" id="emergencyRelationship" name="emergencyRelationship" required value={formData.emergencyRelationship || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input type="tel" id="emergencyPhone" name="emergencyPhone" required value={formData.emergencyPhone || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="emergencyAddress" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <input type="text" id="emergencyAddress" name="emergencyAddress" required value={formData.emergencyAddress || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        ),
      },
      {
        title: 'SECTION F: DECLARATION',
        content: (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">I certify that the information provided is accurate to the best of my knowledge. I understand that misrepresentation may lead to disqualification or dismissal from the program. I agree to abide by the rules and guidelines of the NetZero Business and Technical Academy throughout my training.</p>
            </div>
            <div>
              <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-1">Signature of Applicant *</label>
              <input type="text" id="signature" name="signature" required value={formData.signature || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="signatureDate" className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input type="date" id="signatureDate" name="signatureDate" required value={formData.signatureDate || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        ),
      },
    ];
  } else if (course.mode === 'hybrid') {
    steps = [
      {
        title: 'Hybrid Program Registration',
        content: (
          <div className="text-center text-gray-600 py-8">
            <p>Hybrid program registration steps coming soon.</p>
          </div>
        ),
      },
    ];
  } else {
    steps = [
      {
        title: 'Unknown Program Type',
        content: (
          <div className="text-center text-red-600 py-8">
            <p>Unknown program type. Please contact support.</p>
          </div>
        ),
      },
    ];
  }

  const isLastStep = step === steps.length - 1;
  const isFirstStep = step === 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Enrolment Form: {course.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting || paymentStatus === 'processing'}
            >
              ✕
            </button>
          </div>
          <form onSubmit={isLastStep ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }} className="space-y-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                {steps.map((s, idx) => (
                  <div key={s.title} className={`h-2 w-8 rounded-full ${idx === step ? 'bg-primary' : 'bg-gray-200'}`}></div>
                ))}
              </div>
              <h3 className="text-lg font-semibold">{steps[step].title}</h3>
            </div>
            {steps[step].content}
            <div className="flex justify-between gap-4 mt-8">
              <button
                type="button"
                onClick={isFirstStep ? onClose : () => setStep(step - 1)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                disabled={isSubmitting || paymentStatus === 'processing'}
              >
                {isFirstStep ? 'Cancel' : 'Back'}
              </button>
              <button
                type={isLastStep ? 'submit' : 'button'}
                disabled={isSubmitting || paymentStatus === 'processing'}
                className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={!isLastStep ? () => setStep(step + 1) : undefined}
              >
                {isLastStep ? (
                  paymentStatus === 'processing' ? 'Processing Payment...' :
                  paymentStatus === 'success' ? 'Payment Successful!' :
                  paymentStatus === 'failed' ? 'Payment Failed - Try Again' :
                  isSubmitting ? 'Submitting...' : 'Pay & Submit Registration'
                ) : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistrationForm; 