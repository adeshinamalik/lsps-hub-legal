
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, MapPin } from "lucide-react";

const Events = () => {
  const navigate = useNavigate();
  
  // Mock events data
  const events = [
    {
      id: "1",
      title: "Annual Law Students Conference",
      date: "June 10, 2023",
      description: "Join us for the annual Law Students Conference featuring keynote speakers from top law firms and academic institutions across Nigeria. This year's theme is 'The Future of Legal Practice in the Digital Age'.",
      imageSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      location: "Faculty of Law Auditorium",
      eventDate: "June 10, 2023 | 10:00 AM - 4:00 PM"
    },
    {
      id: "2",
      title: "Moot Court Competition",
      date: "July 12, 2023",
      description: "The annual Moot Court Competition is back! Showcase your advocacy skills and compete with law students from various universities. Prizes to be won and opportunities for internships with partner law firms.",
      imageSrc: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      location: "University Moot Court Room",
      eventDate: "July 12-14, 2023 | 9:00 AM - 5:00 PM daily"
    },
    {
      id: "3",
      title: "Legal Writing Workshop",
      date: "August 5, 2023",
      description: "Enhance your legal writing skills with our specialized workshop conducted by leading academics and legal professionals. Learn how to craft compelling legal arguments, opinions, and academic papers.",
      imageSrc: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      location: "Law Library Conference Room",
      eventDate: "August 5, 2023 | 11:00 AM - 3:00 PM"
    },
    {
      id: "4",
      title: "Career Fair: Legal Profession",
      date: "September 15, 2023",
      description: "Connect with potential employers from leading law firms, corporations, NGOs, and government agencies. Bring your CV and be prepared for on-the-spot interviews and networking opportunities.",
      imageSrc: "https://images.unsplash.com/photo-1559223607-a43f990c095d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      location: "University Main Hall",
      eventDate: "September 15, 2023 | 10:00 AM - 4:00 PM"
    },
    {
      id: "5",
      title: "Guest Lecture: Chief Justice of Nigeria",
      date: "October 7, 2023",
      description: "An exclusive opportunity to hear from the Chief Justice of Nigeria on 'The Role of Young Lawyers in Advancing Justice Reform in Nigeria'. Limited seats available.",
      imageSrc: "https://images.unsplash.com/photo-1560523159-4a9692d222f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      location: "University Auditorium",
      eventDate: "October 7, 2023 | 2:00 PM - 4:00 PM"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero 
        title="Law Students' Press Society Events"
        subtitle="Stay updated with upcoming events and opportunities."
        ctaText="Join Our Events"
        ctaLink="/join-us"
        imageUrl="https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      />
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-law-DEFAULT mb-6">Upcoming Events</h2>
            <p className="text-lg text-gray-600">
              Join us for our upcoming events, workshops, and activities designed to enhance your legal education and career prospects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Card 
                key={event.id}
                className="overflow-hidden border-none bg-white shadow-subtle transition-all duration-300 hover:shadow-glass animate-fade-up"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.imageSrc}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-law-accent/10 text-law-accent">
                      Event
                    </span>
                    <span className="ml-3 text-sm text-law-text-light">{event.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-law-DEFAULT mb-3">{event.title}</h3>
                  
                  <div className="flex items-center mb-2 text-law-text-light">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{event.eventDate}</span>
                  </div>
                  
                  <div className="flex items-center mb-4 text-law-text-light">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  
                  <p className="text-law-text-light mb-6 line-clamp-3">{event.description}</p>
                  
                  <Button 
                    variant="ghost" 
                    className="text-law-DEFAULT hover:text-law-accent justify-start pl-0 w-fit group"
                    onClick={() => navigate(`/news/${event.id}`)}
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-law-DEFAULT mb-6">Host an Event with Us</h2>
                <p className="text-gray-600 mb-6">
                  Are you interested in hosting a legal event or workshop with the Law Students' Press Society? We welcome collaborations with law firms, NGOs, and other academic institutions.
                </p>
                <p className="text-gray-600 mb-6">
                  Our events provide excellent opportunities for knowledge sharing, networking, and professional development for law students at the University of Ilorin.
                </p>
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-law-DEFAULT hover:bg-law-light text-white"
                >
                  Contact Us
                </Button>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Event collaboration"
                  className="rounded-lg shadow-subtle w-full h-auto object-cover"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-law-accent rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Events;
