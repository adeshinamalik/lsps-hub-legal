
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  className?: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
}

const Hero = ({
  className,
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageUrl = "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
}: HeroProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className={cn(
        "relative min-h-[85vh] flex items-center pt-20",
        className
      )}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/10">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-law-DEFAULT/40 to-black/30 mix-blend-multiply"
          aria-hidden="true"
        />
        <img
          src={imageUrl}
          alt="Background"
          className="w-full h-full object-cover object-center"
          loading="lazy"
          aria-hidden="true"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="max-w-3xl animate-fade-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-xl leading-relaxed">
            {subtitle}
          </p>
          
          {ctaText && ctaLink && (
            <Button
              onClick={() => navigate(ctaLink)}
              className="bg-law-accent hover:bg-law-accent/90 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 group"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="h-16 w-0.5 bg-white/30 animate-pulse" />
        <span className="text-white/70 text-sm mt-2">Scroll</span>
      </div>
    </div>
  );
};

export default Hero;
