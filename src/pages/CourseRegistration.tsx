import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import CourseRegistrationForm from '../components/CourseRegistrationForm';

const CourseRegistration: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Helper to display mode in a user-friendly way
  const modeLabel = {
    online: 'Online Training Program',
    physical: 'Physical Training Program',
    hybrid: 'Hybrid Training Program',
  }[course.mode] || course.mode;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Register for {course.title}</h1>
              <p className="text-primary font-semibold mb-2">{modeLabel}</p>
              <p className="text-gray-600">Please fill out the form below to register for this course.</p>
            </div>
            <CourseRegistrationForm
              course={course}
              onClose={() => navigate('/courses')}
              onSubmit={() => navigate('/registration-success')}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration; 