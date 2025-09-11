import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { GET_BLOG_BY_ID } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { urlMedia } from "@/helper/UrlImage";

const BlogDetail = () => {
  const { id } = useParams();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { loading, error, data } = useQuery(GET_BLOG_BY_ID, {
    variables: { id: id },
  });

  // Effet de scroll pour la barre de progression
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation d'apparition
  useEffect(() => {
    if (data?.blog) {
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/20">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-gradient-to-r from-blue-500 to-purple-600 border-t-transparent mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-blue-200 mx-auto animate-pulse"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Chargement</h3>
          <p className="text-gray-600 mb-4">Récupération du contenu...</p>
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-lg p-12 rounded-3xl shadow-2xl max-w-md border border-red-100">
          <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops !</h3>
          <p className="text-red-600 font-medium">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const blog = data?.blog;

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-lg p-12 rounded-3xl shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Les articles seront bientôt disponible.
          </h3>
          <p className="text-gray-600">Merci de votre patience!</p>
        </div>
      </div>
    );
  }

  const isVideo = (url) => {
    return /\.(mp4|avi|mov|wmv|webm)$/i.test(url);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const estimateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Barre de progression de lecture */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <NavBar />

      {/* Hero Section révolutionnée */}
      <div className="relative overflow-hidden bg-[url('piscine.webp')] bg-cover bg-center">
        <div
          className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v6a2 2 0 11-4 0V9a.5.5 0 00-1 0v3a2 2 0 11-4 0V3z"
                    clipRule="evenodd"
                  />
                </svg>
                Article de blog
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white">
              <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                {blog.titre}
              </span>
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-lg mb-8">
              <div className="flex items-center bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-white font-medium">{blog.auteur}</span>
              </div>

              <div className="flex items-center bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-white font-medium">
                  {formatDate(blog.datePublication)}
                </span>
              </div>

              <div className="flex items-center bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-white font-medium">
                  {estimateReadingTime(blog.contenu)} min de lecture
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Flèche de défilement animée */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Contenu principal avec design moderne */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <article
          className={`bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Tags avec nouveau design */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="px-8 py-8 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border-b border-white/20">
              <div className="flex flex-wrap gap-3">
                {blog.tags.split(";").map((tag, index) => (
                  <span
                    key={index}
                    className="group relative px-5 py-2 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-semibold rounded-full shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="relative z-10">#{tag.trim()}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contenu avec typographie améliorée */}
          <div className="px-8 md:px-12 py-16">
            <div className="prose prose-xl max-w-none">
              <div
                className="text-gray-800 leading-relaxed font-light text-lg selection:bg-blue-200 selection:text-blue-900"
                dangerouslySetInnerHTML={{ __html: blog.contenu }}
                style={{
                  lineHeight: "1.9",
                  fontSize: "1.125rem",
                }}
              />
            </div>
          </div>

          {/* Galerie multimédia révolutionnée */}
          {blog.medias && blog.medias.length > 0 && (
            <div className="px-8 md:px-12 py-16 bg-gradient-to-br from-gray-50/50 to-blue-50/50 backdrop-blur-sm">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-gray-900 mb-4">
                  <span className=" text-gray-600">Galerie Multimédia</span>
                </h2>
                <div className="w-32 h-1.5 bg-gray-400 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Découvrez les visuels qui accompagnent cet article
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blog.medias.map((media, index) => (
                  <div
                    key={media.id}
                    className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1"
                    onClick={() => setSelectedMedia(media)}
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                      {isVideo(media.file) ? (
                        <>
                          <video
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            muted
                          >
                            <source
                              src={`${urlMedia}${media.file}`}
                              type="video/mp4"
                            />
                          </video>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/70 transition-all duration-500">
                            <div className="absolute top-4 left-4">
                              <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                🎥 VIDÉO
                              </span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                                <svg
                                  className="w-16 h-16 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={`${urlMedia}${media.file}`}
                            alt={`Image ${media.id}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="absolute top-4 left-4">
                              <span className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                🖼️ IMAGE
                              </span>
                            </div>
                            <div className="absolute bottom-4 right-4">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                <svg
                                  className="w-5 h-5 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Bordure animée améliorée */}
                    <div
                      className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ padding: "2px" }}
                    >
                      <div className="h-full w-full rounded-2xl bg-white"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer de l'article */}
          <div className="px-8 md:px-12 py-8 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Par {blog.auteur}</p>
                  <p className="text-sm text-gray-300">
                    Publié le {formatDate(blog.datePublication)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
                <button className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Modal modernisé */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-16 right-0 text-white hover:text-gray-300 bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/30"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 border border-white/20 shadow-2xl">
              {isVideo(selectedMedia.file) ? (
                <video
                  className="max-w-full max-h-full rounded-2xl shadow-2xl"
                  controls
                  autoPlay
                >
                  <source
                    src={`${urlMedia}${selectedMedia.file}`}
                    type="video/mp4"
                  />
                  Votre navigateur ne supporte pas la balise vidéo.
                </video>
              ) : (
                <img
                  src={`${urlMedia}${selectedMedia.file}`}
                  alt={`Image ${selectedMedia.id}`}
                  className="max-w-full max-h-full rounded-2xl shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="py-16"></div>
      <Footer />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .prose h1,
        .prose h2,
        .prose h3 {
          @apply font-bold text-gray-900;
        }

        .prose p {
          @apply mb-6;
        }

        .prose a {
          @apply text-blue-600 hover:text-blue-800 transition-colors;
        }
      `}</style>
    </div>
  );
};

export default BlogDetail;
