import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContentMenuOpen, setIsContentMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/lovable-uploads/21b83501-660a-4549-ac69-7c903bb1cf71.png"
              alt="LSS Press Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl font-serif font-bold text-law-DEFAULT">LSS Press</span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium">
              About
            </Link>
            <div className="relative group">
              <button className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium flex items-center">
                Content
                <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <Link to="/publications" className="block px-4 py-3 text-law-text-dark hover:text-law-DEFAULT hover:bg-law-muted/50 rounded-md transition-colors duration-200">
                    <div className="font-medium">Publications</div>
                    <div className="text-sm text-gray-500">Articles & Research</div>
                  </Link>
                  <Link to="/news" className="block px-4 py-3 text-law-text-dark hover:text-law-DEFAULT hover:bg-law-muted/50 rounded-md transition-colors duration-200">
                    <div className="font-medium">News & Events</div>
                    <div className="text-sm text-gray-500">Latest Updates</div>
                  </Link>
                  <Link to="/magazine" className="block px-4 py-3 text-law-text-dark hover:text-law-DEFAULT hover:bg-law-muted/50 rounded-md transition-colors duration-200">
                    <div className="font-medium">Magazine</div>
                    <div className="text-sm text-gray-500">PDF Publications</div>
                  </Link>
                  <Link to="/multimedia" className="block px-4 py-3 text-law-text-dark hover:text-law-DEFAULT hover:bg-law-muted/50 rounded-md transition-colors duration-200">
                    <div className="font-medium">Multimedia</div>
                    <div className="text-sm text-gray-500">Podcasts & Videos</div>
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/gallery" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium">
              Gallery
            </Link>
            <Link to="/resources" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium">
              Resources
            </Link>
            <Link to="/join-us" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium">
              Join Us
            </Link>
            <Link to="/contact" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-law-text-dark hover:text-law-DEFAULT hover:bg-law-muted/50 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium py-2">
                Home
              </Link>
              <Link to="/about" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium py-2">
                About
              </Link>
              <button
                onClick={() => setIsContentMenuOpen(!isContentMenuOpen)}
                className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium py-2 flex items-center justify-between"
              >
                Content
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isContentMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isContentMenuOpen && (
                <div className="pl-4 space-y-3">
                  <Link to="/publications" className="block text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 py-2">
                    Publications
                  </Link>
                  <Link to="/news" className="block text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 py-2">
                    News & Events
                  </Link>
                  <Link to="/magazine" className="block text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 py-2">
                    Magazine
                  </Link>
                  <Link to="/multimedia" className="block text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 py-2">
                    Multimedia
                  </Link>
                </div>
              )}
              <Link to="/gallery" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium py-2">
                Gallery
              </Link>
              <Link to="/resources" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium py-2">
                Resources
              </Link>
              <Link to="/join-us" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium py-2">
                Join Us
              </Link>
              <Link to="/contact" className="text-law-text-dark hover:text-law-DEFAULT transition-colors duration-200 font-medium py-2">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
