
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'news' | 'event';
  imageSrc?: string;
  eventDate?: string;
  location?: string;
}

interface NewsHighlightsProps {
  className?: string;
  items: NewsItem[];
}

const NewsHighlights = ({ className, items }: NewsHighlightsProps) => {
  const navigate = useNavigate();

  return (
    <section className={cn("py-20 bg-law-muted px-6 md:px-10 lg:px-20", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-law-DEFAULT mb-3">News & Events</h2>
            <p className="text-law-text-light max-w-xl">
              Stay updated with the latest news and upcoming events from the Law Students' Society Press.
            </p>
          </div>
          <Button 
            variant="link" 
            className="text-law-accent flex items-center mt-4 md:mt-0 group"
            onClick={() => navigate('/news')}
          >
            View all news & events
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card 
              key={item.id}
              className="overflow-hidden border-none bg-white shadow-subtle transition-all duration-300 hover:shadow-glass animate-fade-up"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both',
              }}
            >
              {item.imageSrc && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className={cn(
                    "text-xs font-medium px-3 py-1 rounded-full",
                    item.type === 'event' 
                      ? "bg-law-accent/10 text-law-accent" 
                      : "bg-law-DEFAULT/10 text-law-DEFAULT"
                  )}>
                    {item.type === 'event' ? 'Event' : 'News'}
                  </span>
                  <span className="ml-3 text-sm text-law-text-light">{item.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-law-DEFAULT mb-3">{item.title}</h3>
                
                {item.type === 'event' && item.eventDate && (
                  <div className="flex items-center mb-3 text-law-text-light">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{item.eventDate}</span>
                    {item.location && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="text-sm">{item.location}</span>
                      </>
                    )}
                  </div>
                )}
                
                <p className="text-law-text-light mb-6 line-clamp-3">{item.description}</p>
                
                <Button 
                  variant="ghost" 
                  className="text-law-DEFAULT hover:text-white justify-center pl-2 w-fit group"
                  onClick={() => navigate(`/news/${item.type === 'event' ? 'events' : 'news'}/${item.id}`)}
                >
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsHighlights;
