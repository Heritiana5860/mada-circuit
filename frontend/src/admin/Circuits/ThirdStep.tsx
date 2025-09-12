import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Upload, X, Image, CheckCircle } from "lucide-react";

const ThirdStep = ({ selectedImages, setSelectedImages }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files: FileList | File[]) => {
    const newImages = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const removeImage = (id) => {
    setSelectedImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-5">
      {/* Zone de téléchargement */}
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center space-y-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isDragging ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <Upload
                className={`w-8 h-8 ${
                  isDragging ? "text-blue-600" : "text-gray-600"
                }`}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">
                {isDragging
                  ? "Déposez vos images ici"
                  : "Sélectionnez vos images"}
              </h3>
              <p className="text-sm text-gray-500">
                Glissez-déposez vos images ou cliquez pour les sélectionner
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG, GIF jusqu'à 10MB chacune
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Aperçu des images sélectionnées */}
      {selectedImages.length > 0 && (
        <Card className="shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Images sélectionnées ({selectedImages.length})
            </h3>
            <button
              onClick={() => {
                selectedImages.forEach((img) => URL.revokeObjectURL(img.url));
                setSelectedImages([]);
              }}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Tout supprimer
            </button>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 overscroll-contain">
            {selectedImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                  {image.file.type.startsWith("video/") ? (
                    <video
                      src={image.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Bouton de suppression */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Indicateur de sélection */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>

                {/* Informations sur le fichier */}
                <div className="mt-2 text-xs text-gray-600">
                  <p className="truncate" title={image.name}>
                    {image.name}
                  </p>
                  <p className="text-gray-400">{formatFileSize(image.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Résumé et actions */}
      {selectedImages.length > 0 && (
        <Card className="shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Image className="w2 h-2" />
              <span>
                {selectedImages.length} image
                {selectedImages.length > 1 ? "s" : ""} sélectionnée
                {selectedImages.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Ajouter plus
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ThirdStep;
