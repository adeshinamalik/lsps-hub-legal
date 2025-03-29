
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/CommentSection";
import { ArrowLeft, Calendar, User, ExternalLink, FileText, Download } from "lucide-react";
import { fetchResourceById } from "@/firebase/firebaseService";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Mock resources data as fallback
const staticResources = [
  {
    id: "1",
    title: "Nigerian Constitution (1999) - Annotated Version",
    description: "A comprehensive annotated version of the 1999 Nigerian Constitution with case references and scholarly commentary.",
    type: "document",
    url: "https://example.com/resources/nigerian-constitution.pdf",
    fileSize: "4.2 MB",
    category: "Constitutional Law",
    date: "January 15, 2023",
    content: `
      <p>The 1999 Constitution of the Federal Republic of Nigeria is the supreme law of Nigeria. This annotated version includes:</p>
      
      <ul>
        <li>Full text of the Constitution</li>
        <li>Case references for major constitutional provisions</li>
        <li>Commentary from leading constitutional law scholars</li>
        <li>Historical context for key sections</li>
        <li>Amendments through 2022</li>
      </ul>
      
      <p>This document is an essential resource for all law students, particularly those studying Constitutional Law. The annotations provide valuable insights into judicial interpretations and academic perspectives on various constitutional provisions.</p>
      
      <h2>How to Use This Resource</h2>
      <p>This annotated constitution is organized by chapters and sections, following the structure of the official document. Each section is accompanied by relevant case law, scholarly commentary, and cross-references to related provisions.</p>
      
      <p>For optimal use, we recommend downloading the PDF and using a PDF reader that allows for easy navigation through bookmarks and search functionality.</p>
      
      <h2>Citation Guide</h2>
      <p>When citing this resource in your academic work, please use the following format:</p>
      <blockquote>
        Law Students' Press Society, "Nigerian Constitution (1999) - Annotated Version" (University of Ilorin, 2023).
      </blockquote>
      
      <p>This resource is made available for educational purposes only. While every effort has been made to ensure accuracy, users should verify information with original sources when using it for official or academic purposes.</p>
    `,
    imageSrc: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  // Additional resources would be here
];

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchResourceData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // Try to fetch from Firebase
        const firebaseResource = await fetchResourceById(id);
        
        if (firebaseResource) {
          setResource(firebaseResource);
        } else {
          // If not found in Firebase, check static data
          const staticResource = staticResources.find(r => r.id === id);
          
          if (staticResource) {
            setResource(staticResource);
          } else {
            toast.error("Resource not found");
          }
        }
      } catch (error) {
        console.error("Error fetching resource:", error);
        toast.error("Failed to load resource details");
        
        // Fallback to static data
        const staticResource = staticResources.find(r => r.id === id);
        if (staticResource) {
          setResource(staticResource);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResourceData();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
          <div className="container mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6 text-law-DEFAULT hover:text-law-accent pl-0"
              onClick={() => navigate('/resources')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
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
  
  // If no resource is found, show a message and a button to go back
  if (!resource) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 md:px-10 lg:px-20 py-32 text-center">
          <h1 className="text-3xl font-bold text-law-DEFAULT mb-6">Resource Not Found</h1>
          <p className="text-law-text-light mb-8">The resource you are looking for does not exist or has been removed.</p>
          <Button 
            variant="outline" 
            className="border-law-DEFAULT text-law-DEFAULT hover:bg-law-DEFAULT hover:text-white"
            onClick={() => navigate('/resources')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
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
            className="mb-6 text-law-DEFAULT hover:text-law-accent pl-0"
            onClick={() => navigate('/resources')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-block bg-law-DEFAULT/10 text-law-DEFAULT px-3 py-1 rounded-full text-sm font-medium">
                {resource.category}
              </span>
              <span className="inline-block bg-law-DEFAULT/10 text-law-DEFAULT px-3 py-1 rounded-full text-sm font-medium capitalize">
                {resource.type}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-law-DEFAULT mb-6">{resource.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-law-text-light mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{resource.date}</span>
              </div>
              
              {resource.fileSize && (
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>{resource.fileSize}</span>
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
                src={resource.imageSrc || resource.imageUrl} 
                alt={resource.title} 
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Resource+Image+Not+Found";
                }}
              />
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-law-DEFAULT mb-4">Description</h2>
              <p className="text-law-text-light leading-relaxed mb-6">{resource.description}</p>
              
              {resource.content && (
                <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: resource.content }} />
              )}
            </div>
            
            <div className="mb-12 flex flex-wrap gap-4">
              {resource.url && (
                <Button 
                  size="lg"
                  className="bg-law-DEFAULT hover:bg-law-light text-white"
                  onClick={() => window.open(resource.url, '_blank')}
                >
                  {resource.type === 'document' ? (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Download Resource
                    </>
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Access Resource
                    </>
                  )}
                </Button>
              )}
            </div>
            
            {/* Comment Section */}
            <CommentSection itemId={id || ""} itemType="resource" />
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default ResourceDetail;
