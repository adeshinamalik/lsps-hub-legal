
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Headphones, Video, Calendar, Clock } from "lucide-react";
import CommentSection from "@/components/CommentSection";

const Multimedia = () => {
  // Sample podcast episodes
  const podcastEpisodes = [
    {
      id: "1",
      title: "Legal Ethics in Modern Practice",
      description: "A deep dive into the evolving landscape of legal ethics and professional responsibility in contemporary legal practice.",
      duration: "45 min",
      date: "March 15, 2024",
      audioUrl: "#", // Would be actual audio file URL
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: "2", 
      title: "Student Rights and Campus Justice",
      description: "Exploring student rights, campus disciplinary procedures, and the intersection of academic and legal justice.",
      duration: "38 min",
      date: "February 28, 2024",
      audioUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: "3",
      title: "Constitutional Law Simplified",
      description: "Breaking down complex constitutional principles for law students and the general public.",
      duration: "52 min", 
      date: "February 10, 2024",
      audioUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1591291621164-2c6367723315?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
    }
  ];

  // Sample video interviews
  const videoInterviews = [
    {
      id: "1",
      title: "Interview with Hon. Justice Adebayo",
      description: "An exclusive interview discussing judicial reforms and the future of Nigeria's legal system.",
      duration: "25 min",
      date: "March 20, 2024",
      videoUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: "2",
      title: "Senior Advocate's Career Journey",
      description: "A seasoned Senior Advocate shares insights on building a successful legal career.",
      duration: "32 min",
      date: "March 5, 2024", 
      videoUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: "3",
      title: "Law Students' Moot Court Champions",
      description: "Celebrating our students' victory in the national moot court competition.",
      duration: "18 min",
      date: "February 15, 2024",
      videoUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-law-DEFAULT mb-6">Multimedia</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore our collection of podcasts, video interviews, and multimedia content featuring legal discussions, expert interviews, and educational content.
            </p>
          </div>
        </div>
      </div>

      {/* Podcasts Section */}
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-law-DEFAULT/10 rounded-lg flex items-center justify-center mr-4">
              <Headphones className="h-6 w-6 text-law-DEFAULT" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-law-DEFAULT mb-2">LSS Press Podcast</h2>
              <p className="text-gray-600">Legal discussions and insights for the modern student</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcastEpisodes.map((episode, index) => (
              <Card key={episode.id} className="overflow-hidden border-none shadow-subtle hover:shadow-glass transition-all duration-300 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Button size="lg" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                      <Play className="h-5 w-5 mr-2" />
                      Play Episode
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{episode.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{episode.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-law-DEFAULT mb-3">{episode.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{episode.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Interviews Section */}
      <section className="py-16 md:py-20 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center mb-12">
            <div className="w-12 h-12 bg-law-DEFAULT/10 rounded-lg flex items-center justify-center mr-4">
              <Video className="h-6 w-6 text-law-DEFAULT" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-law-DEFAULT mb-2">Video Interviews</h2>
              <p className="text-gray-600">Exclusive conversations with legal professionals and experts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoInterviews.map((video, index) => (
              <Card key={video.id} className="overflow-hidden border-none shadow-subtle hover:shadow-glass transition-all duration-300 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Button size="lg" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                      <Play className="h-5 w-5 mr-2" />
                      Watch Video
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{video.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{video.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-law-DEFAULT mb-3">{video.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <CommentSection itemId="multimedia-page" itemType="publication" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Multimedia;
