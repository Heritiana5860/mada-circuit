import { useState } from "react";
import {
  Calendar,
  Share2,
  ArrowRight,
  User,
  ExternalLink,
  Play,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useQuery } from "@apollo/client";
import { GET_ALL_BLOGS } from "@/graphql/queries";
import { Link } from "react-router-dom";
import { urlMedia } from "@/helper/UrlImage";
import PageHeader from "@/components/PageHeader";
import { Helmet } from "react-helmet-async";
import EmptyData from "@/components/EmptyData";
import { formatDate } from "@/helper/formatage";
import { useTranslation } from "react-i18next";
import ContentLoading from "@/components/Loading";

// Composant principal amélioré
const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { t } = useTranslation();

  const { loading, error, data } = useQuery(GET_ALL_BLOGS);

  const handleShare = (post, event) => {
    event.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url:
          post.contentType === "YOUTUBE" && post.youtubeUrl
            ? post.youtubeUrl
            : window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        post.contentType === "YOUTUBE" && post.youtubeUrl
          ? post.youtubeUrl
          : window.location.href
      );
      alert("Lien copié dans le presse-papier !");
    }
  };

  if (loading) {
    return <ContentLoading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const allBlogs = data?.allBlogs;
  console.log(allBlogs);
  

  // Fonction pour déterminer si c'est une image ou vidéo
  const isVideo = (url) => {
    return /\.(mp4|avi|mov|wmv|webm)$/i.test(url);
  };

  const YouTubeEmbed = ({ embedId, title }) => (
    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${embedId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <Helmet>
        <title>Blog & News</title>
        <meta
          name="description"
          content="Discover our latest articles, practical guides, and news updates."
        />
        <link
          rel="canonical"
          href="https://madagascar-voyagesolidaire.com/blog"
        />
      </Helmet>

      <NavBar />

      {/* Header Section */}
      <PageHeader
        titre={t("pages.blog.blogNew", "Blog & News")}
        description={t(
          "pages.blog.blogDesc",
          "Stay informed with our newest posts, expert tips, and curated stories designed to inspire."
        )}
        background="/piscine.webp"
        bg_position="bg-end"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Articles Grid */}
        {allBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogs.map((post) => (
              <article
                key={post.id}
                className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  post.featured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedPost(post)}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Contenu multimédia */}
                  <div className="relative overflow-hidden">
                    {post.contentType === "YOUTUBE" && post.youtubeEmbedId ? (
                      // Affichage YouTube
                      <div className="relative">
                        <img
                          src={post.youtubeThumbnail}
                          alt={post.titre}
                          className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                            post.featured ? "h-80" : "h-64"
                          }`}
                        />

                        {/* Overlay YouTube */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Badge YouTube */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-600 text-white shadow-lg">
                            <Play className="w-3 h-3 mr-1" />
                            YouTube
                          </span>
                        </div>

                        {/* Bouton Play Central */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className={`bg-red-600/90 backdrop-blur-sm rounded-full p-6 transform transition-all duration-500 ${
                              hoveredCard === post.id
                                ? "scale-110 bg-red-600"
                                : "scale-100"
                            }`}
                          >
                            <Play className="w-12 h-12 text-white fill-current" />
                          </div>
                        </div>

                        {/* Durée simulée */}
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                            10:32
                          </span>
                        </div>
                      </div>
                    ) : post.medias && post.medias.length > 0 ? (
                      // Affichage média traditionnel
                      <div>
                        {isVideo(post.medias[0].file) ? (
                          <video
                            className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                              post.featured ? "h-80" : "h-64"
                            }`}
                            muted
                          >
                            <source
                              src={post.medias[0].file}
                              type="video/mp4"
                            />
                          </video>
                        ) : (
                          <img
                            src={post.medias[0].file}
                            alt={post.titre}
                            className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                              post.featured ? "h-80" : "h-64"
                            }`}
                          />
                        )}

                        {/* Category Badge pour média */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    ) : (
                      // Placeholder si pas de média
                      <div
                        className={`bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ${
                          post.featured ? "h-80" : "h-64"
                        }`}
                      >
                        <div className="text-center text-gray-500">
                          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
                            <ExternalLink className="w-8 h-8" />
                          </div>
                          <p className="font-medium">Contenu texte</p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3 opacity-0 transition-all duration-300 ${
                        hoveredCard === post.id &&
                        post.contentType !== "YOUTUBE"
                          ? "opacity-100 translate-y-0"
                          : "translate-y-4"
                      }`}
                    >
                      <button
                        onClick={(e) => handleShare(post, e)}
                        className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col">
                    {/* Title */}
                    <h2
                      className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 ${
                        post.featured ? "text-2xl" : "text-xl"
                      }`}
                    >
                      {post.titre}
                    </h2>

                    {/* Author & Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>By {post.auteur}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.datePublication)}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags
                          .split(";")
                          .slice(0, 3)
                          .map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              #{tag.trim()}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* Content Preview */}
                    <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                      {post.contenu.slice(0, 120)}...
                    </p>

                    {/* Read More / Watch Button */}
                    <div className="mt-auto">
                      <button className="flex items-center text-blue-600 font-semibold group-hover:text-blue-800 transition-colors duration-300">
                        <span className="mr-2">
                          {post.contentType === "YOUTUBE"
                            ? "Watch Video"
                            : "Read more"}
                        </span>
                        {post.contentType === "YOUTUBE" ? (
                          <Play className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        ) : (
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyData titre="Upcoming Blogs Coming Soon" />
        )}

        {/* Modal pour post sélectionné */}
        {selectedPost && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-white rounded-2xl w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 pr-4">
                    {selectedPost.titre}
                  </h2>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <div className="w-6 h-6 relative">
                      <div className="absolute inset-0 w-6 h-6">
                        <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                        <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Contenu YouTube ou média */}
                {selectedPost.contentType === "YOUTUBE" &&
                selectedPost.youtubeEmbedId ? (
                  <div className="mb-6">
                    <YouTubeEmbed
                      embedId={selectedPost.youtubeEmbedId}
                      title={selectedPost.titre}
                    />
                  </div>
                ) : (
                  selectedPost.medias &&
                  selectedPost.medias.length > 0 && (
                    <div className="mb-6">
                      <img
                        src={selectedPost.medias[0].file}
                        alt={selectedPost.titre}
                        className="w-full h-64 md:h-96 object-cover rounded-lg"
                      />
                    </div>
                  )
                )}

                {/* Métadonnées */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>Par {selectedPost.auteur}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedPost.datePublication)}</span>
                  </div>
                  {selectedPost.contentType === "YOUTUBE" && (
                    <a
                      href={selectedPost.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Voir sur YouTube</span>
                    </a>
                  )}
                </div>

                {/* Contenu */}
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-md">
                    {selectedPost.contenu}
                  </p>
                </div>

                {/* Tags */}
                {selectedPost.tags && (
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                    {selectedPost.tags.split(";").map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
