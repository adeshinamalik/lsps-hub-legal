
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Publications from "./pages/Publications";
import PublicationDetail from "./pages/PublicationDetail";
import News from "./pages/News";
import NewsEventDetail from "./pages/NewsEventDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPublications from "./pages/admin/Publications";
import AdminNews from "./pages/admin/News";
import AdminUsers from "./pages/admin/Users";
import AdminMedia from "./pages/admin/Media";
import AdminLayout from "./components/admin/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/publications/:id" element={<PublicationDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:type/:id" element={<NewsEventDetail />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="publications" element={<AdminPublications />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="media" element={<AdminMedia />} />
          </Route>
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
