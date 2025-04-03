
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Pencil, Trash2 } from "lucide-react";
import { 
  createGalleryItem, 
  deleteGalleryItem, 
  fetchGalleryItems, 
  GalleryItem, 
  updateGalleryItem,
  uploadImage 
} from "@/firebase/firebaseService";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const AdminGallery = () => {
  const { toast } = useToast();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    imageFile: File | null;
    imageSrc: string;
  }>({
    title: "",
    description: "",
    category: "",
    imageFile: null,
    imageSrc: "",
  });

  // Categories for filtering
  const categories = [
    "Events",
    "Competitions",
    "Meetings",
    "Community",
    "Lectures",
    "Social",
    "Workshops",
    "Training"
  ];

  useEffect(() => {
    const loadGalleryItems = async () => {
      try {
        const items = await fetchGalleryItems();
        setGalleryItems(items);
      } catch (error) {
        console.error("Error loading gallery items:", error);
        toast({
          title: "Error",
          description: "Failed to load gallery items",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadGalleryItems();
  }, [toast]);

  const resetFormData = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      imageFile: null,
      imageSrc: "",
    });
    setSelectedItem(null);
  };

  const handleDialogClose = () => {
    resetFormData();
    setDialogOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imageSrc: URL.createObjectURL(file),
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleAddItem = async () => {
    if (!formData.title || !formData.category || (!formData.imageFile && !formData.imageSrc)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      let imageUrl = formData.imageSrc;
      
      // If there's a new image file, upload it
      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile, "gallery");
      }
      
      const newItem: Omit<GalleryItem, 'id' | 'createdAt'> = {
        title: formData.title,
        description: formData.description,
        imageSrc: imageUrl,
        category: formData.category,
        date: new Date().toISOString().split('T')[0],
      };
      
      const id = await createGalleryItem(newItem);
      
      const createdItem: GalleryItem = {
        id,
        ...newItem,
      };
      
      setGalleryItems((prev) => [createdItem, ...prev]);
      
      toast({
        title: "Success",
        description: "Gallery item added successfully",
      });
      
      handleDialogClose();
    } catch (error) {
      console.error("Error adding gallery item:", error);
      toast({
        title: "Error",
        description: "Failed to add gallery item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = async () => {
    if (!selectedItem || !formData.title || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      let imageUrl = formData.imageSrc;
      
      // If there's a new image file, upload it
      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile, "gallery");
      }
      
      const updatedItem: Partial<Omit<GalleryItem, 'id' | 'createdAt'>> = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        ...(formData.imageFile ? { imageSrc: imageUrl } : {}),
      };
      
      await updateGalleryItem(selectedItem.id!, updatedItem);
      
      setGalleryItems((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? { ...item, ...updatedItem }
            : item
        )
      );
      
      toast({
        title: "Success",
        description: "Gallery item updated successfully",
      });
      
      handleDialogClose();
    } catch (error) {
      console.error("Error updating gallery item:", error);
      toast({
        title: "Error",
        description: "Failed to update gallery item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (item: GalleryItem) => {
    setSelectedItem(item);
    setAlertDialogOpen(true);
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;

    try {
      setLoading(true);
      await deleteGalleryItem(selectedItem.id!);
      
      setGalleryItems((prev) => 
        prev.filter((item) => item.id !== selectedItem.id)
      );
      
      toast({
        title: "Success",
        description: "Gallery item deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setAlertDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category || "",
      imageFile: null,
      imageSrc: item.imageSrc,
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gallery Management</h1>
          <p className="text-muted-foreground">
            Manage images in the gallery collection.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetFormData();
                setDialogOpen(true);
              }}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Add New Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>
                {selectedItem ? "Edit Gallery Item" : "Add New Gallery Item"}
              </DialogTitle>
              <DialogDescription>
                Fill in the details and upload an image for the gallery.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image *</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                
                {formData.imageSrc && (
                  <div className="mt-4 border rounded-md overflow-hidden">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={formData.imageSrc}
                        alt="Gallery preview"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button
                onClick={selectedItem ? handleEditItem : handleAddItem}
                disabled={loading}
              >
                {loading ? "Processing..." : selectedItem ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Items</CardTitle>
          <CardDescription>
            All images in the gallery collection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading...</p>}
          
          {!loading && galleryItems.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No gallery items found</p>
            </div>
          )}
          
          {!loading && galleryItems.length > 0 && (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {galleryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="w-16 h-12 overflow-hidden rounded-md">
                          <img
                            src={item.imageSrc}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.category || "Uncategorized"}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500"
                            onClick={() => confirmDelete(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              gallery item from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteItem}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminGallery;
