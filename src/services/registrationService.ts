import { supabase } from '../lib/supabase';
import type { RegistrationFormData } from '../components/CourseRegistrationForm';
import { brevoService } from './brevoService';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export const registrationService = {
  async submitRegistration(courseId: string, formData: RegistrationFormData) {
    try {
      // Get course details
      const { data: courseData, error: courseError } = await supabase
        .from('programs')
        .select('title')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;

      // Insert registration
      const { data, error } = await supabase
        .from('course_registrations')
        .insert([
          {
            course_id: courseId,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: formData.phoneNumber,
            address: formData.address,
            education_level: formData.educationLevel,
            previous_experience: formData.previousExperience,
            reason_for_registration: formData.reasonForRegistration,
            status: 'pending',
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email to student
      const studentEmail = brevoService.generateRegistrationEmail(
        courseData.title,
        `${formData.firstName} ${formData.lastName}`
      );
      await brevoService.sendEmail({
        to: formData.email,
        ...studentEmail,
      });

      // Send notification email to admin
      if (ADMIN_EMAIL) {
        const adminEmail = brevoService.generateAdminNotificationEmail(
          courseData.title,
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: formData.phoneNumber,
            education_level: formData.educationLevel,
            previous_experience: formData.previousExperience,
            reason_for_registration: formData.reasonForRegistration,
          }
        );
        await brevoService.sendEmail({
          to: ADMIN_EMAIL,
          ...adminEmail,
        });
      }

      return data;
    } catch (error) {
      console.error('Error submitting registration:', error);
      throw error;
    }
  },

  async getRegistrationsByCourse(courseId: string) {
    try {
      const { data, error } = await supabase
        .from('course_registrations')
        .select('*')
        .eq('course_id', courseId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching registrations:', error);
      throw error;
    }
  },
}; 