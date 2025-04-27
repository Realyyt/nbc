import { Link } from 'react-router-dom';
import { FileText, Download, Calendar } from 'lucide-react';

const Press = () => {
  const pressReleases = [
    {
      id: 1,
      title: 'NBTA Launches New Learning Platform',
      date: 'March 15, 2024',
      description: 'NBTA announces the launch of its new learning platform, offering enhanced features and improved user experience.',
      link: '#'
    },
    {
      id: 2,
      title: 'NBTA Partners with Leading Universities',
      date: 'February 28, 2024',
      description: 'NBTA forms strategic partnerships with top universities to expand course offerings and improve learning outcomes.',
      link: '#'
    },
    {
      id: 3,
      title: 'NBTA Raises $50M in Series B Funding',
      date: 'January 20, 2024',
      description: 'NBTA secures $50 million in Series B funding to accelerate growth and expand its global presence.',
      link: '#'
    }
  ];

  const mediaResources = [
    {
      id: 1,
      title: 'NBTA Brand Guidelines',
      type: 'PDF',
      size: '2.5 MB',
      link: '#'
    },
    {
      id: 2,
      title: 'NBTA Logo Pack',
      type: 'ZIP',
      size: '5.1 MB',
      link: '#'
    },
    {
      id: 3,
      title: 'NBTA Press Kit',
      type: 'PDF',
      size: '3.8 MB',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Press Room</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, press releases, and media resources from NBTA.
          </p>
        </div>

        {/* Press Releases */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Latest Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map(release => (
              <div key={release.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar size={16} className="mr-2" />
                  {release.date}
                </div>
                <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                <p className="text-gray-600 mb-4">{release.description}</p>
                <Link to={release.link} className="text-primary hover:underline">
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Media Resources */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Media Resources</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              {mediaResources.map(resource => (
                <div key={resource.id} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-0">
                  <div className="flex items-center">
                    <FileText size={20} className="text-gray-400 mr-3" />
                    <div>
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-gray-600">{resource.type} • {resource.size}</p>
                    </div>
                  </div>
                  <a
                    href={resource.link}
                    className="flex items-center text-primary hover:underline"
                    download
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Press Contact</h2>
            <p className="text-gray-600 mb-4">
              For press inquiries, please contact our media relations team:
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>Email:</strong> press@nbta.com
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> +234 123 456 7890
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> NBTA Headquarters, 123 Trade Avenue, Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press; 