import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Grid2X2, 
  Image as ImageIcon, 
  FileArchive, 
  FileVideo, 
  Search, 
  X 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { fetchGalleryItems, GalleryItem as FirebaseGalleryItem } from "@/firebase/firebaseService";
import { useToast } from "@/components/ui/use-toast";

// Categories for filtering
const categories = [
  "All Categories",
  "Events",
  "Competitions",
  "Meetings",
  "Community",
  "Lectures",
  "Social",
  "Workshops",
  "Training"
];

// Interface for our gallery items with type
interface GalleryItem extends FirebaseGalleryItem {
  type: 'image' | 'video' | 'document';
}

const Gallery = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGalleryItems = async () => {
      try {
        const fetchedItems = await fetchGalleryItems();
        // Convert to GalleryItem with type property
        const items: GalleryItem[] = fetchedItems.map(item => ({
          ...item,
          type: determineFileType(item.imageSrc)
        }));
        
        setGalleryItems(items);
      } catch (error) {
        console.error("Error loading gallery items:", error);
        toast({
          title: "Error",
          description: "Failed to load gallery items. Using fallback data.",
          variant: "destructive",
        });
        // If there's an error, we'll use the mock data
        setGalleryItems(fallbackGalleryItems);
      } finally {
        setLoading(false);
      }
    };

    loadGalleryItems();
  }, [toast]);

  // Function to determine file type based on URL
  const determineFileType = (url: string): 'image' | 'video' | 'document' => {
    const lowercaseUrl = url.toLowerCase();
    if (lowercaseUrl.match(/\.(mp4|mov|wmv|avi|flv)$/)) {
      return 'video';
    } else if (lowercaseUrl.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/)) {
      return 'document';
    } else {
      return 'image';
    }
  };

  // Filter items based on search query, tab, and category
  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesTab = selectedTab === "all" || item.type === selectedTab;
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    
    return matchesSearch && matchesTab && matchesCategory;
  });

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-5 w-5" />;
      case 'video':
        return <FileVideo className="h-5 w-5" />;
      case 'document':
        return <FileArchive className="h-5 w-5" />;
      default:
        return <Grid2X2 className="h-5 w-5" />;
    }
  };

  // Fallback gallery items to use if Firebase fetch fails
  const fallbackGalleryItems: GalleryItem[] = [
    {
      id: "1",
      title: "Annual Law Conference 2023",
      type: "image",
      imageSrc: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "May 15, 2023",
      category: "Events",
    },
    {
      id: "2",
      title: "Moot Court Competition",
      type: "image",
      imageSrc: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      date: "April 22, 2023",
      category: "Competitions",
    },
    {
      id: "3",
      title: "Law Review Editorial Meeting",
      type: "image",
      imageSrc: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "March 10, 2023",
      category: "Meetings",
    },
    {
      id: "4",
      title: "Legal Aid Clinic Outreach",
      type: "image",
      imageSrc: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "February 28, 2023",
      category: "Community",
    },
    {
      id: "5",
      title: "Guest Lecture: Supreme Court Justice",
      type: "video",
      imageSrc: "https://images.unsplash.com/photo-1557425493-6f90ae4659fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "January 17, 2023",
      category: "Lectures",
    },
    {
      id: "6",
      title: "Law Students' Association Dinner",
      type: "image",
      imageSrc: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "December 5, 2022",
      category: "Social",
    },
    {
      id: "7",
      title: "Law Students' Publication Workshop",
      type: "document",
      imageSrc: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "November 12, 2022",
      category: "Workshops",
    },
    {
      id: "8",
      title: "Mock Trial Preparation",
      type: "image",
      imageSrc: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "October 8, 2022",
      category: "Training",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-law-DEFAULT mb-6">Media Gallery</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore photos, videos, and documents from our events, competitions, lectures, and more.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search gallery..."
                  className="pl-10 bg-white border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Media</TabsTrigger>
                <TabsTrigger value="image">Images</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
                <TabsTrigger value="document">Documents</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map(category => (
                <Button
                  key={category}
                  variant="outline"
                  className={cn(
                    "rounded-full border border-gray-200 bg-white",
                    selectedCategory === category && "bg-law-light text-white border-law-DEFAULT hover:bg-law-light"
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="text-gray-600 mb-6">
              Showing {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
              {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-law-DEFAULT mx-auto mb-4"></div>
              <p className="text-gray-600">Loading gallery items...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer animate-fade-up"
                  onClick={() => handleItemClick(item)}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <AspectRatio ratio={4/3} className="bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      {getTypeIcon(item.type)}
                    </div>
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 z-10">
                      <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-xs px-2 py-1 text-xs font-medium text-law-DEFAULT">
                        {item.type}
                      </span>
                    </div>
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="font-medium text-law-DEFAULT line-clamp-1">{item.title}</h3>
                    <div className="mt-1 flex items-center justify-between text-sm text-gray-500">
                      <span>{item.date}</span>
                      <span>{item.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg">
              <div className="flex justify-center mb-4">
                <ImageIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-law-DEFAULT mb-2">No media found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all categories</p>
              <Button 
                variant="outline" 
                className="border-law-DEFAULT text-law-DEFAULT hover:bg-law-DEFAULT hover:text-white"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTab("all");
                  setSelectedCategory("All Categories");
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogTitle>{selectedItem?.title}</DialogTitle>
          <DialogDescription className="flex justify-between text-sm">
            <span>{selectedItem?.date}</span>
            <span>{selectedItem?.category}</span>
          </DialogDescription>
          {selectedItem?.description && (
            <p className="text-gray-600 mt-2">{selectedItem.description}</p>
          )}
          <div className="mt-4">
            {selectedItem?.type === 'image' && (
              <img 
                src={selectedItem.imageSrc} 
                alt={selectedItem.title} 
                className="w-full rounded-lg object-cover max-h-[70vh]" 
              />
            )}
            {selectedItem?.type === 'video' && (
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white">
                <FileVideo className="h-16 w-16 opacity-50" />
                <p className="absolute">Video preview not available</p>
              </div>
            )}
            {selectedItem?.type === 'document' && (
              <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                <FileArchive className="h-16 w-16 text-gray-400" />
                <p className="absolute">Document preview not available</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Gallery;
