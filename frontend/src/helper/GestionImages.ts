import { urlMedia } from "./UrlImage";

interface ImageObject {
  image: string;
}

export const getCircuitImages = (
  images: ImageObject[] | undefined,
  baseURL: string = `${urlMedia}`
): string[] => {
  if (images && Array.isArray(images) && images.length > 0) {
    return images
      .filter((img) => img && img.image)
      .map((img) => {
        const imagePath = img.image;
        return imagePath.startsWith("http")
          ? imagePath
          : `${baseURL}${imagePath}`;
      });
  }

  return ["/placeholder.svg"];
};
