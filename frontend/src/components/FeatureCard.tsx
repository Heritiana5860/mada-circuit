
import { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const FeatureCard = ({ title, description, icon, className, style }: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card p-6 rounded-xl card-hover",
        className
      )}
      style={style}
    >
      <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
