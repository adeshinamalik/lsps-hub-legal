import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  BookOpen, 
  Bookmark, 
  ExternalLink,
  Link as LinkIcon,
  Video,
  Book
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import CommentSection from "@/components/CommentSection";

// Mock data for resources
const resources = [
  {
    id: "1",
    title: "Legal Research Methodology Guide",
    type: "pdf",
    category: "Research Guides",
    description: "A comprehensive guide to conducting effective legal research for academic papers and case analyses.",
    downloadUrl: "#",
    size: "2.4 MB",
    date: "June 15, 2023",
  },
  {
    id: "2",
    title: "Case Brief Template",
    type: "docx",
    category: "Templates",
    description: "Standard template for preparing case briefs with sections for facts, issues, holding, and reasoning.",
    downloadUrl: "#",
    size: "148 KB",
    date: "May 22, 2023",
  },
  {
    id: "3",
    title: "Nigerian Constitutional Law: Key Cases",
    type: "pdf",
    category: "Case Summaries",
    description: "Collection of summaries of landmark constitutional law cases in Nigeria with analysis and implications.",
    downloadUrl: "#",
    size: "5.1 MB",
    date: "April 10, 2023",
  },
  {
    id: "4",
    title: "Legal Citation Guide (NALT Format)",
    type: "pdf",
    category: "Style Guides",
    description: "Comprehensive guide to Nigerian Association of Law Teachers citation format for academic papers.",
    downloadUrl: "#",
    size: "1.7 MB",
    date: "March 5, 2023",
  },
  {
    id: "5",
    title: "Moot Court Competition Preparation Kit",
    type: "zip",
    category: "Competitions",
    description: "Resources for preparing for moot court competitions, including rules, sample arguments, and judging criteria.",
    downloadUrl: "#",
    size: "8.3 MB",
    date: "February 18, 2023",
  },
  {
    id: "6",
    title: "Legal Writing Workshop Materials",
    type: "pdf",
    category: "Workshop Materials",
    description: "Presentation slides and handouts from our legal writing workshop series.",
    downloadUrl: "#",
    size: "3.2 MB",
    date: "January 25, 2023",
  },
];

// External legal resources
const externalResources = [
  {
    title: "Nigerian Law Reports Online",
    url: "https://nigerialawreports.org",
    description: "Access to Nigerian court judgments and legal opinions.",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Legal Information Institute",
    url: "https://www.law.cornell.edu",
    description: "Free access to primary legal materials from around the world.",
    icon: <LinkIcon className="h-5 w-5" />,
  },
  {
    title: "Nigerian Bar Association",
    url: "https://nigerianbar.org.ng",
    description: "Resources and updates from the Nigerian Bar Association.",
    icon: <Bookmark className="h-5 w-5" />,
  },
  {
    title: "Laws of the Federation of Nigeria",
    url: "https://lawnigeria.com",
    description: "Comprehensive database of Nigerian laws and statutes.",
    icon: <Book className="h-5 w-5" />,
  },
];

// Video tutorials
const videoTutorials = [
  {
    id: "1",
    title: "How to Draft a Legal Memorandum",
    duration: "32:15",
    instructor: "Prof. Adesina Johnson",
    thumbnail: "https://images.unsplash.com/photo-1589394723503-75c1153d089d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "2",
    title: "Legal Research Techniques for Students",
    duration: "45:22",
    instructor: "Dr. Fatima Ahmed",
    thumbnail: "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "3",
    title: "Understanding Legal Citations",
    duration: "28:45",
    instructor: "Dr. Samuel Okafor",
    thumbnail: "https://images.unsplash.com/photo-1423592707957-3b212afa6733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
  },
];

// Categories for filtering
const categories = [
  "All Categories",
  "Research Guides",
  "Templates",
  "Case Summaries",
  "Style Guides",
  "Competitions",
  "Workshop Materials"
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  // Filter resources based on search query and selected category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (resource: typeof resources[0]) => {
    // In a real app, this would initiate the download
    toast.success(`Downloading ${resource.title}`);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="text-red-500" />;
      case 'docx':
        return <FileText className="text-blue-500" />;
      case 'zip':
        return <FileText className="text-purple-500" />;
      default:
        return <FileText className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-law-DEFAULT mb-6">Legal Resources</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Access our collection of templates, guides, case summaries, and other resources to support your legal studies and research.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <Tabs defaultValue="downloads" className="w-full mb-16">
            <TabsList className="w-full max-w-md mx-auto mb-12">
              <TabsTrigger value="downloads" className="flex-1">Downloadable Resources</TabsTrigger>
              <TabsTrigger value="external" className="flex-1">External Resources</TabsTrigger>
              <TabsTrigger value="videos" className="flex-1">Video Tutorials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="downloads">
              <div className="mb-12">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search resources..."
                      className="pl-10 bg-white border-gray-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant="outline"
                        className={cn(
                          "rounded-full border border-gray-200 bg-white",
                          selectedCategory === category && "bg-law-DEFAULT text-white border-law-DEFAULT hover:bg-law-light"
                        )}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="text-gray-600 mb-8">
                  Showing {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"}
                  {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
                  {searchQuery && ` for "${searchQuery}"`}
                </div>
              </div>
              
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource, index) => (
                    <Card 
                      key={resource.id}
                      className="border-none shadow-subtle hover:shadow-glass transition-all duration-200 animate-fade-up"
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both',
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getFileIcon(resource.type)}
                            <span className="text-xs font-medium uppercase text-gray-500">{resource.type}</span>
                          </div>
                          <span className="text-xs text-gray-500">{resource.date}</span>
                        </div>
                        <CardTitle className="text-law-DEFAULT mt-2">{resource.title}</CardTitle>
                        <CardDescription>{resource.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-law-text-light">{resource.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">{resource.size}</div>
                        <Button 
                          className="gap-2 bg-law-DEFAULT hover:bg-law-light"
                          onClick={() => handleDownload(resource)}
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-bold text-law-DEFAULT mb-3">No resources found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all categories</p>
                  <Button 
                    variant="outline" 
                    className="border-law-DEFAULT text-law-DEFAULT hover:bg-law-DEFAULT hover:text-white"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All Categories");
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="external">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {externalResources.map((resource, index) => (
                    <a 
                      key={index} 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group animate-fade-up"
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both',
                      }}
                    >
                      <Card className="h-full hover:shadow-glass transition-all duration-200 border-none shadow-subtle group-hover:border-law-accent/20">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-full bg-law-DEFAULT/10 flex items-center justify-center text-law-DEFAULT">
                              {resource.icon}
                            </div>
                            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-law-DEFAULT transition-colors" />
                          </div>
                          <CardTitle className="text-law-DEFAULT mt-2 group-hover:text-law-accent transition-colors">
                            {resource.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-law-text-light">{resource.description}</p>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="videos">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoTutorials.map((video, index) => (
                    <Card 
                      key={video.id}
                      className="overflow-hidden border-none shadow-subtle hover:shadow-glass transition-all duration-200 animate-fade-up cursor-pointer"
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both',
                      }}
                      onClick={() => toast.info("Video player would open here")}
                    >
                      <div className="relative h-48">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
                          <div className="rounded-full bg-white/20 backdrop-blur-sm p-4">
                            <Video className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-law-DEFAULT text-lg">{video.title}</CardTitle>
                        <CardDescription>{video.instructor}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto mt-8">
          <CommentSection itemId="resources-page" itemType="publication" />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;
