import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { brevoService } from '../services/brevoService';
import { courses } from '../data/courses';

// Form validation schema
const registrationSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Please enter a valid address" }),
  educationLevel: z.string().min(1, { message: "Please select your education level" }),
  previousExperience: z.string().optional(),
  reasonForRegistration: z.string().min(10, { message: "Please provide a detailed reason for registration" }),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const CourseRegistration: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    educationLevel: '',
    previousExperience: '',
    reasonForRegistration: '',
  });

  // Get course data from our frontend state
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Course Not Found</h2>
          <p className="mt-4 text-gray-600">The course you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/courses')}
            className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form data
      const validatedData = registrationSchema.parse(formData);
      
      // Store form data in localStorage for demo purposes
      const registrations = JSON.parse(localStorage.getItem('courseRegistrations') || '[]');
      registrations.push({
        ...validatedData,
        courseId,
        courseTitle: course.title,
        registrationDate: new Date().toISOString(),
      });
      localStorage.setItem('courseRegistrations', JSON.stringify(registrations));

      try {
        // Send confirmation email to student
        const studentEmail = brevoService.generateRegistrationEmail(
          course.title,
          `${validatedData.firstName} ${validatedData.lastName}`
        );
        await brevoService.sendEmail({
          to: validatedData.email,
          ...studentEmail,
        });

        // Send notification email to admin
        const adminEmail = brevoService.generateAdminNotificationEmail(
          course.title,
          {
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
            email: validatedData.email,
            phone_number: validatedData.phoneNumber,
            education_level: validatedData.educationLevel,
            previous_experience: validatedData.previousExperience,
            reason_for_registration: validatedData.reasonForRegistration,
          }
        );
        await brevoService.sendEmail({
          to: 'admin@nbtaacademy.com',
          ...adminEmail,
        });

        navigate('/registration-success');
      } catch (emailError: any) {
        console.error('Email error:', emailError);
        // If email fails, still show success but with a warning
        setError('Registration successful, but there was an issue sending the confirmation email. Please check your email address and try again later.');
        navigate('/registration-success');
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError(error.message || 'An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Register for {course.title}</h1>
              <p className="text-gray-600">Please fill out the form below to register for this course.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Education Level *
                </label>
                <select
                  id="educationLevel"
                  name="educationLevel"
                  required
                  value={formData.educationLevel}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select your education level</option>
                  <option value="primary">Primary School</option>
                  <option value="secondary">Secondary School</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="previousExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Experience (if any)
                </label>
                <textarea
                  id="previousExperience"
                  name="previousExperience"
                  value={formData.previousExperience}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Describe any relevant experience you have..."
                />
              </div>

              <div>
                <label htmlFor="reasonForRegistration" className="block text-sm font-medium text-gray-700 mb-1">
                  Why do you want to register for this course? *
                </label>
                <textarea
                  id="reasonForRegistration"
                  name="reasonForRegistration"
                  required
                  value={formData.reasonForRegistration}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Please tell us why you're interested in this course..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/courses')}
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration; 