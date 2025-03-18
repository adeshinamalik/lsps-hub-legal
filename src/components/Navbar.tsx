
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Publications', path: '/publications' },
    { name: 'News & Events', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10 lg:px-20',
        isScrolled
          ? 'bg-white/80 backdrop-blur-sm shadow-subtle'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <NavLink 
            to="/" 
            className="text-law-DEFAULT text-xl md:text-2xl font-serif font-bold tracking-tight transition-opacity hover:opacity-90"
          >
            LSPS
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium py-1 transition-all relative',
                    isActive 
                      ? 'text-law-DEFAULT after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-law-accent after:transform after:scale-x-100 after:origin-bottom-left after:transition-transform'
                      : 'text-gray-600 hover:text-law-DEFAULT after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-law-accent after:transform after:scale-x-0 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left'
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-law-DEFAULT" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-slide-in-right">
          <nav className="flex flex-col py-4 px-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'py-3 text-base font-medium transition-colors border-b border-gray-100 last:border-b-0',
                    isActive ? 'text-law-DEFAULT' : 'text-gray-600 hover:text-law-DEFAULT'
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
