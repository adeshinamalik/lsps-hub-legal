import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/CommentSection";
import { ArrowLeft, Calendar, User, MapPin } from "lucide-react";
import { fetchEventById } from "@/firebase/firebaseService"; // Assuming this is your service function
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Define the Event interface for type safety
interface Event {
  id: string;
  title: string;
  date: string;
  description?: string;
  content?: string;
  imageSrc?: string;
  imageUrl?: string; // For compatibility with possible Firebase field
  location?: string;
  eventDate?: string;
  author?: string;
  type: "event";
}

// Static events data as fallback
const staticEvents: Event[] = [
  {
    id: "1",
    title: "Annual Law Students Conference",
    date: "June 10, 2023",
    description:
      "Join us for the annual Law Students Conference featuring keynote speakers from top law firms and academic institutions across Nigeria.",
    content: `
      <p>The Annual Law Students Conference is one of the most anticipated events...</p>
      <!-- Truncated for brevity -->
    `,
    imageSrc:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    location: "Faculty of Law Auditorium",
    eventDate: "June 10, 2023 | 10:00 AM - 4:00 PM",
    type: "event",
  }
  // Other static events omitted for brevity
  ,
  {
    id: "2",
    title: "Moot Court Competition",
    date: "July 15, 2023",
    description:
      "The annual Moot Court Competition is back! Law students from all levels are invited to participate in this exciting event that simulates real-world court proceedings.",
    content: `
      <p>The annual Moot Court Competition is one of our most prestigious events, offering law students the opportunity to develop their advocacy skills in a simulated courtroom environment.</p>
      
      <h2>About the Competition</h2>
      <p>The Moot Court Competition is designed to give law students practical experience in legal argumentation and courtroom procedures. Participants will prepare written submissions and present oral arguments before a panel of judges consisting of faculty members, practicing lawyers, and senior students.</p>
      
      <h2>This Year's Problem</h2>
      <p>This year's moot problem involves a complex constitutional law issue regarding the right to privacy in the digital age. The case touches on government surveillance, data protection, and individual liberties.</p>
      
      <h2>Eligibility</h2>
      <p>The competition is open to all law students from 200 to 500 level. Students may participate individually or in teams of two.</p>
      
      <h2>Prizes</h2>
      <p>Winners will receive valuable prizes including:</p>
      <ul>
        <li>Cash prizes</li>
        <li>Law books and materials</li>
        <li>Internship opportunities with leading law firms</li>
        <li>Recognition certificates</li>
      </ul>
      
      <h2>Important Dates</h2>
      <ul>
        <li>Registration Deadline: June 30, 2023</li>
        <li>Release of Moot Problem: July 1, 2023</li>
        <li>Submission of Written Arguments: July 10, 2023</li>
        <li>Oral Rounds: July 15-16, 2023</li>
        <li>Final Round and Award Ceremony: July 20, 2023</li>
      </ul>
      
      <p>Don't miss this opportunity to showcase your legal skills and gain valuable courtroom experience!</p>
    `,
    imageSrc:
      "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    location: "Faculty of Law, Moot Court",
    eventDate: "July 15-16, 2023 | 9:00 AM - 5:00 PM",
    type: "event"
  },
  {
    id: "3",
    title: "Legal Writing Workshop",
    date: "August 20, 2023",
    description:
      "Improve your legal writing skills with this comprehensive workshop conducted by experienced legal professionals and academics.",
    content: `
      <p>Effective legal writing is a crucial skill for every law student and legal professional. Join us for a comprehensive workshop designed to enhance your legal writing abilities.</p>
      
      <h2>Workshop Overview</h2>
      <p>This intensive workshop will cover various aspects of legal writing, including:</p>
      <ul>
        <li>Legal research methodologies</li>
        <li>Case analysis and briefing</li>
        <li>Drafting legal memoranda</li>
        <li>Opinion writing</li>
        <li>Persuasive writing techniques</li>
        <li>Common writing pitfalls and how to avoid them</li>
      </ul>
      
      <h2>Featured Facilitators</h2>
      <p>The workshop will be facilitated by distinguished legal professionals including:</p>
      <ul>
        <li>Dr. Abiola Johnson - Senior Lecturer, Faculty of Law</li>
        <li>Barr. Chinedu Okafor - Partner, Okafor & Associates</li>
        <li>Mrs. Fatima Hassan - Legal Editor, Law Reports of Nigeria</li>
      </ul>
      
      <h2>Who Should Attend</h2>
      <p>This workshop is ideal for:</p>
      <ul>
        <li>Law students at all levels</li>
        <li>Recent law graduates</li>
        <li>Young legal practitioners looking to improve their writing skills</li>
      </ul>
      
      <h2>Registration</h2>
      <p>Registration fee: ₦1,500 for LSPS members and ₦3,000 for non-members. The fee includes workshop materials, certificate of participation, and refreshments.</p>
      
      <p>Spaces are limited, so early registration is encouraged!</p>
    `,
    imageSrc:
      "https://images.unsplash.com/photo-1560523159-4a9692f3f7bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    location: "Faculty of Law, Conference Room",
    eventDate: "August 20, 2023 | 10:00 AM - 3:00 PM",
    type: "event"
  },
  {
    id: "4",
    title: "Law Career Fair",
    date: "September 8, 2023",
    description:
      "Connect with potential employers and explore career opportunities in various fields of law at our annual Law Career Fair.",
    content: `
      <p>The Law Students' Press Society is proud to present the Annual Law Career Fair, an excellent opportunity for law students to connect with potential employers and explore various career paths in the legal profession.</p>
      
      <h2>Event Highlights</h2>
      <p>The Law Career Fair will feature:</p>
      <ul>
        <li>Exhibitions by leading law firms, corporate legal departments, and public sector organizations</li>
        <li>Panel discussions on different career paths in law</li>
        <li>CV and interview workshops</li>
        <li>One-on-one career counseling sessions</li>
        <li>Networking opportunities with legal professionals</li>
      </ul>
      
      <h2>Participating Organizations</h2>
      <p>This year's Career Fair will host representatives from:</p>
      <ul>
        <li>Top-tier law firms</li>
        <li>Corporate legal departments</li>
        <li>Government agencies</li>
        <li>Non-governmental organizations</li>
        <li>International organizations</li>
        <li>Legal tech companies</li>
      </ul>
      
      <h2>Special Sessions</h2>
      <p>The fair will include special sessions on:</p>
      <ul>
        <li>Navigating the early years of legal practice</li>
        <li>Specializing in emerging areas of law</li>
        <li>Building a personal brand as a lawyer</li>
        <li>International career opportunities for Nigerian lawyers</li>
      </ul>
      
      <h2>Preparation Tips</h2>
      <p>To make the most of the Career Fair, attendees are advised to:</p>
      <ul>
        <li>Bring multiple copies of their CV</li>
        <li>Dress in professional attire</li>
        <li>Prepare a brief personal introduction</li>
        <li>Research participating organizations beforehand</li>
        <li>Prepare relevant questions for potential employers</li>
      </ul>
      
      <p>Don't miss this opportunity to take a significant step toward your legal career!</p>
    `,
    imageSrc:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    location: "Faculty of Law Auditorium",
    eventDate: "September 8, 2023 | 9:00 AM - 4:00 PM",
    type: "event"
  }
];

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch from Firebase
        const firebaseEvent = await fetchEventById(id);
        if (firebaseEvent) {
          setEvent({ ...firebaseEvent, type: "event" } as Event);
        } else {
          // Fallback to static data
          const staticEvent = staticEvents.find((e) => e.id === id);
          if (staticEvent) {
            setEvent(staticEvent);
          } else {
            setEvent(null); // No event found
            toast.error("Event not found");
          }
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event details");

        // Fallback to static data
        const staticEvent = staticEvents.find((e) => e.id === id);
        if (staticEvent) {
          setEvent(staticEvent);
        } else {
          setEvent(null);
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
              onClick={() => navigate("/events")}
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
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            onClick={() => navigate("/events")}
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
            className="mb-6 text-law-DEFAULT hover:text-white pl-0"
            onClick={() => navigate("/events")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-law-DEFAULT/10 text-law-DEFAULT px-3 py-1 rounded-full text-sm font-medium mb-4">
              Event
            </span>
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
                src={event.imageSrc || event.imageUrl || "https://via.placeholder.com/800x400?text=Event+Image+Not+Found"}
                alt={event.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Event+Image+Not+Found";
                }}
              />
            </div>
            <div
              className="prose prose-lg max-w-none mb-12 text-law-text-light"
              dangerouslySetInnerHTML={{ __html: event.content || event.description || "No content available." }}
            />
            <CommentSection itemId={id || ""} itemType="event" />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default EventDetail;