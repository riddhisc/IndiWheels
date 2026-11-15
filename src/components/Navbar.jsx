import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors"
          >
            <Home className="w-6 h-6" />
            <span className="font-bold">IndiWheels</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-orange-500 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className="text-orange-500 font-medium"
            >
              Cars
            </Link>
            <Link
              to="/about"
              className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;