import { useState, useEffect } from "react"; // Add useEffect for fetching
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { db } from "@/firebase/Firebase"; // Adjust path to your Firebase config
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import { toast } from "sonner"; // For error notifications

interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
  imageSrc: string;
  category: string;
}

// Mock news data - kept as is
const mockNewsItems: NewsItem[] = [
  {
    id: "1",
    title: "LSPS Announces New Editorial Board",
    date: "2023-05-15", // Standardized to YYYY-MM-DD
    description:
      "The Law Students' Press Society is pleased to announce the appointment of its new editorial board for the 2023/2024 academic session.",
    imageSrc: "public/lovable-uploads/f67f9f3d-612f-46cc-ab7e-1fab15f564e8.png",
    category: "Announcements",
  },
  {
    id: "2",
    title: "New Journal Publication Released",
    date: "2023-05-05",
    description:
      "The latest edition of the LSPS Journal of Law has been released, featuring articles on constitutional reforms.",
    imageSrc:
      "https://images.unsplash.com/photo-1585241936939-be4099591252?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Publications",
  },
  {
    id: "3",
    title: "Partnership with Law Firm Announced",
    date: "2023-04-28",
    description:
      "The LSPS has entered into a partnership with one of Nigeria's leading law firms.",
    imageSrc:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
    category: "Partnerships",
  },
  {
    id: "4",
    title: "LSPS Members Win National Essay Competition",
    date: "2023-04-10",
    description:
      "Three members of the Law Students' Press Society have emerged as winners in the National Law Students Essay Competition.",
    imageSrc:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Achievements",
  },
  {
    id: "5",
    title: "LSPS Launches New Website",
    date: "2023-03-15",
    description:
      "The Law Students' Press Society has launched its new website.",
    imageSrc:
      "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Announcements",
  },
  {
    id: "6",
    title: "Faculty Approves LSPS Proposed Curriculum Additions",
    date: "2023-02-20",
    description:
      "The Faculty of Law has approved the LSPS-proposed additions to the curriculum.",
    imageSrc:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Academic",
  },
  {
    id: "7",
    title: "LSPS Hosts Legal Writing Workshop",
    date: "2023-01-30",
    description:
      "The Law Students' Press Society organized a successful legal writing workshop.",
    imageSrc:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Events",
  },
  {
    id: "8",
    title: "LSPS Collaborates with International Law Society",
    date: "2023-01-15",
    description:
      "The LSPS has entered into a collaboration with the International Law Students Association.",
    imageSrc:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Partnerships",
  },
  {
    id: "9",
    title: "LSPS Journal Recognized for Excellence",
    date: "2022-12-20",
    description:
      "The LSPS Journal of Law has been recognized as one of the best student-led legal publications in Nigeria.",
    imageSrc:
      "https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Achievements",
  },
  {
    id: "10",
    title: "End of Year Press Meeting",
    date: "2022-12-10",
    description:
      "The LSPS held its end-of-year press meeting, reviewing the achievements of the past year.",
    imageSrc:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Announcements",
  },
  {
    id: "11",
    title: "LSPS Members Attend National Legal Conference",
    date: "2022-11-25",
    description:
      "A delegation of LSPS members attended the National Conference on Legal Education and Practice.",
    imageSrc:
      "https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Events",
  },
  {
    id: "12",
    title: "LSPS Launches Mentorship Program",
    date: "2022-11-10",
    description:
      "The Law Students' Press Society has launched a mentorship program pairing experienced student journalists with new members.",
    imageSrc:
      "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Announcements",
  },
];

const NewsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [firebaseNews, setFirebaseNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Optional: only for Firebase fetch
  const itemsPerPage = 6;

  // Fetch news from Firebase
  useEffect(() => {
    const fetchFirebaseNews = async () => {
      setIsLoading(true);
      try {
        const newsSnapshot = await getDocs(collection(db, "news"));
        const fetchedNews = newsSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || "Untitled",
          date: doc.data().date || new Date().toISOString().split("T")[0], // Fallback to current date
          description: doc.data().content || "No description available",
          imageSrc: doc.data().imageUrl || "https://via.placeholder.com/640x360", // Fallback image
          category: doc.data().category || "Uncategorized",
        })) as NewsItem[];
        setFirebaseNews(fetchedNews);
      } catch (error: any) {
        console.error("Error fetching news from Firestore:", error);
        toast.error("Failed to load additional news: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFirebaseNews();
  }, []);

  // Combine mock data and Firebase data, then sort by date (newest first)
  const combinedNewsItems = [...mockNewsItems, ...firebaseNews].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Filter combined news based on search term
  const filteredNews = combinedNewsItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination values
  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <Hero
        title="Latest News from LSPS"
        subtitle="Stay informed about our achievements, announcements, and activities."
        ctaText="Subscribe to Updates"
        ctaLink="/contact"
        imageUrl="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
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
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Loading additional news...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedNews.length > 0 ? (
                paginatedNews.map((item, index) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden border-none bg-white shadow-subtle transition-all duration-300 hover:shadow-glass animate-fade-up"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
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
                        className="text-law-DEFAULT hover:text-white justify-start pl-2 w-fit group"
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
                  <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                    View All News
                  </Button>
                </div>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }

                  if (page === 2 && currentPage > 3) {
                    return <PaginationItem key="ellipsis-start">...</PaginationItem>;
                  }

                  if (page === totalPages - 1 && currentPage < totalPages - 2) {
                    return <PaginationItem key="ellipsis-end">...</PaginationItem>;
                  }

                  return null;
                })}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsPage;