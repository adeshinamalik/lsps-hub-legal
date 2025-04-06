import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";
import NewsSection from "@/components/NewsSection";
import EventsSection from "@/components/EventsSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Calendar, ArrowRight } from "lucide-react";
import { myImages } from "@/images";
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/firebase/Firebase';
import { supabase } from "@/supabase/supabase";
import { Skeleton } from "@/components/ui/skeleton";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  category: string;
  imageSrc: string;
}

interface NewsEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'news' | 'event';
  eventDate?: string;
  location?: string;
  imageSrc: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [featuredFirebaseArticles, setFeaturedFirebaseArticles] = useState<Article[]>([]);
  const [featuredSupabaseArticles, setFeaturedSupabaseArticles] = useState<Article[]>([]);
  const [firebaseNewsItems, setFirebaseNewsItems] = useState<NewsEvent[]>([]);
  const [firebaseEventItems, setFirebaseEventItems] = useState<NewsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const staticFeaturedArticles = [
    {
      id: "1",
      title: "The Evolution of Constitutional Law in Nigeria: A Critical Analysis",
      excerpt: "This article examines the historical development and contemporary challenges of constitutional law in Nigeria, with a focus on judicial interpretations and legislative amendments.",
      date: "May 15, 2023",
      author: "John Adeyemi",
      category: "Constitutional Law",
      imageSrc: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: "2",
      title: "Human Rights Protection Under the African Charter: Progress and Challenges",
      excerpt: "A comprehensive review of the effectiveness of the African Charter on Human and Peoples' Rights in protecting fundamental human rights across the continent.",
      date: "April 22, 2023",
      author: "Sarah Okonkwo",
      category: "Human Rights",
      imageSrc: "https://images.unsplash.com/photo-1591291621164-2c6367723315?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
    },
    {
      id: "3",
      title: "Legal Technology and the Future of Legal Practice in Africa",
      excerpt: "This paper explores how technological innovations are reshaping legal practice in Africa, with implications for legal education, access to justice, and professional ethics.",
      date: "March 10, 2023",
      author: "Michael Ibrahim",
      category: "Legal Technology",
      imageSrc: myImages.image2
    },
  ];

  const staticNewsItems = [
    {
      id: "1",
      title: "LSPS Welcomes New Editorial Board",
      date: "May 28, 2023",
      description: "The Law Students' Press Society is pleased to announce the appointment of a new editorial board for the 2023/2024 academic session.",
      type: "news" as const,
      imageSrc: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: "2",
      title: "Mock Trial Competition Results",
      date: "June 10, 2023",
      description: "Congratulations to Team Equity for winning this year's mock trial competition. Their exceptional advocacy skills impressed the panel of judges.",
      type: "news" as const,
      imageSrc: myImages.image1
    },
  ];

  const staticEventItems = [
    {
      id: "1",
      title: "LSPS Annual Legal Writing Workshop",
      date: "Posted on June 5, 2023",
      description: "Join us for our annual legal writing workshop designed to enhance your legal writing skills. Expert speakers from leading law firms will be in attendance.",
      type: "event" as const,
      eventDate: "July 20, 2023",
      location: "Faculty of Law Auditorium",
      imageSrc: myImages.image3
    },
    {
      id: "3",
      title: "National Moot Court Competition",
      date: "Posted on May 15, 2023",
      description: "LSPS is proud to be a media partner for the upcoming National Moot Court Competition. Coverage will be provided throughout the event.",
      type: "event" as const,
      eventDate: "August 5-7, 2023",
      location: "Supreme Court Complex, Abuja",
      imageSrc: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
  ];

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const articlesQuery = query(
          collection(db, 'publications'),
          where('status', '==', 'Published'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        
        const querySnapshot = await getDocs(articlesQuery);
        const firestoreArticles = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled",
            excerpt: data.content?.substring(0, 150) + "..." || "No content available",
            date: data.date || new Date().toISOString().split('T')[0],
            author: data.author || "Unknown",
            category: data.category || "Uncategorized",
            imageSrc: data.imageUrl || "https://via.placeholder.com/640x360"
          } as Article;
        });
        
        setFeaturedFirebaseArticles(firestoreArticles);
        console.log("Firebase featured articles loaded:", firestoreArticles.length);

        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('status', 'Published')
          .order('created_at', { ascending: false })
          .limit(3);
          
        if (error) throw error;
        
        if (data) {
          const supabaseArticles = data.map(item => ({
            id: item.id,
            title: item.title || "Untitled",
            excerpt: item.excerpt || item.content?.substring(0, 150) + "..." || "No content available",
            date: item.published_date || new Date().toISOString().split('T')[0],
            author: item.author || "Unknown",
            category: item.category || "Uncategorized",
            imageSrc: item.image_url || "https://via.placeholder.com/640x360"
          })) as Article[];
          
          setFeaturedSupabaseArticles(supabaseArticles);
          console.log("Supabase featured articles loaded:", supabaseArticles.length);
        }

        const newsQuery = query(
          collection(db, 'newsEvents'),
          where('status', '==', 'Published'),
          where('type', '==', 'news'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        
        const newsSnapshot = await getDocs(newsQuery);
        const firestoreNewsItems = newsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled",
            description: data.summary || "No description available",
            date: `Posted on ${data.date || new Date().toISOString().split('T')[0]}`,
            type: "news",
            imageSrc: data.imageSrc || "https://via.placeholder.com/640x360"
          } as NewsEvent;
        });
        
        setFirebaseNewsItems(firestoreNewsItems);
        console.log("Firebase news items loaded:", firestoreNewsItems.length);

        const eventsQuery = query(
          collection(db, 'newsEvents'),
          where('status', '==', 'Published'),
          where('type', '==', 'event'),
          orderBy('eventDate', 'asc'),
          limit(3)
        );
        
        const eventsSnapshot = await getDocs(eventsQuery);
        const firestoreEventItems = eventsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled",
            description: data.summary || "No description available",
            date: `Posted on ${data.date || new Date().toISOString().split('T')[0]}`,
            type: "event",
            eventDate: data.eventDate,
            location: data.location,
            imageSrc: data.imageSrc || "https://via.placeholder.com/640x360"
          } as NewsEvent;
        });
        
        setFirebaseEventItems(firestoreEventItems);
        console.log("Firebase event items loaded:", firestoreEventItems.length);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const combinedFeaturedArticles = featuredFirebaseArticles.length > 0 || featuredSupabaseArticles.length > 0 
    ? [...featuredFirebaseArticles, ...featuredSupabaseArticles].slice(0, 6) 
    : staticFeaturedArticles;

  const displayedNewsItems = firebaseNewsItems.length > 0 
    ? firebaseNewsItems 
    : staticNewsItems;

  const displayedEventItems = firebaseEventItems.length > 0 
    ? firebaseEventItems 
    : staticEventItems;

  return (
    <div className="min-h-screen">
      <Navbar />

      <Hero
        title="The Voice of Law Students"
        subtitle="Promoting legal journalism, fostering intellectual discourse, and nurturing the next generation of legal writers."
        ctaText="Explore Publications"
        ctaLink="/publications"
        imageUrl="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      />

      <section className="py-20 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-law-DEFAULT mb-6">Welcome to LSPS</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The Law Students' Press Society (LSPS) is the official media body of the Faculty of Law, University of Ilorin. We are dedicated to promoting legal journalism, fostering intellectual discourse, and nurturing the next generation of legal writers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-subtle hover:shadow-glass transition-all duration-300 text-center group animate-fade-up">
              <div className="w-16 h-16 bg-law-muted rounded-full flex items-center justify-center mx-auto mb-6 text-law-DEFAULT group-hover:bg-law-accent/10 transition-colors duration-300">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-law-DEFAULT mb-4">Publications</h3>
              <p className="text-law-text-light mb-6">
                Discover thought-provoking articles, case analyses, and legal opinions written by law students.
              </p>
              <Button
                variant="ghost"
                className="text-law-DEFAULT hover:text-white transition-colors"
                onClick={() => navigate('/publications')}
              >
                Explore Publications
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-subtle hover:shadow-glass transition-all duration-300 text-center group animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-law-muted rounded-full flex items-center justify-center mx-auto mb-6 text-law-DEFAULT group-hover:bg-law-accent/10 transition-colors duration-300">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-law-DEFAULT mb-4">Membership</h3>
              <p className="text-law-text-light mb-6">
                Join our community of aspiring legal journalists and writers to develop your skills and network.
              </p>
              <Button
                variant="ghost"
                className="text-law-DEFAULT hover:text-white transition-colors"
                onClick={() => navigate('/about')}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-subtle hover:shadow-glass transition-all duration-300 text-center group animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-law-muted rounded-full flex items-center justify-center mx-auto mb-6 text-law-DEFAULT group-hover:bg-law-accent/10 transition-colors duration-300">
                <Calendar className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-law-DEFAULT mb-4">Events</h3>
              <p className="text-law-text-light mb-6">
                Participate in workshops, seminars, and conferences organized by LSPS throughout the academic year.
              </p>
              <Button
                variant="ghost"
                className="text-law-DEFAULT hover:text-white transition-colors"
                onClick={() => navigate('/news')}
              >
                View Events
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="container mx-auto py-10 px-6">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-80 w-full" />
            </div>
          </div>
        </div>
      ) : (
        <FeaturedArticles articles={combinedFeaturedArticles} />
      )}

      {isLoading ? (
        <div className="container mx-auto py-10 px-6 bg-law-muted">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64 bg-white/50" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-72 w-full bg-white/50" />
              <Skeleton className="h-72 w-full bg-white/50" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <NewsSection items={displayedNewsItems} />
          <EventsSection items={displayedEventItems} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
