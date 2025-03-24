
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const NewsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock news data
  const newsItems = [
    {
      id: "1",
      title: "LSPS Announces New Editorial Board",
      date: "May 15, 2023",
      description: "The Law Students' Press Society is pleased to announce the appointment of its new editorial board for the 2023/2024 academic session. The new board, led by Daniel Ehigiator as Editor-in-Chief, will oversee all publications and media activities of the society.",
      imageSrc: "public/lovable-uploads/f67f9f3d-612f-46cc-ab7e-1fab15f564e8.png",
      category: "Announcements"
    },
    {
      id: "2",
      title: "New Journal Publication Released",
      date: "May 5, 2023",
      description: "The latest edition of the LSPS Journal of Law has been released, featuring articles on constitutional reforms, human rights law, and environmental justice. The journal is available at the Faculty of Law Library and can also be accessed online through the LSPS website.",
      imageSrc: "https://images.unsplash.com/photo-1585241936939-be4099591252?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Publications"
    },
    {
      id: "3",
      title: "Partnership with Law Firm Announced",
      date: "April 28, 2023",
      description: "The LSPS has entered into a partnership with one of Nigeria's leading law firms, providing students with internship opportunities, mentorship programs, and financial support for the society's activities.",
      imageSrc: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      category: "Partnerships"
    },
    {
      id: "4",
      title: "LSPS Members Win National Essay Competition",
      date: "April 10, 2023",
      description: "Three members of the Law Students' Press Society have emerged as winners in the National Law Students Essay Competition organized by the Nigerian Bar Association. The competition saw participation from over 50 universities across Nigeria.",
      imageSrc: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Achievements"
    },
    {
      id: "5",
      title: "LSPS Launches New Website",
      date: "March 15, 2023",
      description: "The Law Students' Press Society has launched its new website, providing a platform for showcasing student publications, announcing events, and facilitating membership applications. The website also features a resource section for law students.",
      imageSrc: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Announcements"
    },
    {
      id: "6",
      title: "Faculty Approves LSPS Proposed Curriculum Additions",
      date: "February 20, 2023",
      description: "The Faculty of Law has approved the LSPS-proposed additions to the curriculum, which include practical legal writing workshops and media law electives. These additions will be implemented from the next academic session.",
      imageSrc: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Academic"
    }
  ];

  const filteredNews = newsItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero 
        title="Latest News from LSPS"
        subtitle="Stay informed about our achievements, announcements, and activities."
        ctaText="Subscribe to Updates"
        ctaLink="/contact"
        imageUrl="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      />
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-law-DEFAULT mb-6">News & Announcements</h2>
            <p className="text-lg text-gray-600">
              Stay updated with the latest news, announcements, and achievements from the Law Students' Press Society at University of Ilorin.
            </p>
            
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search news..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.length > 0 ? (
              filteredNews.map((item, index) => (
                <Card 
                  key={item.id}
                  className="overflow-hidden border-none bg-white shadow-subtle transition-all duration-300 hover:shadow-glass animate-fade-up"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-law-DEFAULT/10 text-law-DEFAULT">
                        {item.category}
                      </span>
                      <span className="ml-3 text-sm text-law-text-light">{item.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-law-DEFAULT mb-4">{item.title}</h3>
                    <p className="text-law-text-light mb-6 line-clamp-3">{item.description}</p>
                    
                    <Button 
                      variant="ghost" 
                      className="text-law-DEFAULT hover:text-law-accent justify-start pl-0 w-fit group"
                      onClick={() => navigate(`/news/${item.id}`)}
                    >
                      Read Full Story
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-500">No news items found matching your search.</h3>
                <p className="mt-2 text-gray-400">Try adjusting your search terms or browse all news.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchTerm("")}
                >
                  View All News
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NewsPage;
