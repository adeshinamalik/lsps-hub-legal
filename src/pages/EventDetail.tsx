
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/CommentSection";
import { ArrowLeft, Calendar, User, Tag, MapPin } from "lucide-react";
import { fetchEventById } from "@/firebase/firebaseService";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { log } from "console";

// Mock events data as fallback
const staticEvents = [
  {
    id: "1",
    title: "Annual Law Students Conference",
    date: "June 10, 2023",
    description:
      "Join us for the annual Law Students Conference featuring keynote speakers from top law firms and academic institutions across Nigeria. This year's theme is 'The Future of Legal Practice in the Digital Age'.",
    imageSrc:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    location: "Faculty of Law Auditorium",
    eventDate: "June 10, 2023 | 10:00 AM - 4:00 PM",
    content: `
      <p>The Annual Law Students Conference is one of the most anticipated events in the academic calendar for law students across Nigeria. This conference provides an opportunity for students to engage with legal professionals, academics, and peers on contemporary issues in legal practice.</p>
      
      <h2>Conference Theme</h2>
      <p>This year's theme, 'The Future of Legal Practice in the Digital Age', focuses on the intersection of law and technology. The conference will explore how technological advancements are reshaping legal services delivery, legal education, and the overall practice of law in Nigeria and globally.</p>
      
      <h2>Keynote Speakers</h2>
      <p>We are honored to host distinguished speakers from top law firms, tech companies, and academic institutions, including:</p>
      <ul>
        <li>Prof. Adebayo Olanrewaju, SAN - Former Attorney General of the Federation</li>
        <li>Mrs. Funke Adekoya, SAN - Managing Partner, AELEX Legal Practitioners</li>
        <li>Mr. Chidi Anselm Odinkalu - Former Chairman, National Human Rights Commission</li>
        <li>Dr. Jumoke Oduwole - Special Adviser to the President on Ease of Doing Business</li>
      </ul>
      
      <h2>Workshop Sessions</h2>
      <p>The conference will feature various workshop sessions on:</p>
      <ul>
        <li>Legal Tech Tools for Modern Practice</li>
        <li>Digital Evidence and Electronic Discovery</li>
        <li>Online Dispute Resolution Mechanisms</li>
        <li>Cybersecurity Law and Data Protection</li>
        <li>Blockchain and Smart Contracts in Legal Practice</li>
      </ul>
      
      <h2>Networking Opportunities</h2>
      <p>Attendees will have the opportunity to network with legal professionals, potential employers, and fellow law students from various universities. The conference will conclude with a networking cocktail session sponsored by leading law firms.</p>
      
      <h2>Registration Information</h2>
      <p>Registration is free for all Law Students' Press Society members. Non-members can register at a fee of ₦2,000. Registration includes access to all sessions, conference materials, lunch, and refreshments.</p>
      
      <p>Don't miss this opportunity to expand your knowledge and network in the evolving landscape of legal practice!</p>
    `
  },
  // Additional events would be here
];

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);


  
  useEffect(() => {
    const fetchEventData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // Try to fetch from Firebase
        const firebaseEvent = await fetchEventById(id);
        console.log(firebaseEvent);
        
        
        if (firebaseEvent) {
          setEvent(firebaseEvent);
        } else {
          // If not found in Firebase, check static data
          const staticEvent = staticEvents.find(e => e.id === id);
          
          if (staticEvent) {
            setEvent(staticEvent);
          } else {
            toast.error("Event not found");
          }
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event details");
        
        // Fallback to static data
        const staticEvent = staticEvents.find(e => e.id === id);
        if (staticEvent) {
          setEvent(staticEvent);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEventData();
  }, [id]);
  
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
          <div className="container mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6 text-law-DEFAULT hover:text-white pl-0"
              onClick={() => navigate('/events')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
            
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-8 w-1/3 mb-4" />
              <Skeleton className="h-12 w-full mb-6" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-6 w-48" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-12 px-6 md:px-10 lg:px-20">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="w-full h-[400px] rounded-lg mb-10" />
              <div className="space-y-4 mb-12">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  // If no event is found, show a message and a button to go back
  if (!event) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 md:px-10 lg:px-20 py-32 text-center">
          <h1 className="text-3xl font-bold text-law-DEFAULT mb-6">Event Not Found</h1>
          <p className="text-law-text-light mb-8">The event you are looking for does not exist or has been removed.</p>
          <Button 
            variant="outline" 
            className="border-law-DEFAULT text-law-DEFAULT hover:bg-law-DEFAULT hover:text-white"
            onClick={() => navigate('/events')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 text-law-DEFAULT hover:text-white pl-3"
            onClick={() => navigate('/events')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-block bg-law-DEFAULT/10 text-law-DEFAULT px-3 py-1 rounded-full text-sm font-medium">
                Event
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-law-DEFAULT mb-6">{event.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-law-text-light mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{event.eventDate || event.date}</span>
              </div>
              
              {event.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              )}
              
              {event.author && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{event.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <article className="py-12 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <img 
                src={event.imageSrc || event.imageUrl} 
                alt={event.title} 
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Event+Image+Not+Found";
                }}
              />
            </div>
            
            <div 
              className="prose prose-lg max-w-none mb-12" 
              dangerouslySetInnerHTML={{ __html: event.content || event.description }}
            />
            
            {/* Comment Section */}
            <CommentSection itemId={id || ""} itemType="event" />
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
