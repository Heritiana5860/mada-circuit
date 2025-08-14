import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "../ui/button";

interface DetailCarouselProps {
  isImageLoading: boolean;
  allImages: string[];
  selectedImageIndex: number;
  handleImageError: (index: number) => void;
  handleImageLoad: () => void;
  prevImage: () => void;
  nextImage: () => void;
  goToSlide: (index: number) => void;
}

const DetailCarousel: React.FC<DetailCarouselProps> = ({
  isImageLoading,
  allImages,
  selectedImageIndex,
  handleImageError,
  handleImageLoad,
  prevImage,
  nextImage,
  goToSlide,
}) => {
  return (
    <div className="relative mb-8">
      <div className="relative h-64 box-border md:h-96 lg:h-[500px] overflow-hidden rounded-xl bg-gray-200">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        <img
          src={allImages[selectedImageIndex] || ""}
          className="w-full h-full object-cover transition-opacity duration-300"
          alt="Image invalide"
          onError={() => handleImageError(selectedImageIndex)}
          onLoad={handleImageLoad}
          style={{ opacity: isImageLoading ? 0 : 1 }}
        />

        {/* Navigation du carousel */}
        {allImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Indicateurs */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === selectedImageIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Aller à l'image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailCarousel;
