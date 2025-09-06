import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string; // type Open Graph, ex: 'website', 'article'
  image?: string; // image pour OG et Twitter
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  type = "website",
  image,
}) => {
  const canonicalUrl =
    canonical || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <Helmet>
      {/* Titre et description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card */}
      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
