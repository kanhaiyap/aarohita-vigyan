import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogs } from "../data/blogs";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogs.find((b) => b.slug === slug);

  if (!post)
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/blog" className="text-blue-600 underline">
          ← Back to Blog
        </Link>
      </div>
    );

  const canonical = `https://haritaahar.com/blog/${post.slug}`;
  const imageUrl = `https://haritaahar.com/images/og/${post.slug}.png`;

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical
    },
    headline: post.title,
    description: post.description,
    image: [imageUrl, "https://haritaahar.com/images/logo.png"],
    author: {
      "@type": "Person",
      name: "Kunwar Kanhaiya Pandey",
    },
    publisher: {
      "@type": "Organization",
      name: "Aarohita Vigyan",
      logo: {
        "@type": "ImageObject",
        url: "https://haritaahar.com/images/logo.png"
      }
    },
    datePublished: post.date,
    keywords: typeof post.keywords === 'string' ? post.keywords.split(',').map(k=>k.trim()) : post.keywords
  };

  return (
    <>
      <Helmet>
        <title>{post.title} — Aarohita Vigyan | AI, IoT & Web Dev</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={canonical} />

        {/* Open Graph / Article */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} — Aarohita Vigyan`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={imageUrl} />
        <meta property="article:published_time" content={post.date} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} — Aarohita Vigyan`} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Structured data for rich results */}
        <script type="application/ld+json">{JSON.stringify(blogJsonLd)}</script>
      </Helmet>

      <article className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
        <p className="text-slate-500 mb-8">{post.date}</p>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-10">
          <Link to="/blog" className="text-blue-600 underline">
            ← Back to Blog
          </Link>
        </div>
      </article>
    </>
  );
}
