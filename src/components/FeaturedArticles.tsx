
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageSrc: string;
}

interface FeaturedArticlesProps {
  className?: string;
  articles: Article[];
}

const FeaturedArticles = ({ className, articles }: FeaturedArticlesProps) => {
  const navigate = useNavigate();

  return (
    <section className={cn("py-20 px-6 md:px-10 lg:px-20", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-law-DEFAULT mb-3">Featured Articles</h2>
            <p className="text-law-text-light max-w-xl">
              Explore our selected articles on legal developments, student perspectives, and jurisprudential analysis.
            </p>
          </div>
          <Button 
            variant="link" 
            className="text-law-accent flex items-center mt-4 md:mt-0 group"
            onClick={() => navigate('/publications')}
          >
            View all articles
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card 
              key={article.id}
              className={cn(
                "overflow-hidden border-none bg-white shadow-subtle transition-all duration-300 hover:shadow-glass h-full flex flex-col",
                index === 0 ? "md:col-span-2" : ""
              )}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both',
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.imageSrc}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-xs px-3 py-1 text-xs font-medium text-law-DEFAULT rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-law-text-light text-sm mb-2">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.author}</span>
                </div>
                <h3 className="text-xl font-bold text-law-DEFAULT mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-law-text-light mb-6 line-clamp-3 flex-grow">{article.excerpt}</p>
                <Button 
                  variant="ghost" 
                  className="text-law-DEFAULT hover:text-law-accent justify-start pl-0 w-fit group"
                  onClick={() => navigate(`/publications/${article.id}`)}
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

export default FeaturedArticles;
