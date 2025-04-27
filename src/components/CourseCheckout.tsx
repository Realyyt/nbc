import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { Course } from '../lib/supabase';

interface Props {
  course: Course;
}

const CourseCheckout = ({ course }: Props) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEnrollment = async () => {
    if (!user) {
      // Redirect to login
      return;
    }

    setIsProcessing(true);
    try {
      // First create a payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          course_id: course.id,
          amount: course.price,
          currency: 'NGN',
          status: 'completed', // You should integrate with a payment provider here
          payment_method: 'card',
        });

      if (paymentError) throw paymentError;

      // Then create the enrollment
      const { error: enrollmentError } = await supabase
        .from('user_courses')
        .insert({
          user_id: user.id,
          course_id: course.id,
          status: 'active',
        });

      if (enrollmentError) throw enrollmentError;

      // Redirect to success page or course page
      window.location.href = `/courses/${course.id}`;
    } catch (error) {
      console.error('Error during enrollment:', error);
      alert('Failed to enroll in course. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{course.title}</h2>
      <div className="mb-4">
        <p className="text-2xl font-bold">₦{course.price.toLocaleString()}</p>
      </div>
      <button
        onClick={handleEnrollment}
        disabled={isProcessing}
        className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : 'Enroll Now'}
      </button>
    </div>
  );
};

export default CourseCheckout; 