import { useState } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const MobileNavLink = ({ to, children, onClick }: MobileNavLinkProps) => {
  return (
    <Link to={to} onClick={onClick} className="block text-lg font-medium text-gray-700 hover:text-law-DEFAULT transition-colors">
      {children}
    </Link>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-700 hover:text-law-DEFAULT",
          isActive ? "text-law-DEFAULT" : "text-gray-700"
        )
      }
    >
      {children}
    </RouterNavLink>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="font-serif text-2xl font-bold text-law-DEFAULT">LSPS</div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/publications">Publications</NavLink>
              </li>
              <li>
                <NavLink to="/news">News & Events</NavLink>
              </li>
              <li>
                <NavLink to="/gallery">Gallery</NavLink>
              </li>
              <li>
                <NavLink to="/resources">Resources</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
            <Button asChild className="bg-law-DEFAULT hover:bg-law-light">
              <Link to="/join-us">Join Us</Link>
            </Button>
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="h-10 w-10 text-law-DEFAULT"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-20 bg-white shadow-md md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-6 py-5">
          <ul className="flex flex-col gap-4">
            <li>
              <MobileNavLink to="/" onClick={closeMobileMenu}>
                Home
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/about" onClick={closeMobileMenu}>
                About
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/publications" onClick={closeMobileMenu}>
                Publications
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/news" onClick={closeMobileMenu}>
                News & Events
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/gallery" onClick={closeMobileMenu}>
                Gallery
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/resources" onClick={closeMobileMenu}>
                Resources
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/contact" onClick={closeMobileMenu}>
                Contact
              </MobileNavLink>
            </li>
            <li>
              <Button
                asChild
                className="w-full mt-2 bg-law-DEFAULT hover:bg-law-light"
              >
                <Link to="/join-us" onClick={closeMobileMenu}>
                  Join Us
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
