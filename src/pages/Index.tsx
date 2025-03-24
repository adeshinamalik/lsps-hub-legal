
import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";
import NewsHighlights from "@/components/NewsHighlights";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Calendar, ArrowRight } from "lucide-react";
import { myImages } from "@/images";

const Index = () => {
  const navigate = useNavigate();

  // Mock data for featured articles
  const featuredArticles = [
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

  // Mock data for news and events
  const newsEvents = [
    {
      id: "1",
      title: "LSPS Annual Legal Writing Workshop",
      date: "Posted on June 5, 2023",
      description: "Join us for our annual legal writing workshop designed to enhance your legal writing skills. Expert speakers from leading law firms will be in attendance.",
      type: "event" as const,
      eventDate: "July 20, 2023",
      location: "Faculty of Law Auditorium",
      imageSrc: myImages.image3},
    {
      id: "2",
      title: "LSPS Welcomes New Editorial Board",
      date: "May 28, 2023",
      description: "The Law Students' Press Society is pleased to announce the appointment of a new editorial board for the 2023/2024 academic session.",
      type: "news" as const,
      imageSrc: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
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
                className="text-law-DEFAULT group-hover:text-law-accent transition-colors"
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
                className="text-law-DEFAULT group-hover:text-law-accent transition-colors"
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
                className="text-law-DEFAULT group-hover:text-law-accent transition-colors"
                onClick={() => navigate('/news')}
              >
                View Events
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedArticles articles={featuredArticles} />
      
      <NewsHighlights items={newsEvents} />
      
      <Footer />
    </div>
  );
};

export default Index;
