import React from 'react';

interface CourseCardProps {
  title: string;
  platform: 'udemy' | 'google' | 'coursera' | 'other';
  description: string;
  imageUrl: string;
  affiliateLink: string;
  price?: string;
  rating?: number;
  instructor?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  platform,
  description,
  imageUrl,
  affiliateLink,
  price,
  rating,
  instructor,
}) => {
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'udemy':
        return 'bg-purple-600';
      case 'google':
        return 'bg-blue-600';
      case 'coursera':
        return 'bg-blue-500';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className={`absolute top-2 right-2 px-2 py-1 rounded text-white text-sm ${getPlatformColor(platform)}`}>
            {platform}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          {instructor && (
            <p className="text-gray-500 text-sm mb-2">Instructor: {instructor}</p>
          )}
          <div className="flex justify-between items-center">
            {price && (
              <span className="text-lg font-bold text-gray-900">{price}</span>
            )}
            {rating && (
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-gray-600">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default CourseCard; 