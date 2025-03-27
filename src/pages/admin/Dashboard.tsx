
import { useEffect, useState } from "react";
import { 
  FileText, 
  Calendar, 
  Users, 
  Image, 
  BarChart 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import { db } from "@/firebase/Firebase";
import { collection, getDocs, query, orderBy, limit, where, Timestamp } from "firebase/firestore";
import { supabase } from "@/supabase/supabase";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    publications: 0,
    newsEvents: 0,
    users: 0,
    media: 0
  });
  const [recentActivity, setRecentActivity] = useState<{
    type: string;
    title: string;
    time: string;
    icon: any;
    color: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch publications count
        const publicationsQuery = query(collection(db, 'articles'));
        const publicationsSnapshot = await getDocs(publicationsQuery);
        
        // Fetch news & events count
        const newsEventsQuery = query(collection(db, 'newsEvents'));
        const newsEventsSnapshot = await getDocs(newsEventsQuery);
        
        // Fetch users count
        const usersQuery = query(collection(db, 'users'));
        const usersSnapshot = await getDocs(usersQuery);
        
        // Fetch media count from Supabase
        const { count: mediaCount } = await supabase
          .from('storage.objects')
          .select('*', { count: 'exact', head: true });
          
        // Update stats
        setStats({
          publications: publicationsSnapshot.size,
          newsEvents: newsEventsSnapshot.size,
          users: usersSnapshot.size,
          media: mediaCount || 0
        });
        
        // Fetch recent activity
        const recentPublicationsQuery = query(
          collection(db, 'articles'),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        
        const recentEventsQuery = query(
          collection(db, 'newsEvents'),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        
        const recentUsersQuery = query(
          collection(db, 'users'),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        
        const [recentPubSnapshot, recentEventSnapshot, recentUserSnapshot] = 
          await Promise.all([
            getDocs(recentPublicationsQuery),
            getDocs(recentEventsQuery),
            getDocs(recentUsersQuery)
          ]);
        
        const activities = [];
        
        if (!recentPubSnapshot.empty) {
          const pubDoc = recentPubSnapshot.docs[0];
          const pubData = pubDoc.data();
          activities.push({
            type: "New article published",
            title: pubData.title || "New article",
            time: formatTimeAgo(pubData.createdAt),
            icon: FileText,
            color: "bg-blue-100 p-2 text-blue-500"
          });
        }
        
        if (!recentEventSnapshot.empty) {
          const eventDoc = recentEventSnapshot.docs[0];
          const eventData = eventDoc.data();
          activities.push({
            type: eventData.type === "event" ? "Event updated" : "News added",
            title: eventData.title || "News/Event update",
            time: formatTimeAgo(eventData.createdAt),
            icon: Calendar,
            color: "bg-green-100 p-2 text-green-500"
          });
        }
        
        if (!recentUserSnapshot.empty) {
          const userDoc = recentUserSnapshot.docs[0];
          const userData = userDoc.data();
          activities.push({
            type: "New member added",
            title: userData.displayName || userData.email || "New user",
            time: formatTimeAgo(userData.createdAt),
            icon: Users,
            color: "bg-purple-100 p-2 text-purple-500"
          });
        }
        
        setRecentActivity(activities);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const formatTimeAgo = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return "recently";
    
    const now = new Date();
    const timeValue = timestamp.toDate();
    const diffInSeconds = Math.floor((now.getTime() - timeValue.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };
  
  const handleQuickAction = (action: string) => {
    switch (action) {
      case "publication":
        navigate("/admin/publications");
        break;
      case "event":
        navigate("/admin/news");
        break;
      case "users":
        navigate("/admin/users");
        break;
      case "media":
        navigate("/admin/media");
        break;
      default:
        break;
    }
  };

  const statCards = [
    {
      title: "Total Publications",
      value: loading ? "..." : stats.publications.toString(),
      description: "Articles, Case Notes, Essays",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "News & Events",
      value: loading ? "..." : stats.newsEvents.toString(),
      description: "Press Releases, Events",
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "Members",
      value: loading ? "..." : stats.users.toString(),
      description: "Editors, Writers, Contributors",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Media Items",
      value: loading ? "..." : stats.media.toString(),
      description: "Images, Documents",
      icon: Image,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-law-DEFAULT">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the LSPS admin dashboard.
          </p>
        </div>
      </div>

      <Alert>
        <BarChart className="h-4 w-4" />
        <AlertTitle>Welcome to the Admin Panel</AlertTitle>
        <AlertDescription>
          From here, you can manage all content for the LSPS website. Navigate using the sidebar to access different sections.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`${card.color} rounded-full p-2 text-white`}>
                <card.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions taken in the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <div className="h-16 w-full animate-pulse rounded-md bg-gray-100"></div>
                <div className="h-16 w-full animate-pulse rounded-md bg-gray-100"></div>
                <div className="h-16 w-full animate-pulse rounded-md bg-gray-100"></div>
              </div>
            ) : recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`rounded-full ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.type}</p>
                      <p className="text-xs text-muted-foreground">
                        "{activity.title}" - {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No recent activity</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Shortcuts to common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Card 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleQuickAction("publication")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <FileText className="mb-2 h-6 w-6 text-blue-500" />
                  <p className="text-sm font-medium">Add Publication</p>
                </CardContent>
              </Card>
              <Card 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleQuickAction("event")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Calendar className="mb-2 h-6 w-6 text-green-500" />
                  <p className="text-sm font-medium">Add Event</p>
                </CardContent>
              </Card>
              <Card 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleQuickAction("users")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Users className="mb-2 h-6 w-6 text-purple-500" />
                  <p className="text-sm font-medium">Manage Users</p>
                </CardContent>
              </Card>
              <Card 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleQuickAction("media")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Image className="mb-2 h-6 w-6 text-orange-500" />
                  <p className="text-sm font-medium">Upload Media</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
