import React, { useState } from 'react';

interface JobApplicationFormData {
  // Personal Information
  fullName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  phoneNumber: string;
  emailAddress: string;
  residentialAddress: string;
  stateOfResidence: string;
  lga: string;
  nationality: string;

  // Position Information
  positionApplied: string;
  preferredWorkLocation: string;
  tradeSpecification?: string;

  // Professional Information
  currentOccupation: string;
  yearsOfExperience: string;
  highestQualification: string;
  relevantCertifications: string;
  tradeSkillArea: string;
  affiliatedWithInstitution: boolean;
  institutionDetails?: string;

  // Supporting Documents
  cvResume: File | null;
  coverLetter: File | null;
  academicCertificates: File | null;
  professionalCertifications: File | null;
  nationalId: File | null;

  // Short Answer Questions
  motivation: string;
  teachingExperience: string;

  // Declaration
  signature: string;
  signatureDate: string;
}

interface JobApplicationFormProps {
  onClose: () => void;
  onSubmit: (data: JobApplicationFormData) => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<JobApplicationFormData>({
    fullName: '',
    gender: 'male',
    dateOfBirth: '',
    phoneNumber: '',
    emailAddress: '',
    residentialAddress: '',
    stateOfResidence: '',
    lga: '',
    nationality: '',
    positionApplied: '',
    preferredWorkLocation: '',
    tradeSpecification: '',
    currentOccupation: '',
    yearsOfExperience: '',
    highestQualification: '',
    relevantCertifications: '',
    tradeSkillArea: '',
    affiliatedWithInstitution: false,
    institutionDetails: '',
    cvResume: null,
    coverLetter: null,
    academicCertificates: null,
    professionalCertifications: null,
    nationalId: null,
    motivation: '',
    teachingExperience: '',
    signature: '',
    signatureDate: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof JobApplicationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name as keyof JobApplicationFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      if (errors[name as keyof JobApplicationFormData]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof JobApplicationFormData, string>> = {};

    // Personal Information validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.emailAddress.trim()) newErrors.emailAddress = 'Email address is required';
    if (!formData.residentialAddress.trim()) newErrors.residentialAddress = 'Residential address is required';
    if (!formData.stateOfResidence.trim()) newErrors.stateOfResidence = 'State of residence is required';
    if (!formData.lga.trim()) newErrors.lga = 'LGA is required';
    if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';

    // Position Information validation
    if (!formData.positionApplied) newErrors.positionApplied = 'Position applied for is required';
    if (!formData.preferredWorkLocation.trim()) newErrors.preferredWorkLocation = 'Preferred work location is required';
    if ((formData.positionApplied === 'Training Instructor' || formData.positionApplied === 'Master Craftsman/Craftswoman') && !formData.tradeSpecification) {
      newErrors.tradeSpecification = 'Please specify your trade';
    }

    // Professional Information validation
    if (!formData.currentOccupation.trim()) newErrors.currentOccupation = 'Current occupation is required';
    if (!formData.yearsOfExperience.trim()) newErrors.yearsOfExperience = 'Years of experience is required';
    if (!formData.highestQualification) newErrors.highestQualification = 'Highest qualification is required';
    if (!formData.tradeSkillArea.trim()) newErrors.tradeSkillArea = 'Trade/skill area is required';
    if (formData.affiliatedWithInstitution && !formData.institutionDetails?.trim()) {
      newErrors.institutionDetails = 'Please provide institution details';
    }

    // Supporting Documents validation
    if (!formData.cvResume) newErrors.cvResume = 'CV/Resume is required';
    if (!formData.coverLetter) newErrors.coverLetter = 'Cover letter is required';
    if (!formData.academicCertificates) newErrors.academicCertificates = 'Academic certificates are required';
    if (!formData.nationalId) newErrors.nationalId = 'National ID is required';

    // Short Answer Questions validation
    if (!formData.motivation.trim()) newErrors.motivation = 'Please explain your motivation';
    if (!formData.teachingExperience.trim()) newErrors.teachingExperience = 'Please describe your teaching experience';

    // Declaration validation
    if (!formData.signature.trim()) newErrors.signature = 'Signature is required';
    if (!formData.signatureDate) newErrors.signatureDate = 'Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">NBTA Job Application Form</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <div className="flex gap-4">
                  {['male', 'female', 'other'].map(g => (
                    <label key={g} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleChange}
                        className="form-radio"
                      />
                      <span className="ml-2 capitalize">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.emailAddress ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.emailAddress && <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>}
              </div>

              <div>
                <label htmlFor="residentialAddress" className="block text-sm font-medium text-gray-700 mb-1">Residential Address *</label>
                <input
                  type="text"
                  id="residentialAddress"
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.residentialAddress ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.residentialAddress && <p className="text-red-500 text-sm mt-1">{errors.residentialAddress}</p>}
              </div>

              <div>
                <label htmlFor="stateOfResidence" className="block text-sm font-medium text-gray-700 mb-1">State of Residence *</label>
                <input
                  type="text"
                  id="stateOfResidence"
                  name="stateOfResidence"
                  value={formData.stateOfResidence}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.stateOfResidence ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.stateOfResidence && <p className="text-red-500 text-sm mt-1">{errors.stateOfResidence}</p>}
              </div>

              <div>
                <label htmlFor="lga" className="block text-sm font-medium text-gray-700 mb-1">LGA *</label>
                <input
                  type="text"
                  id="lga"
                  name="lga"
                  value={formData.lga}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.lga ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.lga && <p className="text-red-500 text-sm mt-1">{errors.lga}</p>}
              </div>

              <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.nationality ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
              </div>
            </div>

            {/* Position Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Position Applied For</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Zonal Program Manager',
                    'State Program Manager',
                    'Quality Assurance Manager',
                    'Quality Assurance Assessor',
                    'Internal Quality Assurance Manager',
                    'Training Instructor',
                    'Master Craftsman/Craftswoman',
                    'Mentor/Career Coach'
                  ].map(position => (
                    <label key={position} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="positionApplied"
                        value={position}
                        checked={formData.positionApplied === position}
                        onChange={handleChange}
                        className="form-radio"
                      />
                      <span className="ml-2">{position}</span>
                    </label>
                  ))}
                </div>
                {errors.positionApplied && <p className="text-red-500 text-sm mt-1">{errors.positionApplied}</p>}
              </div>

              {(formData.positionApplied === 'Training Instructor' || formData.positionApplied === 'Master Craftsman/Craftswoman') && (
                <div>
                  <label htmlFor="tradeSpecification" className="block text-sm font-medium text-gray-700 mb-1">Specify Trade *</label>
                  <input
                    type="text"
                    id="tradeSpecification"
                    name="tradeSpecification"
                    value={formData.tradeSpecification}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.tradeSpecification ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.tradeSpecification && <p className="text-red-500 text-sm mt-1">{errors.tradeSpecification}</p>}
                </div>
              )}

              <div>
                <label htmlFor="preferredWorkLocation" className="block text-sm font-medium text-gray-700 mb-1">Preferred Work Location (State/LGA) *</label>
                <input
                  type="text"
                  id="preferredWorkLocation"
                  name="preferredWorkLocation"
                  value={formData.preferredWorkLocation}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.preferredWorkLocation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.preferredWorkLocation && <p className="text-red-500 text-sm mt-1">{errors.preferredWorkLocation}</p>}
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Professional Information</h3>
              <div>
                <label htmlFor="currentOccupation" className="block text-sm font-medium text-gray-700 mb-1">Current Occupation/Role *</label>
                <input
                  type="text"
                  id="currentOccupation"
                  name="currentOccupation"
                  value={formData.currentOccupation}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.currentOccupation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.currentOccupation && <p className="text-red-500 text-sm mt-1">{errors.currentOccupation}</p>}
              </div>

              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">Years of Relevant Experience *</label>
                <input
                  type="text"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Highest Academic Qualification *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Secondary', 'OND/NCE', 'HND/Bachelor\'s', 'Master\'s', 'PhD'].map(qualification => (
                    <label key={qualification} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="highestQualification"
                        value={qualification}
                        checked={formData.highestQualification === qualification}
                        onChange={handleChange}
                        className="form-radio"
                      />
                      <span className="ml-2">{qualification}</span>
                    </label>
                  ))}
                </div>
                {errors.highestQualification && <p className="text-red-500 text-sm mt-1">{errors.highestQualification}</p>}
              </div>

              <div>
                <label htmlFor="relevantCertifications" className="block text-sm font-medium text-gray-700 mb-1">Relevant Certifications</label>
                <textarea
                  id="relevantCertifications"
                  name="relevantCertifications"
                  value={formData.relevantCertifications}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="tradeSkillArea" className="block text-sm font-medium text-gray-700 mb-1">Trade/Skill Area of Expertise *</label>
                <input
                  type="text"
                  id="tradeSkillArea"
                  name="tradeSkillArea"
                  value={formData.tradeSkillArea}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.tradeSkillArea ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.tradeSkillArea && <p className="text-red-500 text-sm mt-1">{errors.tradeSkillArea}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Are you currently affiliated with any training institution or program? *</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="affiliatedWithInstitution"
                      checked={formData.affiliatedWithInstitution === true}
                      onChange={() => setFormData(prev => ({ ...prev, affiliatedWithInstitution: true }))}
                      className="form-radio"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="affiliatedWithInstitution"
                      checked={formData.affiliatedWithInstitution === false}
                      onChange={() => setFormData(prev => ({ ...prev, affiliatedWithInstitution: false }))}
                      className="form-radio"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
                {formData.affiliatedWithInstitution && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="institutionDetails"
                      value={formData.institutionDetails}
                      onChange={handleChange}
                      placeholder="Please provide details"
                      className={`w-full px-3 py-2 border rounded-md ${errors.institutionDetails ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.institutionDetails && <p className="text-red-500 text-sm mt-1">{errors.institutionDetails}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Supporting Documents Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Supporting Documents</h3>
              <div>
                <label htmlFor="cvResume" className="block text-sm font-medium text-gray-700 mb-1">Updated CV/Resume *</label>
                <input
                  type="file"
                  id="cvResume"
                  name="cvResume"
                  onChange={handleFileChange}
                  className={`w-full ${errors.cvResume ? 'border-red-500' : 'border-gray-300'}`}
                  accept=".pdf,.doc,.docx"
                />
                {errors.cvResume && <p className="text-red-500 text-sm mt-1">{errors.cvResume}</p>}
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">Cover Letter *</label>
                <input
                  type="file"
                  id="coverLetter"
                  name="coverLetter"
                  onChange={handleFileChange}
                  className={`w-full ${errors.coverLetter ? 'border-red-500' : 'border-gray-300'}`}
                  accept=".pdf,.doc,.docx"
                />
                {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
              </div>

              <div>
                <label htmlFor="academicCertificates" className="block text-sm font-medium text-gray-700 mb-1">Academic Certificates *</label>
                <input
                  type="file"
                  id="academicCertificates"
                  name="academicCertificates"
                  onChange={handleFileChange}
                  className={`w-full ${errors.academicCertificates ? 'border-red-500' : 'border-gray-300'}`}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                {errors.academicCertificates && <p className="text-red-500 text-sm mt-1">{errors.academicCertificates}</p>}
              </div>

              <div>
                <label htmlFor="professionalCertifications" className="block text-sm font-medium text-gray-700 mb-1">Professional Certifications</label>
                <input
                  type="file"
                  id="professionalCertifications"
                  name="professionalCertifications"
                  onChange={handleFileChange}
                  className="w-full"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

              <div>
                <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-1">National ID *</label>
                <input
                  type="file"
                  id="nationalId"
                  name="nationalId"
                  onChange={handleFileChange}
                  className={`w-full ${errors.nationalId ? 'border-red-500' : 'border-gray-300'}`}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                {errors.nationalId && <p className="text-red-500 text-sm mt-1">{errors.nationalId}</p>}
              </div>
            </div>

            {/* Short Answer Questions Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Short Answer Questions</h3>
              <div>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">What motivates you to join NBTA? *</label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md ${errors.motivation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
              </div>

              <div>
                <label htmlFor="teachingExperience" className="block text-sm font-medium text-gray-700 mb-1">Describe your experience in teaching, mentoring, or training. *</label>
                <textarea
                  id="teachingExperience"
                  name="teachingExperience"
                  value={formData.teachingExperience}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md ${errors.teachingExperience ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.teachingExperience && <p className="text-red-500 text-sm mt-1">{errors.teachingExperience}</p>}
              </div>
            </div>

            {/* Declaration Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Declaration</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  I certify that the information provided is true and accurate. I understand that falsification may lead to disqualification.
                </p>
              </div>

              <div>
                <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-1">Signature *</label>
                <input
                  type="text"
                  id="signature"
                  name="signature"
                  value={formData.signature}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.signature ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.signature && <p className="text-red-500 text-sm mt-1">{errors.signature}</p>}
              </div>

              <div>
                <label htmlFor="signatureDate" className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  id="signatureDate"
                  name="signatureDate"
                  value={formData.signatureDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.signatureDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.signatureDate && <p className="text-red-500 text-sm mt-1">{errors.signatureDate}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm; 