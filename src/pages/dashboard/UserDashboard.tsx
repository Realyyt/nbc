import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import type { Course, UserCourse } from '../../lib/supabase';

const UserDashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<(UserCourse & { course: Course })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_courses')
          .select(`
            *,
            course:courses(*)
          `)
          .eq('user_id', user.id)
          .eq('status', 'active');

        if (error) throw error;
        setEnrolledCourses(data || []);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, {user?.user_metadata?.name || 'User'}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's an overview of your learning journey
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-500 text-sm">Enrolled Programs</h3>
          <p className="text-2xl font-semibold mt-1">{enrolledCourses.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-500 text-sm">Completed</h3>
          <p className="text-2xl font-semibold mt-1">
            {enrolledCourses.filter(c => c.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-500 text-sm">In Progress</h3>
          <p className="text-2xl font-semibold mt-1">
            {enrolledCourses.filter(c => c.status === 'active').length}
          </p>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Your Programs</h2>
        </div>
        
        {enrolledCourses.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">You haven't enrolled in any programs yet.</p>
            <Link to="/programs" className="text-primary hover:underline mt-2 inline-block">
              Browse Programs
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {enrolledCourses.map((enrollment) => (
              <div key={enrollment.id} className="p-6 flex items-center">
                <img
                  src={enrollment.course.thumbnail_url}
                  alt={enrollment.course.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-800">
                    {enrollment.course.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {enrollment.course.instructor}
                  </p>
                </div>
                <Link
                  to={`/programs/${enrollment.course_id}`}
                  className="text-primary hover:underline text-sm"
                >
                  Continue Learning
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;