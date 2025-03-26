
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";





////////////////////////////////////////////////////////////////////
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { myImages } from "@/images";

export const fetchArticles = async () => {
  const querySnapshot = await getDocs(collection(db, 'articles'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
////////////////////////////////////////////////////////////////////






// Mock data for articles
const allArticles = [
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
    imageSrc: myImages.image4
  },
  {
    id: "4",
    title: "The Role of International Law in Addressing Climate Change",
    excerpt: "This article examines the international legal framework for climate change mitigation and adaptation, including key treaties, enforcement mechanisms, and emerging legal doctrines.",
    date: "February 28, 2023",
    author: "Fatima Ahmed",
    category: "International Law",
    imageSrc: "https://images.unsplash.com/photo-1534269222346-5a896154c41d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "5",
    title: "Criminal Justice Reform in Nigeria: Challenges and Prospects",
    excerpt: "A critical assessment of recent criminal justice reforms in Nigeria, focusing on the Administration of Criminal Justice Act and its implementation across different states.",
    date: "January 17, 2023",
    author: "Emmanuel Okocha",
    category: "Criminal Law",
    imageSrc: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "6",
    title: "Intellectual Property Rights in the Digital Age: Implications for Nigerian Creators",
    excerpt: "This article discusses the challenges of protecting intellectual property rights in the digital era, with a focus on copyright, patents, and trademarks in Nigeria.",
    date: "December 5, 2022",
    author: "Victoria Nwankwo",
    category: "Intellectual Property",
    imageSrc: myImages.image5
  },
];

// Categories for filtering
const categories = [
  "All Categories",
  "Constitutional Law",
  "Human Rights",
  "Legal Technology",
  "International Law",
  "Criminal Law",
  "Intellectual Property"
];

const Publications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  // Filter articles based on search query and selected category
  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All Categories" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  
  // Calculate pagination values
  const totalItems = filteredArticles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-law-DEFAULT mb-6">Publications & Articles</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore our collection of articles, case analyses, and legal opinions written by law students and faculty members.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 bg-white border-gray-200"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant="outline"
                    className={cn(
                      "rounded-full border border-gray-200 bg-white",
                      selectedCategory === category && "bg-law-light text-white border-law-DEFAULT hover:bg-law-light text-white"
                    )}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1); // Reset to first page on category change
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-gray-600">
              Showing {paginatedArticles.length} {paginatedArticles.length === 1 ? "result" : "results"}
              {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
              {searchQuery && ` for "${searchQuery}"`}
              {totalItems > itemsPerPage && ` (page ${currentPage} of ${totalPages})`}
            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedArticles.map((article, index) => (
                <Card
                  key={article.id}
                  className="overflow-hidden border-none bg-white shadow-subtle transition-all duration-300 hover:shadow-glass h-full flex flex-col animate-fade-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={article.imageSrc}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-white/90 backdrop-blur-xs px-3 py-1 text-xs font-medium text-law-DEFAULT rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-3 text-law-text-light text-sm mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1.5" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-law-DEFAULT mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-law-text-light mb-6 line-clamp-3 flex-grow">{article.excerpt}</p>
                    <Button
                      variant="ghost"
                      className="text-law-DEFAULT hover:text-white justify-start pl-2 w-fit group"
                      onClick={() => navigate(`/publications/${article.id}`)}
                    >
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-law-DEFAULT mb-3">No articles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all categories.</p>
              <Button
                variant="outline"
                className="border-law-DEFAULT text-law-DEFAULT hover:bg-law-DEFAULT hover:text-white"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setCurrentPage(1);
                }}
              >
                Reset filters
              </Button>
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
                  // Show current page, first page, last page, and pages adjacent to current page
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
                  
                  // Show ellipsis for page gaps
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

export default Publications;

