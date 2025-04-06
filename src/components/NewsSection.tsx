
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'news';
  imageSrc?: string;
}

interface NewsSectionProps {
  className?: string;
  items: NewsItem[];
}

const NewsSection = ({ className, items }: NewsSectionProps) => {
  const navigate = useNavigate();

  if (items.length === 0) return null;

  return (
    <section className={cn("py-20 bg-white px-6 md:px-10 lg:px-20", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="flex items-center">
            <Newspaper className="h-6 w-6 text-law-accent mr-3" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-law-DEFAULT mb-3">Latest News</h2>
              <p className="text-law-text-light max-w-xl">
                Stay informed with the latest updates from the Law Students' Press Society.
              </p>
            </div>
          </div>
          <Button 
            variant="link" 
            className="text-law-accent flex items-center mt-4 md:mt-0 group"
            onClick={() => navigate('/news')}
          >
            View all news
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
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-law-DEFAULT/10 text-law-DEFAULT">
                    News
                  </span>
                  <span className="ml-3 text-sm text-law-text-light">{item.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-law-DEFAULT mb-3">{item.title}</h3>
                <p className="text-law-text-light mb-6 line-clamp-3">{item.description}</p>
                
                <Button 
                  variant="ghost" 
                  className="text-law-DEFAULT hover:text-white justify-center pl-2 w-fit group"
                  onClick={() => navigate(`/news/${item.id}`)}
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

export default NewsSection;
