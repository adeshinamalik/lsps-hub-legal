import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/CommentSection";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { fetchNewsById } from "@/firebase/firebaseService";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/Firebase";

// Mock news data as fallback
const staticNews = [
  {
    id: "1",
    title: "Law Students Society Hosts Successful Career Fair",
    date: "May 25, 2023",
    author: "Editorial Team",
    content: `
      <p>The Law Students Society of the University of Ilorin recently hosted its annual Career Fair, bringing together students and potential employers for a day of networking and professional development.</p>
      
      <p>The event, which took place at the Faculty of Law Auditorium, saw participation from over 20 leading law firms, corporate legal departments, and public sector organizations. Students had the opportunity to interact with legal professionals, submit their CVs, and participate in on-the-spot interviews.</p>
      
      <h2>Keynote Address</h2>
      <p>The Dean of the Faculty of Law, Prof. Hakeem Ibrahim, delivered the keynote address, emphasizing the importance of practical skills alongside academic knowledge in today's competitive legal market.</p>
      
      <p>"The legal profession is evolving rapidly, and as aspiring lawyers, you must equip yourselves with not just theoretical knowledge but also practical skills that make you market-ready," said Prof. Ibrahim.</p>
      
      <h2>Workshops and Panel Discussions</h2>
      <p>The Career Fair also featured workshops on CV writing, interview skills, and career planning. A panel discussion on "Navigating the Early Years of Legal Practice" provided students with insights from young lawyers who shared their experiences and offered valuable advice.</p>
      
      <h2>Employer Participation</h2>
      <p>Participating organizations included notable law firms such as Aluko & Oyebode, Banwo & Ighodalo, and Templars, as well as corporate entities like GTBank, MTN, and the Nigerian National Petroleum Corporation (NNPC).</p>
      
      <p>Mr. Adeleke Johnson, HR Manager at Aluko & Oyebode, expressed satisfaction with the quality of students he interacted with. "We are impressed by the level of preparation and enthusiasm shown by the students. We have identified several potential candidates for our internship program," he said.</p>
      
      <h2>Student Feedback</h2>
      <p>Students who attended the event expressed appreciation for the opportunity to connect with potential employers.</p>
      
      <p>"The Career Fair has been incredibly helpful. I've secured two interview invitations and received valuable feedback on my CV," said Amina Bello, a final-year student.</p>
      
      <p>The Law Students Society plans to make the Career Fair an even bigger event next year, with more participating organizations and expanded workshop sessions.</p>
    `,
    imageSrc: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    summary: "The Law Students Society of the University of Ilorin recently hosted its annual Career Fair, bringing together students and potential employers for a day of networking and professional development.",
    type: "news"
  },
  {
    id: "2",
    title: "Faculty of Law Announces New Curriculum",
    date: "April 12, 2023",
    author: "Academic Committee",
    content: `
      <p>The Faculty of Law has announced a comprehensive revision of its curriculum to better prepare students for the evolving legal landscape. The new curriculum, which will be implemented from the next academic session, incorporates modern legal concepts and practical skills training.</p>
      
      <h2>Key Changes</h2>
      <p>The revised curriculum includes several key changes:</p>
      <ul>
        <li>Introduction of courses on legal technology and digital law</li>
        <li>Enhanced clinical legal education program</li>
        <li>Integration of interdisciplinary studies</li>
        <li>Expanded elective options for specialized legal fields</li>
        <li>Mandatory internship program</li>
      </ul>
      
      <h2>Objectives</h2>
      <p>According to the Dean of the Faculty, the curriculum revision aims to:</p>
      <ul>
        <li>Enhance the practical skills of law graduates</li>
        <li>Prepare students for emerging areas of legal practice</li>
        <li>Foster interdisciplinary thinking</li>
        <li>Improve the employability of graduates</li>
      </ul>
      
      <h2>Implementation Timeline</h2>
      <p>The new curriculum will be implemented in phases:</p>
      <ul>
        <li>Phase 1 (2023/2024): Implementation for 100 and 200 level students</li>
        <li>Phase 2 (2024/2025): Extension to 300 level students</li>
        <li>Phase 3 (2025/2026): Complete implementation across all levels</li>
      </ul>
      
      <h2>Stakeholder Input</h2>
      <p>The curriculum revision process involved extensive consultations with various stakeholders, including:</p>
      <ul>
        <li>Legal practitioners</li>
        <li>Judicial officers</li>
        <li>Academics from other institutions</li>
        <li>Current students and alumni</li>
        <li>Employers of law graduates</li>
      </ul>
      
      <p>The Faculty of Law is committed to providing a world-class legal education that equips graduates with the knowledge, skills, and values needed to excel in a rapidly changing legal environment.</p>
    `,
    imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    summary: "The Faculty of Law has announced a comprehensive revision of its curriculum to better prepare students for the evolving legal landscape.",
    type: "news"
  },
  // Additional static news items would be here
];

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchNewsData = async () => {

      if (!id) return;

      setIsLoading(true);
      try {
        // Try to fetch from Firebase

        const firebaseNews = await fetchNewsById(id);

        if (firebaseNews && firebaseNews.type === 'News') {
          setNews(firebaseNews);
        } else {
          // If not found in Firebase, check static data
          const staticNewsItem = staticNews.find(n => n.id === id);

          if (staticNewsItem) {
            setNews(staticNewsItem);
          } else {
            // If still not found, check static data
            const staticNewsItem = staticNews.find(n => n.id === id);

            if (staticNewsItem) {
              setNews(staticNewsItem);
            } else {
              // Try to match by partial ID
              const partialMatch = staticNews.find(n => id.includes(n.id) || n.id.includes(id));
              if (partialMatch) {
                setNews(partialMatch);
              } else {
                toast.error("News article not found");
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        toast.error("Failed to load news details");

        // Fallback to static data
        const staticNewsItem = staticNews.find(n => n.id === id);
        if (staticNewsItem) {
          setNews(staticNewsItem);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, [id]);
  console.log(news);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
          <div className="container mx-auto">
            <Button
              variant="ghost"
              className="mb-6 text-law-DEFAULT hover:text-law-accent hover:text-white pl-0"
              onClick={() => navigate('/news')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>

            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-8 w-1/3 mb-4" />
              <Skeleton className="h-12 w-full mb-6" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-6 w-48" />
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 px-6 md:px-10 lg:px-20">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="w-full h-[400px] rounded-lg mb-10" />
              <div className="space-y-4 mb-12">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // If no news is found, show a message and a button to go back
  if (!news) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 md:px-10 lg:px-20 py-32 text-center">
          <h1 className="text-3xl font-bold text-law-DEFAULT mb-6">News Article Not Found</h1>
          <p className="text-law-text-light mb-8">The news article you are looking for does not exist or has been removed.</p>
          <Button
            variant="outline"
            className="border-law-DEFAULT text-law-DEFAULT hover:bg-law-DEFAULT hover:text-white"
            onClick={() => navigate('/news')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-20 bg-law-muted">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            className="mb-6 text-law-DEFAULT hover:text-white pl-3"
            onClick={() => navigate('/news')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-block bg-law-DEFAULT/10 text-law-DEFAULT px-3 py-1 rounded-full text-sm font-medium">
                News
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-law-DEFAULT mb-6">{news.title}</h1>

            <div className="flex flex-wrap gap-4 text-law-text-light mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{news.date}</span>
              </div>

              {news.author && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{news.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className="py-12 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <img
                src={news.imageSrc || news.imageUrl}
                alt={news.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=News+Image+Not+Found";
                }}
              />
            </div>

            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            {/* Comment Section */}
            <CommentSection itemId={id || ""} itemType="news" />
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NewsDetail;
