import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

interface TestimonialCardProps {
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
  className?: string;
  style?: CSSProperties;
}

const TestimonialCard = ({ 
  name, 
  avatar, 
  date, 
  rating, 
  text, 
  className,
  style
}: TestimonialCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card p-6 rounded-xl card-hover",
        className
      )}
      style={style}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <img 
            src={avatar} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
          />
          <div className="ml-3">
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          {Array(5).fill(0).map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "h-4 w-4", 
                i < rating ? "fill-accent text-accent" : "text-muted-foreground"
              )} 
            />
          ))}
        </div>
      </div>
      
      <blockquote className="text-muted-foreground italic">
        "{text}"
      </blockquote>
    </div>
  );
};

export default TestimonialCard;
