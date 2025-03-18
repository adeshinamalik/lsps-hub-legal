
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for news
const newsItems = [
  {
    id: "1",
    title: "LSPS Welcomes New Editorial Board",
    date: "May 28, 2023",
    description: "The Law Students' Press Society is pleased to announce the appointment of a new editorial board for the 2023/2024 academic session. The new board, led by Daniel Ehigiator as Editor-in-Chief, will oversee all publications and media activities of the society.",
    type: "news" as const,
    imageSrc: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "2",
    title: "Law Faculty Honors Outstanding Student Journalists",
    date: "April 15, 2023",
    description: "The Faculty of Law recently recognized five student journalists from the LSPS for their exceptional contributions to legal journalism. The award ceremony, which was part of the Faculty's annual dinner, celebrated the students' dedication to promoting legal literacy through their writings.",
    type: "news" as const,
    imageSrc: "https://images.unsplash.com/photo-1569038786784-24a715a36507?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "3",
    title: "LSPS Partners with National Bar Association for Legal Writing Program",
    date: "March 22, 2023",
    description: "The Law Students' Press Society has announced a partnership with the Nigerian Bar Association to launch a comprehensive legal writing program for law students. The program aims to enhance the writing skills of aspiring lawyers through workshops, mentoring, and practical exercises.",
    type: "news" as const,
    imageSrc: "https://images.unsplash.com/photo-1573497019236-61f323342eb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "4",
    title: "LSPS Journal Recognized for Excellence in Student Publications",
    date: "February 10, 2023",
    description: "The LSPS Law Journal has been recognized as one of the top three student-run legal publications in Nigeria by the Association of Legal Editors. The recognition comes after a rigorous evaluation of the journal's content, editorial standards, and overall impact on legal discourse.",
    type: "news" as const,
    imageSrc: "https://images.unsplash.com/photo-1554377740-071519c3c6cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1444&q=80"
  },
];

// Mock data for events
const eventItems = [
  {
    id: "1",
    title: "LSPS Annual Legal Writing Workshop",
    date: "Posted on June 5, 2023",
    description: "Join us for our annual legal writing workshop designed to enhance your legal writing skills. Expert speakers from leading law firms will be in attendance to share insights on effective legal drafting, research methods, and citation techniques.",
    type: "event" as const,
    eventDate: "July 20, 2023",
    time: "10:00 AM - 3:00 PM",
    location: "Faculty of Law Auditorium",
    imageSrc: "https://images.unsplash.com/photo-1560523159-4a9692f3f7bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "2",
    title: "National Moot Court Competition",
    date: "Posted on May 15, 2023",
    description: "LSPS is proud to be a media partner for the upcoming National Moot Court Competition. Our team will provide comprehensive coverage of the event, including live updates, interviews with participants, and analysis of the moot court cases.",
    type: "event" as const,
    eventDate: "August 5-7, 2023",
    time: "9:00 AM - 5:00 PM daily",
    location: "Supreme Court Complex, Abuja",
    imageSrc: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "3",
    title: "Legal Journalism Masterclass",
    date: "Posted on April 30, 2023",
    description: "LSPS invites all interested students to a masterclass on legal journalism. The session will be facilitated by experienced legal journalists from leading media organizations who will share practical insights on reporting legal issues, court proceedings, and legislative developments.",
    type: "event" as const,
    eventDate: "June 15, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Faculty of Law Conference Room",
    imageSrc: "https://images.unsplash.com/photo-1498661367879-c2085689eed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "4",
    title: "Editorial Skills Development Series",
    date: "Posted on March 25, 2023",
    description: "LSPS presents a four-part series on editorial skills development for aspiring editors. The series will cover topics such as copy editing, content planning, editorial ethics, and managing an editorial team. Each session will include practical exercises and feedback.",
    type: "event" as const,
    eventDate: "June 10, 17, 24, July 1, 2023",
    time: "10:00 AM - 12:00 PM each Saturday",
    location: "LSPS Office, Faculty of Law",
    imageSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
];

const News = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Combine and filter items based on active tab
  const filteredItems = activeTab === "all" 
    ? [...newsItems, ...eventItems] 
    : activeTab === "news" 
      ? newsItems 
      : eventItems;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-law-DEFAULT mb-6">News & Events</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stay updated with the latest news and upcoming events from the Law Students' Press Society.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-12">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-3 w-full max-w-md bg-law-muted">
                <TabsTrigger value="all" className="data-[state=active]:bg-law-DEFAULT data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="news" className="data-[state=active]:bg-law-DEFAULT data-[state=active]:text-white">
                  News
                </TabsTrigger>
                <TabsTrigger value="events" className="data-[state=active]:bg-law-DEFAULT data-[state=active]:text-white">
                  Events
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                  <NewsEventCard key={`${item.type}-${item.id}`} item={item} index={index} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="news" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsItems.map((item, index) => (
                  <NewsEventCard key={`news-${item.id}`} item={item} index={index} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {eventItems.map((item, index) => (
                  <NewsEventCard key={`event-${item.id}`} item={item} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

interface NewsEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'news' | 'event';
  imageSrc?: string;
  eventDate?: string;
  time?: string;
  location?: string;
}

interface NewsEventCardProps {
  item: NewsEvent;
  index: number;
}

const NewsEventCard = ({ item, index }: NewsEventCardProps) => {
  return (
    <Card 
      className="overflow-hidden border-none bg-white shadow-subtle transition-all duration-300 hover:shadow-glass h-full flex flex-col animate-fade-up"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both',
      }}
    >
      {item.imageSrc && (
        <div className="h-48 overflow-hidden">
          <img
            src={item.imageSrc}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-3">
          <span className={cn(
            "text-xs font-medium px-3 py-1 rounded-full",
            item.type === 'event' 
              ? "bg-law-accent/10 text-law-accent" 
              : "bg-law-DEFAULT/10 text-law-DEFAULT"
          )}>
            {item.type === 'event' ? 'Event' : 'News'}
          </span>
          <span className="ml-3 text-sm text-law-text-light">{item.date}</span>
        </div>
        
        <h3 className="text-xl font-bold text-law-DEFAULT mb-3">{item.title}</h3>
        
        {item.type === 'event' && item.eventDate && (
          <div className="space-y-2 mb-3">
            <div className="flex items-center text-law-text-light">
              <Calendar className="h-4 w-4 mr-2 text-law-accent" />
              <span className="text-sm">{item.eventDate}</span>
            </div>
            
            {item.time && (
              <div className="flex items-center text-law-text-light">
                <Clock className="h-4 w-4 mr-2 text-law-accent" />
                <span className="text-sm">{item.time}</span>
              </div>
            )}
            
            {item.location && (
              <div className="flex items-center text-law-text-light">
                <MapPin className="h-4 w-4 mr-2 text-law-accent" />
                <span className="text-sm">{item.location}</span>
              </div>
            )}
          </div>
        )}
        
        <p className="text-law-text-light mb-6 line-clamp-3 flex-grow">{item.description}</p>
        
        <Button 
          variant="ghost" 
          className="text-law-DEFAULT hover:text-law-accent justify-start pl-0 w-fit group"
        >
          Read more
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
};

export default News;
