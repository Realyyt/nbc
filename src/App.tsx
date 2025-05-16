import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Help from './pages/Help';
import Guides from './pages/Guides';
import Community from './pages/Community';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Accessibility from './pages/Accessibility';
import Cookies from './pages/Cookies';
import Press from './pages/Press';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import Partnerships from './pages/Partnerships';
import PhysicalPlatform from './pages/PhysicalPlatform';
import OnlinePlatform from './pages/OnlinePlatform';
import HybridPlatform from './pages/HybridPlatform';
import CourseRegistration from './pages/CourseRegistration';
import RegistrationSuccess from './pages/RegistrationSuccess';
import CoursesPage from './pages/CoursesPage';
import { CartProvider } from './contexts/CartContext';

const App = () => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/help" element={<Help />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/community" element={<Community />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/press" element={<Press />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/affiliate-courses" element={<CoursesPage />} />
            <Route path="/register/:courseId" element={<CourseRegistration />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/platforms/physical" element={<PhysicalPlatform />} />
            <Route path="/platforms/online" element={<OnlinePlatform />} />
            <Route path="/platforms/hybrid" element={<HybridPlatform />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;