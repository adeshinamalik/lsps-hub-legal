
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, Calendar, FileText } from "lucide-react";
import CommentSection from "@/components/CommentSection";

const Magazine = () => {
  // Sample magazine issues
  const magazineIssues = [
    {
      id: "1",
      title: "LSS Press Magazine - Volume 5, Issue 1",
      description: "Constitutional Law Reform: Analysis of Recent Amendments and Their Impact on Nigerian Jurisprudence",
      publishDate: "March 2024",
      pages: 48,
      downloadUrl: "#", // Would be actual PDF URL
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
      featured: true
    },
    {
      id: "2",
      title: "LSS Press Magazine - Volume 4, Issue 6",
      description: "International Trade Law: Nigeria's Position in Global Commerce and Legal Frameworks",
      publishDate: "February 2024", 
      pages: 42,
      downloadUrl: "#",
      coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      featured: false
    },
    {
      id: "3",
      title: "LSS Press Magazine - Volume 4, Issue 5",
      description: "Human Rights in the Digital Age: Privacy, Data Protection, and Emerging Legal Challenges",
      publishDate: "January 2024",
      pages: 52,
      downloadUrl: "#",
      coverImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      featured: false
    },
    {
      id: "4",
      title: "LSS Press Magazine - Volume 4, Issue 4",
      description: "Environmental Law and Climate Justice: Legal Responses to Environmental Challenges in Nigeria",
      publishDate: "December 2023",
      pages: 38,
      downloadUrl: "#",
      coverImage: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      featured: false
    },
    {
      id: "5",
      title: "LSS Press Magazine - Volume 4, Issue 3",
      description: "Corporate Law Revolution: New Regulations and Their Impact on Business Operations",
      publishDate: "November 2023",
      pages: 44,
      downloadUrl: "#",
      coverImage: "https://images.unsplash.com/photo-1591291621164-2c6367723315?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
      featured: false
    },
    {
      id: "6",
      title: "LSS Press Magazine - Volume 4, Issue 2",
      description: "Criminal Justice Reform: Analyzing Recent Changes in Nigeria's Criminal Justice System",
      publishDate: "October 2023",
      pages: 40,
      downloadUrl: "#",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      featured: false
    }
  ];

  const featuredIssue = magazineIssues.find(issue => issue.featured);
  const regularIssues = magazineIssues.filter(issue => !issue.featured);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-law-DEFAULT mb-6">LSS Press Magazine</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Access our comprehensive legal magazine featuring in-depth analysis, research articles, and scholarly contributions from law students and legal professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Issue */}
      {featuredIssue && (
        <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-law-DEFAULT mb-12 text-center">Featured Issue</h2>
            
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden border-none shadow-glass bg-gradient-to-r from-law-muted to-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="relative h-96 lg:h-full overflow-hidden">
                    <img
                      src={featuredIssue.coverImage}
                      alt={featuredIssue.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-law-DEFAULT text-white px-3 py-1 text-sm font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="mr-4">{featuredIssue.publishDate}</span>
                      <FileText className="h-4 w-4 mr-2" />
                      <span>{featuredIssue.pages} pages</span>
                    </div>
                    <h3 className="text-2xl font-bold text-law-DEFAULT mb-4">{featuredIssue.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{featuredIssue.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-law-DEFAULT hover:bg-law-light text-white flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Issue
                      </Button>
                      <Button variant="outline" className="border-law-DEFAULT text-law-DEFAULT hover:bg-law-DEFAULT hover:text-white flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* All Issues */}
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-law-DEFAULT mb-12 text-center">All Issues</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {magazineIssues.map((issue, index) => (
              <Card key={issue.id} className="overflow-hidden border-none shadow-subtle hover:shadow-glass transition-all duration-300 animate-fade-up h-full flex flex-col" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={issue.coverImage}
                    alt={issue.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {issue.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-law-DEFAULT text-white px-3 py-1 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{issue.publishDate}</span>
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{issue.pages} pages</span>
                  </div>
                  <h3 className="text-lg font-bold text-law-DEFAULT mb-3 line-clamp-2">{issue.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{issue.description}</p>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="flex-1 border-law-DEFAULT text-law-DEFAULT hover:bg-law-DEFAULT hover:text-white">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1 bg-law-DEFAULT hover:bg-law-light text-white">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <CommentSection itemId="magazine-page" itemType="publication" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Magazine;
