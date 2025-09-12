import { useState } from "react";
import { Calendar, Share2, ArrowRight, User } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useQuery } from "@apollo/client";
import { GET_ALL_BLOGS } from "@/graphql/queries";
import { Link } from "react-router-dom";
import { urlMedia } from "@/helper/UrlImage";
import PageHeader from "@/components/PageHeader";
import { Helmet } from "react-helmet-async";

// Composant principal amélioré
const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const { loading, error, data } = useQuery(GET_ALL_BLOGS);

  const handleShare = (post, event) => {
    event.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const allBlogs = data?.allBlogs;

  // Fonction pour déterminer si c'est une image ou vidéo
  const isVideo = (url) => {
    return /\.(mp4|avi|mov|wmv|webm)$/i.test(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Helmet>
        <title>
          Blog & Actualités
        </title>
        <meta
          name="description"
          content="Découvrez nos derniers articles, guides pratiques et actualités."
        />
        <link
          rel="canonical"
          href="https://madagascar-voyagesolidaire.com/contact"
        />
      </Helmet>

      <NavBar />

      {/* Header Section */}
      <PageHeader
        titre="Blog & Actualités"
        description="Découvrez nos derniers articles, guides pratiques et actualités.
            Explorez un monde d'idées et d'inspirations à travers nos contenus
            soigneusement sélectionnés."
        background="piscine.webp"
        bg_position="bg-end"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.map((post, index) => (
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
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  {isVideo(post.medias[0].file) ? (
                    <video
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        post.featured ? "h-80" : "h-64"
                      }`}
                      muted
                    >
                      <source
                        src={`${urlMedia}${post.medias[0].file}`}
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <img
                      src={`${urlMedia}${post.medias[0].file}`}
                      alt={post.titre}
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        post.featured ? "h-80" : "h-64"
                      }`}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg">
                      {post.category}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg">
                        ⭐ À la Une
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3 opacity-0 transition-all duration-300 ${
                      hoveredCard === post.id
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
                    className={`font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 ${
                      post.featured ? "text-2xl" : "text-xl"
                    }`}
                  >
                    {post.titre}
                  </h2>

                  {/* Author */}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Par {post.auteur}
                      </span>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.datePublication}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {post.contenu.slice(0, 100)}...
                  </p>

                  {/* Read More Button */}

                  <div className="mt-auto">
                    <Link to={`/blog/${post.id}`}>
                      <button className="flex items-center text-green-600 font-semibold group-hover:text-green-800 transition-colors duration-300">
                        <span className="mr-2">Lire la suite</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
