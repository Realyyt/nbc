import React from 'react';

const UserCourses = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Programs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course list will be implemented later */}
        <p className="text-gray-600">No programs enrolled yet.</p>
      </div>
    </div>
  );
};

export default UserCourses;