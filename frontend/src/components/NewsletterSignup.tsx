
import { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface NewsletterSignupProps {
  className?: string;
}

const NewsletterSignup = ({ className }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Veuillez entrer une adresse e-mail.");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast.success("Merci de vous être inscrit à notre newsletter !");
    }, 1000);
  };
  
  return (
    <div className={cn(
      "bg-muted p-8 rounded-xl",
      className
    )}>
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-2">
          Restez informé
        </h3>
        <p className="text-muted-foreground mb-6">
          Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles et offres spéciales.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse e-mail"
            className="rounded-md border border-input bg-card px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary flex-1"
            required
          />
          <button
            type="submit"
            className="btn-primary min-w-[120px] flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-pulse">Envoi...</span>
            ) : (
              <>
                <span>S'inscrire</span>
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
