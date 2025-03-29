import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Plus,
  Search,
  Pencil,
  Trash2,
  FilterX,
  Filter,
  FileText,
  ImagePlus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/Firebase";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/supabase/supabase";

// Static news items
const newsItemsStatic = [
  { id: "1", title: "LSPS Announces New Editorial Board", type: "News", author: "Admin", date: "2023-05-15", imageUrl: "" },
  { id: "2", title: "Annual Law Students Conference", type: "Event", author: "Admin", date: "2023-06-10", imageUrl: "", location: "Faculty of Law Auditorium", eventDate: "June 10, 2023 | 10:00 AM - 4:00 PM" },
  { id: "3", title: "New Journal Publication Released", type: "News", author: "Admin", date: "2023-05-05", imageUrl: "" },
  { id: "4", title: "Moot Court Competition", type: "Event", author: "Admin", date: "2023-07-12", imageUrl: "", location: "University Moot Court Room", eventDate: "July 12-14, 2023 | 9:00 AM - 5:00 PM daily" },
  { id: "5", title: "Partnership with Law Firm Announced", type: "News", author: "Admin", date: "2023-04-28", imageUrl: "" },
];

const AdminNews = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [newsItems, setNewsItems] = useState(newsItemsStatic);
  const [newItem, setNewItem] = useState({
    title: "",
    type: "News",
    content: "",
    date: "",
    imageUrl: "",
    location: "", // For events
    eventDate: "", // For events, e.g., "October 7, 2023 | 2:00 PM - 4:00 PM"
  });
  const { currentUser } = useAuth();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const newsSnapshot = await getDocs(collection(db, "news"));
        const newsItemsFirestore = newsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const eventsSnapshot = await getDocs(collection(db, "events"));
        const eventsItemsFirestore = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNewsItems([...newsItemsStatic, ...newsItemsFirestore, ...eventsItemsFirestore]);
      } catch (error: any) {
        toast.error("Failed to fetch items: " + error.message);
        setNewsItems(newsItemsStatic);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = newsItems.filter(
    (item) =>
      (activeTab === "all" || item.type.toLowerCase() === activeTab.toLowerCase()) &&
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image file size exceeds 10MB limit.");
        return;
      }
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return "";
    try {
      setIsUploading(true);
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { data, error } = await supabase.storage
        .from("news-images")
        .upload(fileName, imageFile);
      if (error) throw error;
      const { data: urlData } = supabase.storage
        .from("news-images")
        .getPublicUrl(fileName);
      return urlData.publicUrl;
    } catch (error: any) {
      console.error("Error uploading image to Supabase:", error);
      toast.error(`Failed to upload image: ${error.message}`);
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddItem = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to add items.");
      return;
    }
    if (!newItem.title || !newItem.date || !newItem.content) {
      toast.error("Title, Date, and Content are required fields.");
      return;
    }
    if (newItem.type === "Event" && (!newItem.location || !newItem.eventDate)) {
      toast.error("Location and Event Date are required for events.");
      return;
    }

    try {
      setIsUploading(true);
      const imageUrl = await uploadImage();
      const itemToAdd = {
        title: newItem.title,
        type: newItem.type,
        description: newItem.content, // Map content to description
        date: newItem.date,
        imageSrc: imageUrl || "", // Map imageUrl to imageSrc
        author: currentUser.email || "Admin",
        createdAt: new Date().toISOString(),
        ...(newItem.type === "Event" && {
          location: newItem.location,
          eventDate: newItem.eventDate,
        }),
      };

      const collectionName = newItem.type === "Event" ? "events" : "news";
      const docRef = await addDoc(collection(db, collectionName), itemToAdd);
      const newItemWithId = { id: docRef.id, ...itemToAdd };

      const newsSnapshot = await getDocs(collection(db, "news"));
      const newsItemsFirestore = newsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const eventsSnapshot = await getDocs(collection(db, "events"));
      const eventsItemsFirestore = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewsItems([...newsItemsStatic, ...newsItemsFirestore, ...eventsItemsFirestore]);

      toast.success(`${newItem.type} added successfully!`);
      setIsAddDialogOpen(false);
      setNewItem({ title: "", type: "News", content: "", date: "", imageUrl: "", location: "", eventDate: "" });
      removeImage();
    } catch (error: any) {
      toast.error(`Failed to add item: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;
    try {
      const isStaticItem = newsItemsStatic.some((item) => item.id === selectedItem);
      if (!isStaticItem) {
        const itemToDelete = newsItems.find((item) => item.id === selectedItem);
        const collectionName = itemToDelete?.type === "Event" ? "events" : "news";
        await deleteDoc(doc(db, collectionName, selectedItem));
      }
      setNewsItems(newsItems.filter((item) => item.id !== selectedItem));
      toast.success("Item deleted successfully!");
    } catch (error: any) {
      toast.error(`Failed to delete item: ${error.message}`);
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const handleEditItem = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to edit items.");
      return;
    }
    if (!editItem.title || !editItem.date || !editItem.description) {
      toast.error("Title, Date, and Description are required fields.");
      return;
    }
    if (editItem.type === "Event" && (!editItem.location || !editItem.eventDate)) {
      toast.error("Location and Event Date are required for events.");
      return;
    }

    try {
      setIsUploading(true);
      const isStaticItem = newsItemsStatic.some((item) => item.id === editItem.id);
      let updatedImageUrl = editItem.imageSrc; // Use imageSrc
      if (imageFile) {
        updatedImageUrl = await uploadImage();
      }

      const updatedItem = {
        ...editItem,
        imageSrc: updatedImageUrl || "",
        updatedAt: new Date().toISOString(),
      };

      if (!isStaticItem) {
        const collectionName = editItem.type === "Event" ? "events" : "news";
        await updateDoc(doc(db, collectionName, editItem.id), updatedItem);
      }

      const newsSnapshot = await getDocs(collection(db, "news"));
      const newsItemsFirestore = newsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const eventsSnapshot = await getDocs(collection(db, "events"));
      const eventsItemsFirestore = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewsItems([...newsItemsStatic, ...newsItemsFirestore, ...eventsItemsFirestore]);

      toast.success(`${editItem.type} updated successfully!`);
      setIsEditDialogOpen(false);
      setEditItem(null);
      removeImage();
    } catch (error: any) {
      toast.error(`Failed to update item: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const openEditDialog = (item: any) => {
    setEditItem({ ...item, content: item.description }); // Map description back to content for editing
    setImagePreview(item.imageSrc || null); // Use imageSrc
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-law-DEFAULT">News & Events</h1>
          <p className="text-muted-foreground">Manage news articles and upcoming events</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Item
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
          </TabsList>
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search news & events..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <Button variant="outline" size="sm" onClick={() => setSearchTerm("")} className="gap-2">
              <FilterX className="h-4 w-4" />
              Clear Filter
            </Button>
          )}
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <TabsContent value="all" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FileText className="h-12 w-12 mb-2 opacity-20" />
                        <p className="text-lg font-medium">No items found</p>
                        <p className="text-sm">Try adjusting your search or add a new item</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.type === "News" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {item.type}
                        </span>
                      </TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        {item.imageSrc ? (
                          <img
                            src={item.imageSrc}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                            onError={(e) => {
                              console.error(`Failed to load image: ${item.imageSrc}`);
                              e.currentTarget.src = "https://via.placeholder.com/64";
                            }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-500"
                            onClick={() => openEditDialog(item)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
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
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="news" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FileText className="h-12 w-12 mb-2 opacity-20" />
                        <p className="text-lg font-medium">No news found</p>
                        <p className="text-sm">Try adjusting your search or add a new news item</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        {item.imageSrc ? (
                          <img
                            src={item.imageSrc}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                            onError={(e) => {
                              console.error(`Failed to load image: ${item.imageSrc}`);
                              e.currentTarget.src = "https://via.placeholder.com/64";
                            }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-500"
                            onClick={() => openEditDialog(item)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
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
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="event" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Event Date</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Calendar className="h-12 w-12 mb-2 opacity-20" />
                        <p className="text-lg font-medium">No events found</p>
                        <p className="text-sm">Try adjusting your search or add a new event</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.location || "N/A"}</TableCell>
                      <TableCell>{item.eventDate || "N/A"}</TableCell>
                      <TableCell>
                        {item.imageSrc ? (
                          <img
                            src={item.imageSrc}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                            onError={(e) => {
                              console.error(`Failed to load image: ${item.imageSrc}`);
                              e.currentTarget.src = "https://via.placeholder.com/64";
                            }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-500"
                            onClick={() => openEditDialog(item)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
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
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>Create a new news article or event for the LSPS website.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <div className="col-span-3">
                <select
                  id="type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                >
                  <option value="News">News</option>
                  <option value="Event">Event</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                className="col-span-3"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input
                id="date"
                type="date"
                className="col-span-3"
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
              />
            </div>
            {newItem.type === "Event" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input
                    id="location"
                    className="col-span-3"
                    value={newItem.location}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="eventDate" className="text-right">Event Date</Label>
                  <Input
                    id="eventDate"
                    className="col-span-3"
                    value={newItem.eventDate}
                    onChange={(e) => setNewItem({ ...newItem, eventDate: e.target.value })}
                    placeholder="e.g., October 7, 2023 | 2:00 PM - 4:00 PM"
                  />
                </div>
              </>
            )}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right">Description</Label>
              <Textarea
                id="content"
                className="col-span-3"
                rows={5}
                value={newItem.content}
                onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="image" className="text-right">Image</Label>
              <div className="col-span-3">
                {imagePreview ? (
                  <div className="relative mb-4">
                    <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-md" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddItem} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>Update an existing news article or event.</DialogDescription>
          </DialogHeader>
          {editItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">Type</Label>
                <div className="col-span-3">
                  <select
                    id="edit-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editItem.type}
                    onChange={(e) => setEditItem({ ...editItem, type: e.target.value })}
                  >
                    <option value="News">News</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">Title</Label>
                <Input
                  id="edit-title"
                  className="col-span-3"
                  value={editItem.title}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-date" className="text-right">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  className="col-span-3"
                  value={editItem.date}
                  onChange={(e) => setEditItem({ ...editItem, date: e.target.value })}
                />
              </div>
              {editItem.type === "Event" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-location" className="text-right">Location</Label>
                    <Input
                      id="edit-location"
                      className="col-span-3"
                      value={editItem.location || ""}
                      onChange={(e) => setEditItem({ ...editItem, location: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-eventDate" className="text-right">Event Date</Label>
                    <Input
                      id="edit-eventDate"
                      className="col-span-3"
                      value={editItem.eventDate || ""}
                      onChange={(e) => setEditItem({ ...editItem, eventDate: e.target.value })}
                      placeholder="e.g., October 7, 2023 | 2:00 PM - 4:00 PM"
                    />
                  </div>
                </>
              )}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right">Description</Label>
                <Textarea
                  id="edit-content"
                  className="col-span-3"
                  rows={5}
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-image" className="text-right">Image</Label>
                <div className="col-span-3">
                  {imagePreview ? (
                    <div className="relative mb-4">
                      <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-md" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Click to upload image</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="edit-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditItem} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this item from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteItem} className="bg-red-500 text-white hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminNews;