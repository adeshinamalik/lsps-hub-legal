
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Publications from './pages/Publications';
import PublicationDetail from './pages/PublicationDetail';
import News from './pages/News';
import NewsPage from './pages/NewsPage';
import Events from './pages/Events';
import NewsDetail from './pages/NewsDetail';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminPublications from './pages/admin/Publications';
import AdminNews from './pages/admin/News';
import AdminUsers from './pages/admin/Users';
import AdminMedia from './pages/admin/Media';
import AdminGallery from './pages/admin/Gallery';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/toaster";
import JoinUs from './pages/JoinUs';
import Gallery from './pages/Gallery';
import Resources from './pages/Resources';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import EventDetail from './pages/EventDetail';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <main className="min-h-screen bg-white flex flex-col">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/publications/:id" element={<PublicationDetail />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="publications" element={<AdminPublications />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="media" element={<AdminMedia />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
