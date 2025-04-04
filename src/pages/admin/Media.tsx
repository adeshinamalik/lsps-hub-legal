
import { useState, useEffect } from "react";
import {
  Image,
  Plus,
  Search,
  Pencil,
  Trash2,
  FilterX,
  Filter,
  FolderOpen,
  Download,
  FolderPlus,
  FileUp,
  FileImage,
  FileText,
  FileVideo,
  FileAudio
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Expanded dummy data for media items with more diverse file types
const dummyMediaItems = [
  {
    id: "1",
    name: "conference-2023.jpg",
    type: "image",
    size: "1.2 MB",
    uploadedBy: "Admin",
    uploadDate: "2023-05-15",
    url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2784&q=80",
  },
  {
    id: "2",
    name: "moot-court.jpg",
    type: "image",
    size: "850 KB",
    uploadedBy: "Admin",
    uploadDate: "2023-04-20",
    url: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "3",
    name: "annual-report-2023.pdf",
    type: "document",
    size: "2.5 MB",
    uploadedBy: "Admin",
    uploadDate: "2023-06-01",
    url: "",
  },
  {
    id: "4",
    name: "editorial-team.jpg",
    type: "image",
    size: "1.5 MB",
    uploadedBy: "Editor",
    uploadDate: "2023-03-10",
    url: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "5",
    name: "law-journal.pdf",
    type: "document",
    size: "3.2 MB",
    uploadedBy: "Admin",
    uploadDate: "2023-02-15",
    url: "",
  },
  {
    id: "6",
    name: "campus-event.jpg",
    type: "image",
    size: "980 KB",
    uploadedBy: "Writer",
    uploadDate: "2023-05-25",
    url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
  },
  {
    id: "7",
    name: "legal-symposium-opening.mp4",
    type: "video",
    size: "28.5 MB",
    uploadedBy: "Admin",
    uploadDate: "2023-07-12",
    url: "",
  },
  {
    id: "8",
    name: "keynote-speech.mp3",
    type: "audio",
    size: "12.8 MB",
    uploadedBy: "Editor",
    uploadDate: "2023-06-30",
    url: "",
  },
  {
    id: "9",
    name: "legal-research-handbook.pdf",
    type: "document",
    size: "5.4 MB",
    uploadedBy: "Researcher",
    uploadDate: "2023-08-05",
    url: "",
  },
  {
    id: "10",
    name: "seminar-registration.jpg",
    type: "image",
    size: "1.1 MB",
    uploadedBy: "Admin",
    uploadDate: "2023-09-15",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "11",
    name: "mock-trial-guidelines.docx",
    type: "document",
    size: "1.8 MB",
    uploadedBy: "Professor",
    uploadDate: "2023-10-01",
    url: "",
  },
  {
    id: "12",
    name: "faculty-meeting.jpg",
    type: "image",
    size: "1.3 MB",
    uploadedBy: "Dean",
    uploadDate: "2023-09-28",
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
];

const AdminMedia = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [newFolder, setNewFolder] = useState({ name: "" });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [mediaItems, setMediaItems] = useState(dummyMediaItems);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading real data
  useEffect(() => {
    // In a real app, this would fetch media items from your database
    const fetchMedia = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll just use the dummy data
        // In a real app, you would set the data from your API here
        setMediaItems(dummyMediaItems);
      } catch (error) {
        console.error("Error fetching media items:", error);
        toast.error("Failed to load media items");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const filteredItems = mediaItems.filter(
    (item) =>
      (activeTab === "all" ||
        item.type === activeTab) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleUploadFile = () => {
    // In a real app, this would upload the file to a storage service
    if (!uploadFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    // Generate a random ID for the new file
    const newId = Math.floor(Math.random() * 10000).toString();
    
    // Determine file type based on extension
    const fileExtension = uploadFile.name.split('.').pop()?.toLowerCase() || '';
    let fileType = 'document';
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(fileExtension)) {
      fileType = 'image';
    } else if (['mp4', 'mov', 'avi', 'webm'].includes(fileExtension)) {
      fileType = 'video';
    } else if (['mp3', 'wav', 'ogg', 'aac'].includes(fileExtension)) {
      fileType = 'audio';
    }
    
    // Create a new media item
    const newMediaItem = {
      id: newId,
      name: uploadFile.name,
      type: fileType,
      size: `${(uploadFile.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadedBy: 'Current User', // In a real app, this would be the current user
      uploadDate: new Date().toISOString().split('T')[0],
      url: fileType === 'image' ? URL.createObjectURL(uploadFile) : '',
    };
    
    // Add the new item to the media items
    setMediaItems(prevItems => [newMediaItem, ...prevItems]);
    
    toast.success("File uploaded successfully!");
    setIsUploadDialogOpen(false);
    setUploadFile(null);
  };

  const handleCreateFolder = () => {
    // In a real app, this would create a new folder
    if (!newFolder.name.trim()) {
      toast.error("Please enter a folder name");
      return;
    }
    
    // Generate a random ID for the new folder
    const newId = Math.floor(Math.random() * 10000).toString();
    
    // Add the new folder to the beginning of the media items
    setMediaItems(prevItems => [{
      id: newId,
      name: newFolder.name,
      type: 'folder',
      size: '-',
      uploadedBy: 'Current User', // In a real app, this would be the current user
      uploadDate: new Date().toISOString().split('T')[0],
      url: '',
    }, ...prevItems]);
    
    toast.success("Folder created successfully!");
    setIsNewFolderDialogOpen(false);
    setNewFolder({ name: "" });
  };

  const handleDeleteItem = () => {
    // In a real app, this would delete the media item from your storage
    if (!selectedItem) return;
    
    // Filter out the item with the selected ID
    setMediaItems(prevItems => prevItems.filter(item => item.id !== selectedItem));
    
    toast.success("Item deleted successfully!");
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  // Function to render the appropriate icon based on file type
  const renderFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <FileImage className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <FileVideo className="h-5 w-5 text-purple-500" />;
      case 'audio':
        return <FileAudio className="h-5 w-5 text-green-500" />;
      case 'folder':
        return <FolderOpen className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-law-DEFAULT">
            Media Library
          </h1>
          <p className="text-muted-foreground">
            Manage images, documents, and other media files
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsNewFolderDialogOpen(true)}
            className="gap-2"
          >
            <FolderPlus className="h-4 w-4" />
            New Folder
          </Button>
          <Button
            onClick={() => setIsUploadDialogOpen(true)}
            className="gap-2"
          >
            <FileUp className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <TabsList className="grid w-full grid-cols-5 md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>

          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search media..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchTerm("")}
              className="gap-2"
            >
              <FilterX className="h-4 w-4" />
              Clear Filter
            </Button>
          )}
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <Image className="h-12 w-12 mb-2 text-gray-400" />
              <h3 className="mt-2 text-lg font-semibold">No media found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload media files or create folders to organize your content.
              </p>
              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsNewFolderDialogOpen(true)}
                  className="gap-2"
                >
                  <FolderPlus className="h-4 w-4" />
                  New Folder
                </Button>
                <Button
                  onClick={() => setIsUploadDialogOpen(true)}
                  className="gap-2"
                >
                  <FileUp className="h-4 w-4" />
                  Upload File
                </Button>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative cursor-pointer rounded-lg border bg-card p-2 transition-all hover:border-primary"
                >
                  {item.type === "image" ? (
                    <div className="aspect-square overflow-hidden rounded-md">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="h-full w-full object-cover transition-all group-hover:scale-105"
                      />
                    </div>
                  ) : item.type === "video" ? (
                    <div className="flex aspect-square items-center justify-center bg-purple-100 rounded-md">
                      <FileVideo className="h-16 w-16 text-purple-500" />
                    </div>
                  ) : item.type === "audio" ? (
                    <div className="flex aspect-square items-center justify-center bg-green-100 rounded-md">
                      <FileAudio className="h-16 w-16 text-green-500" />
                    </div>
                  ) : item.type === "folder" ? (
                    <div className="flex aspect-square items-center justify-center bg-yellow-100 rounded-md">
                      <FolderOpen className="h-16 w-16 text-yellow-500" />
                    </div>
                  ) : (
                    <div className="flex aspect-square items-center justify-center bg-blue-100 rounded-md">
                      <FileText className="h-16 w-16 text-blue-500" />
                    </div>
                  )}
                  <div className="p-2">
                    <p className="truncate text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(item.size)}
                    </p>
                  </div>
                  <div className="invisible absolute right-2 top-2 flex gap-1 rounded-md bg-background/80 p-1 backdrop-blur transition-all group-hover:visible">
                    {item.type !== "folder" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Rename</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-500"
                      onClick={() => {
                        setSelectedItem(item.id);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-left font-medium">Size</th>
                    <th className="px-4 py-3 text-left font-medium">Uploaded By</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3 font-medium">
                        <div className="flex items-center gap-2">
                          {renderFileIcon(item.type)}
                          {item.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize">{item.type}</td>
                      <td className="px-4 py-3">{item.size}</td>
                      <td className="px-4 py-3">{item.uploadedBy}</td>
                      <td className="px-4 py-3">{item.uploadDate}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          {item.type !== "folder" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-500"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Rename</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => {
                              setSelectedItem(item.id);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* Content for other tabs - Image, Document, Video, Audio */}
        {["image", "document", "video", "audio"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                {tabValue === "image" ? (
                  <FileImage className="h-12 w-12 mb-2 text-gray-400" />
                ) : tabValue === "video" ? (
                  <FileVideo className="h-12 w-12 mb-2 text-gray-400" />
                ) : tabValue === "audio" ? (
                  <FileAudio className="h-12 w-12 mb-2 text-gray-400" />
                ) : (
                  <FileText className="h-12 w-12 mb-2 text-gray-400" />
                )}
                <h3 className="mt-2 text-lg font-semibold">No {tabValue}s found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Upload {tabValue} files to see them here.
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => setIsUploadDialogOpen(true)}
                    className="gap-2"
                  >
                    <FileUp className="h-4 w-4" />
                    Upload {tabValue.charAt(0).toUpperCase() + tabValue.slice(1)}
                  </Button>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative cursor-pointer rounded-lg border bg-card p-2 transition-all hover:border-primary"
                  >
                    {tabValue === "image" ? (
                      <div className="aspect-square overflow-hidden rounded-md">
                        <img
                          src={item.url}
                          alt={item.name}
                          className="h-full w-full object-cover transition-all group-hover:scale-105"
                        />
                      </div>
                    ) : tabValue === "video" ? (
                      <div className="flex aspect-square items-center justify-center bg-purple-100 rounded-md">
                        <FileVideo className="h-16 w-16 text-purple-500" />
                      </div>
                    ) : tabValue === "audio" ? (
                      <div className="flex aspect-square items-center justify-center bg-green-100 rounded-md">
                        <FileAudio className="h-16 w-16 text-green-500" />
                      </div>
                    ) : (
                      <div className="flex aspect-square items-center justify-center bg-blue-100 rounded-md">
                        <FileText className="h-16 w-16 text-blue-500" />
                      </div>
                    )}
                    <div className="p-2">
                      <p className="truncate text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(item.size)}
                      </p>
                    </div>
                    <div className="invisible absolute right-2 top-2 flex gap-1 rounded-md bg-background/80 p-1 backdrop-blur transition-all group-hover:visible">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Rename</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500"
                        onClick={() => {
                          setSelectedItem(item.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Name</th>
                      <th className="px-4 py-3 text-left font-medium">Size</th>
                      <th className="px-4 py-3 text-left font-medium">Uploaded By</th>
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-2">
                            {renderFileIcon(item.type)}
                            {item.name}
                          </div>
                        </td>
                        <td className="px-4 py-3">{item.size}</td>
                        <td className="px-4 py-3">{item.uploadedBy}</td>
                        <td className="px-4 py-3">{item.uploadDate}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-blue-500"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Rename</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => {
                                setSelectedItem(item.id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Upload File Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Upload a new file to the media library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="file-upload">Select File</Label>
            <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 py-5 text-center">
              <FileUp className="h-10 w-10 text-gray-400" />
              <div className="mt-2 flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-blue-600 focus-within:outline-none hover:text-blue-500"
                >
                  <span>Click to upload</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setUploadFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF, PDF up to 10MB
              </p>
            </div>
            {uploadFile && (
              <div className="mt-2 flex items-center gap-2 rounded-md bg-blue-50 p-2 text-blue-700">
                {uploadFile.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <FileImage className="h-4 w-4" />
                ) : uploadFile.name.match(/\.(mp4|mov|avi|webm)$/i) ? (
                  <FileVideo className="h-4 w-4" />
                ) : uploadFile.name.match(/\.(mp3|wav|ogg)$/i) ? (
                  <FileAudio className="h-4 w-4" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                <span className="text-sm">{uploadFile.name}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadFile}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog 
        open={isNewFolderDialogOpen} 
        onOpenChange={setIsNewFolderDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for the new folder.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folder-name" className="text-right">
                Name
              </Label>
              <Input
                id="folder-name"
                className="col-span-3"
                value={newFolder.name}
                onChange={(e) =>
                  setNewFolder({ name: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsNewFolderDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateFolder}>Create Folder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected file from the media library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteItem}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminMedia;
