
import { useState, useRef, useEffect } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  FilterX,
  Filter,
  ImagePlus,
  X
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
import { DatePicker } from "@/components/DatePicker";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/Firebase";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/supabase/supabase";

// Define a proper interface for Publication
interface Publication {
  id: string;
  title: string;
  category: string;
  author: string;
  status: string;
  date: string;
  content?: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

// Static publications data
const publicationsStatic: Publication[] = [
  {
    id: "1",
    title: "The Evolution of Nigerian Constitutional Law",
    category: "Constitutional Law",
    author: "John Doe",
    status: "Published",
    date: "2023-05-15",
    imageUrl: "",
  },
  {
    id: "2",
    title: "Criminal Justice Reform: A Case for Nigeria",
    category: "Criminal Law",
    author: "Jane Smith",
    status: "Draft",
    date: "2023-05-10",
    imageUrl: "",
  },
  {
    id: "3",
    title: "Property Rights in Nigerian Legal System",
    category: "Property Law",
    author: "Robert Johnson",
    status: "Published",
    date: "2023-05-05",
    imageUrl: "",
  },
  {
    id: "4",
    title: "International Law and its Application in Nigeria",
    category: "International Law",
    author: "Sarah Williams",
    status: "Published",
    date: "2023-04-28",
    imageUrl: "",
  },
  {
    id: "5",
    title: "The Role of Judiciary in Democracy",
    category: "Constitutional Law",
    author: "Michael Brown",
    status: "Draft",
    date: "2023-04-20",
    imageUrl: "",
  },
];

// Available categories for publications
const categories = [
  "Constitutional Law",
  "Criminal Law",
  "Property Law",
  "International Law",
  "Human Rights Law",
  "Administrative Law",
  "Commercial Law",
  "Environmental Law",
  "Family Law",
  "Intellectual Property Law"
];

const AdminPublications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<string | null>(null);
  const [editPublication, setEditPublication] = useState<Publication | null>(null);
  const [publications, setPublications] = useState<Publication[]>(publicationsStatic);
  const [publishDate, setPublishDate] = useState<Date | undefined>(undefined);
  const [newPublication, setNewPublication] = useState({
    title: "",
    category: "",
    content: "",
    date: "",
    status: "Draft",
    imageUrl: "",
  });
  const { currentUser } = useAuth();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch publications on mount
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "publications"));
        const firestoreItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Publication[];
        setPublications([...publicationsStatic, ...firestoreItems]);
      } catch (error: any) {
        toast.error("Failed to fetch publications: " + error.message);
      }
    };
    fetchPublications();
  }, []);

  const filteredPublications = publications.filter((pub) =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
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
      console.log("Uploading to Supabase:", { fileName, fileSize: imageFile.size, fileType: imageFile.type });
      const { data, error } = await supabase.storage
        .from("publication-images")
        .upload(fileName, imageFile);
      if (error) throw error;
      const { data: urlData } = supabase.storage
        .from("publication-images")
        .getPublicUrl(fileName);
      console.log("Public URL:", urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error: any) {
      console.error("Error uploading image to Supabase:", error);
      toast.error(`Failed to upload image: ${error.message}`);
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddPublication = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to add publications.");
      return;
    }
    if (!newPublication.title || !newPublication.category) {
      toast.error("Title and Category are required fields.");
      return;
    }

    try {
      setIsUploading(true);
      const imageUrl = await uploadImage();
      const publicationDate = publishDate ? publishDate.toISOString().split('T')[0] : '';
      
      const publicationToAdd = {
        ...newPublication,
        date: publicationDate || new Date().toISOString().split('T')[0],
        author: currentUser.email || "Admin",
        createdAt: new Date().toISOString(),
        imageUrl: imageUrl || "",
      };
      
      const docRef = await addDoc(collection(db, "publications"), publicationToAdd);
      const newPublicationWithId = { id: docRef.id, ...publicationToAdd } as Publication;
      console.log("New publication added:", newPublicationWithId);

      const querySnapshot = await getDocs(collection(db, "publications"));
      const firestoreItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Publication[];
      setPublications([...publicationsStatic, ...firestoreItems]);

      toast.success("Publication added successfully!");
      setIsAddDialogOpen(false);
      setNewPublication({ 
        title: "", 
        category: "", 
        content: "", 
        date: "",
        status: "Draft",
        imageUrl: ""
      });
      setPublishDate(undefined);
      removeImage();
    } catch (error: any) {
      toast.error(`Failed to add publication: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePublication = async () => {
    if (!selectedPublication) return;
    try {
      const isStaticItem = publicationsStatic.some((pub) => pub.id === selectedPublication);
      if (!isStaticItem) {
        // Only delete from Firestore if it's not a static item
        await deleteDoc(doc(db, "publications", selectedPublication));
      }
      setPublications(publications.filter((pub) => pub.id !== selectedPublication));
      toast.success("Publication deleted successfully!");
    } catch (error: any) {
      toast.error(`Failed to delete publication: ${error.message}`);
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedPublication(null);
    }
  };

  const handleEditPublication = async () => {
    if (!currentUser || !editPublication) {
      toast.error("You must be logged in to edit publications.");
      return;
    }
    if (!editPublication.title || !editPublication.category) {
      toast.error("Title and Category are required fields.");
      return;
    }

    try {
      setIsUploading(true);
      const isStaticItem = publicationsStatic.some((pub) => pub.id === editPublication.id);
      let updatedImageUrl = editPublication.imageUrl;
      if (imageFile) {
        updatedImageUrl = await uploadImage();
      }

      const updatedPublication = {
        ...editPublication,
        imageUrl: updatedImageUrl || "",
        updatedAt: new Date().toISOString(),
      };

      if (!isStaticItem) {
        // Update Firestore if it's not a static item
        await updateDoc(doc(db, "publications", editPublication.id), updatedPublication);
      }

      const querySnapshot = await getDocs(collection(db, "publications"));
      const firestoreItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Publication[];
      setPublications([...publicationsStatic, ...firestoreItems]);

      toast.success("Publication updated successfully!");
      setIsEditDialogOpen(false);
      setEditPublication(null);
      removeImage();
    } catch (error: any) {
      toast.error(`Failed to update publication: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const openEditDialog = (publication: Publication) => {
    setEditPublication(publication);
    setImagePreview(publication.imageUrl || null);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-law-DEFAULT">
            Publications
          </h1>
          <p className="text-muted-foreground">
            Manage articles, case notes, and essays
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Publication
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search publications..."
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
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPublications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <FileText className="h-12 w-12 mb-2 opacity-20" />
                    <p className="text-lg font-medium">No publications found</p>
                    <p className="text-sm">
                      Try adjusting your search or add a new publication
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredPublications.map((pub) => (
                <TableRow key={pub.id}>
                  <TableCell className="font-medium">{pub.title}</TableCell>
                  <TableCell>{pub.category}</TableCell>
                  <TableCell>{pub.author}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        pub.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {pub.status}
                    </span>
                  </TableCell>
                  <TableCell>{pub.date}</TableCell>
                  <TableCell>
                    {pub.imageUrl ? (
                      <img 
                        src={pub.imageUrl} 
                        alt={pub.title} 
                        className="w-16 h-16 object-cover rounded" 
                        onError={(e) => {
                          console.error(`Failed to load image: ${pub.imageUrl}`);
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
                        onClick={() => openEditDialog(pub)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => {
                          setSelectedPublication(pub.id);
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

      {/* Add Publication Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Publication</DialogTitle>
            <DialogDescription>
              Create a new article, case note, or essay for the LSPS website.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newPublication.title}
                onChange={(e) =>
                  setNewPublication({
                    ...newPublication,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={newPublication.category} 
                onValueChange={(value) => 
                  setNewPublication({
                    ...newPublication,
                    category: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
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
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newPublication.status} 
                onValueChange={(value) => 
                  setNewPublication({
                    ...newPublication,
                    status: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={10}
                value={newPublication.content}
                onChange={(e) =>
                  setNewPublication({
                    ...newPublication,
                    content: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Publication Date</Label>
              <DatePicker 
                date={publishDate} 
                onDateChange={setPublishDate} 
                label="Publication Date" 
                placeholder="Select publication date" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Cover Image</Label>
              <div>
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
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPublication} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save Publication"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Publication Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Publication</DialogTitle>
            <DialogDescription>
              Update an existing publication.
            </DialogDescription>
          </DialogHeader>
          {editPublication && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editPublication.title}
                  onChange={(e) =>
                    setEditPublication({
                      ...editPublication,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={editPublication.category} 
                  onValueChange={(value) => 
                    setEditPublication({
                      ...editPublication,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
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
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={editPublication.status} 
                  onValueChange={(value) => 
                    setEditPublication({
                      ...editPublication,
                      status: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  rows={10}
                  value={editPublication.content}
                  onChange={(e) =>
                    setEditPublication({
                      ...editPublication,
                      content: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Publication Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editPublication.date}
                  onChange={(e) =>
                    setEditPublication({
                      ...editPublication,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Cover Image</Label>
                <div>
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
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPublication} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              publication from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePublication}
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

export default AdminPublications;
