import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">NBTA</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/accessibility" className="text-gray-400 hover:text-white">Accessibility</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
            <div className="flex space-x-4">
              <a href="https://web.facebook.com/profile.php?id=61560035187897&sk=about" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="https://x.com/NBT_Acad" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="https://www.instagram.com/nbta_edu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="https://www.linkedin.com/company/107575390/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin size={24} />
              </a>
              <a href="https://www.youtube.com/channel/UCZA4-UHInCcgB3DLLWdeyBQ" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="text-2xl font-bold text-white">
              <img src="/logo.png" alt="NBTA Logo" className="w-20 h-10" />
              </Link>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} NBTA All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;