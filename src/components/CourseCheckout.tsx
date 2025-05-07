import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Program } from '../services/programService';

interface Props {
  course: Program;
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
      // Create user program record in localStorage
      const userPrograms = JSON.parse(localStorage.getItem('userPrograms') || '[]');
      const newUserProgram = {
        id: Math.random().toString(36).substr(2, 9),
        user_id: user.id,
        program_id: course.id,
        status: 'active',
        created_at: new Date().toISOString(),
      };
      userPrograms.push(newUserProgram);
      localStorage.setItem('userPrograms', JSON.stringify(userPrograms));

      // Redirect to course page
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