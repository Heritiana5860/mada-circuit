import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  Calendar,
  UserRound,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GET_BLOG_BY_ID, GET_ALL_BLOGS } from "@/graphql/queries";
import { Blog } from "@/types";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();

  // Requêtes GraphQL
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useQuery(GET_BLOG_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const { data: allBlogsData } = useQuery(GET_ALL_BLOGS);

  // Fonction pour formater la date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const post = blogData?.blog;

  useEffect(() => {
    if (post && post.titre) {
      window.scrollTo(0, 0);
      document.title = `${post.titre} | Madagascar Voyage`;
    }
  }, [post]);

  // État de chargement
  if (blogLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Chargement de l'article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // État d'erreur ou article non trouvé
  if (blogError || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {blogError
                  ? "Erreur lors du chargement de l'article."
                  : "Article non trouvé."}
              </AlertDescription>
            </Alert>
            <Link to="/blog">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Bouton retour */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/blog">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Button>
          </Link>
        </div>

        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={
              post.image ||
              "https://images.unsplash.com/photo-1516815231560-8f41ec531527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            }
            alt={post.titre}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://images.unsplash.com/photo-1516815231560-8f41ec531527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full mb-4 inline-block">
                Article
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {post.titre}
              </h1>
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{formatDate(post.datePublication)}</span>
                </div>
                <div className="flex items-center">
                  <UserRound className="h-5 w-5 mr-2" />
                  <span>{post.auteur}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contenu }}
          />

          <Separator className="my-8" />

          <div className="flex flex-wrap items-center justify-between">
            <div className="mb-4 md:mb-0">
              <span className="font-medium mr-2">Tags:</span>
              {Array.isArray(post.tags) && post.tags.length > 0 ? (
                post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <>
                  <span className="inline-block text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full mr-2 mb-2">
                    #madagascar
                  </span>
                  <span className="inline-block text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full mr-2 mb-2">
                    #voyage
                  </span>
                  <span className="inline-block text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full mr-2 mb-2">
                    #découverte
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-medium mr-2">Partager:</span>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </article>

        <section className="bg-muted py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Articles similaires
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allBlogsData?.allBlogs?.slice(0, 3).map((blog: Blog) => (
                <Link key={blog.id} to={`/blog/${blog.id}`} className="block">
                  <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-40">
                      <img
                        src={
                          blog.image ||
                          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                        }
                        alt={blog.titre}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2 hover:text-primary transition-colors">
                        {blog.titre}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(blog.datePublication)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )) ||
                // Articles par défaut si pas de données
                [1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-card rounded-lg overflow-hidden shadow-md"
                  >
                    <div className="h-40">
                      <img
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                        alt="Article similaire"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">Découvrez Madagascar</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Récemment</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
