
import { useState } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  FilterX,
  Filter
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

// Dummy data for publications
const publications = [
  {
    id: "1",
    title: "The Evolution of Nigerian Constitutional Law",
    category: "Constitutional Law",
    author: "John Doe",
    status: "Published",
    date: "2023-05-15",
  },
  {
    id: "2",
    title: "Criminal Justice Reform: A Case for Nigeria",
    category: "Criminal Law",
    author: "Jane Smith",
    status: "Draft",
    date: "2023-05-10",
  },
  {
    id: "3",
    title: "Property Rights in Nigerian Legal System",
    category: "Property Law",
    author: "Robert Johnson",
    status: "Published",
    date: "2023-05-05",
  },
  {
    id: "4",
    title: "International Law and its Application in Nigeria",
    category: "International Law",
    author: "Sarah Williams",
    status: "Published",
    date: "2023-04-28",
  },
  {
    id: "5",
    title: "The Role of Judiciary in Democracy",
    category: "Constitutional Law",
    author: "Michael Brown",
    status: "Draft",
    date: "2023-04-20",
  },
];

const AdminPublications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<string | null>(null);
  const [newPublication, setNewPublication] = useState({
    title: "",
    category: "",
    content: "",
  });

  const filteredPublications = publications.filter((pub) =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPublication = () => {
    // In a real app, this would make an API call to add the publication
    toast.success("Publication added successfully!");
    setIsAddDialogOpen(false);
    setNewPublication({ title: "", category: "", content: "" });
  };

  const handleDeletePublication = () => {
    // In a real app, this would make an API call to delete the publication
    toast.success("Publication deleted successfully!");
    setIsDeleteDialogOpen(false);
    setSelectedPublication(null);
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPublications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
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
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500"
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
              <Input
                id="category"
                value={newPublication.category}
                onChange={(e) =>
                  setNewPublication({
                    ...newPublication,
                    category: e.target.value,
                  })
                }
              />
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPublication}>Save Publication</Button>
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
