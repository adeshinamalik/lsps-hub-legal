
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    // Here you would normally send this to your backend
    console.log("Subscribing email:", email);
    
    toast({
      title: "Subscription successful",
      description: "Thank you for subscribing to our newsletter!",
    });
    
    // Reset the form
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-law-DEFAULT text-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold mb-6">LSS Press</h3>
            <p className="text-gray-300 leading-relaxed">
              The Law Students' Society Press of the University of Ilorin is dedicated to promoting legal journalism and nurturing the next generation of legal writers.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="https://www.instagram.com/lss_press?igsh=amtsbnZmZTF3bHox" target="_blank" rel="noopener noreferrer" className="text-white hover:text-law-accent transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://x.com/lss_press?t=i6AvJQRl__bxThGw0ZMKMg&s=09" target="_blank" rel="noopener noreferrer" className="text-white hover:text-law-accent transition-colors">
                <Twitter size={20} />
                <span className="sr-only">X (Twitter)</span>
              </a>
              <a href="https://youtube.com/@lsspress?si=HPsSNyUbCwdw6Rfm" target="_blank" rel="noopener noreferrer" className="text-white hover:text-law-accent transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-black transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-black transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/publications" className="text-gray-300 hover:text-black transition-colors">Publications</Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-black transition-colors">News & Events</Link>
              </li>
              <li>
                <Link to="/magazine" className="text-gray-300 hover:text-black transition-colors">Magazine</Link>
              </li>
              <li>
                <Link to="/multimedia" className="text-gray-300 hover:text-black transition-colors">Multimedia</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-black transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-black transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/join-us" className="text-gray-300 hover:text-black transition-colors">Join Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-black transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-law-accent shrink-0 mt-0.5" />
                <span className="text-gray-300">Faculty of Law, University of Ilorin, Ilorin, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-law-accent shrink-0" />
                <a href="mailto:Lsspressdirect@gmail.com" className="text-gray-300 hover:text-black transition-colors">
                  Lsspressdirect@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-law-accent shrink-0" />
                <a href="tel:+2347043416921" className="text-gray-300 hover:text-black transition-colors">
                  +234 704 341 6921
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Newsletter</h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex items-center">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  className="bg-law-light text-white placeholder:text-gray-400 rounded-l-md rounded-r-none border-0 focus:ring-1 focus:ring-law-accent"
                />
                <Button type="submit" className="bg-law-accent hover:bg-law-accent/90 text-white rounded-l-none rounded-r-md">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-law-light mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Law Students' Society Press. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
