import { useState } from "react";
import { Link, NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/contexts/AuthContext";


interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}


const MobileNavLink = ({ to, children, onClick }: MobileNavLinkProps) => {
  return (
    <Link to={to} onClick={onClick} className="block text-lg font-medium text-gray-700 hover:text-law-DEFAULT transition-colors focus:text-accent-foreground">
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
  const { currentUser } = useAuth();
  const navigate = useNavigate();


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  const handleAdminRedirect = () => {
    navigate(currentUser ? '/admin' : '/login');
    closeMobileMenu();
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
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



          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
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
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent text-gray-700">News & Events</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-3 p-4">
                          <li>
                            <Link
                              to="/news"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              onClick={closeMobileMenu}
                            >
                              <div className="text-sm font-medium leading-none">News</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Latest updates and announcements
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/events"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              onClick={closeMobileMenu}
                            >
                              <div className="text-sm font-medium leading-none">Events</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Upcoming workshops and activities
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </li>
              <li>
                <NavLink to="/multimedia">
                  <div>Multimedia</div>
                  {/* <div className="text-sm text-gray-500">Podcasts & Videos</div> */}
                </NavLink>
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
            <div className="flex items-center gap-3">
              <Button asChild className="bg-law-light hover:bg-law-light">
                <Link to="/join-us">Join Us</Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleAdminRedirect}
                title={currentUser ? "Go to Admin Dashboard" : "Admin Login"}
                className="rounded-full bg-white border-gray-200 hover:bg-gray-100"
              >
                <ShieldCheck className="h-5 w-5 text-law-DEFAULT" />
              </Button>
            </div>
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
                News
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/events" onClick={closeMobileMenu}>
                Events
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
            <li>
              <Button
                onClick={handleAdminRedirect}
                className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-200 bg-white text-law-DEFAULT hover:bg-gray-50"
              >
                <ShieldCheck className="h-4 w-4" />
                {currentUser ? "Admin Dashboard" : "Admin Login"}
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};


export default Navbar;



