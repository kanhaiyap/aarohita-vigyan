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

  return (
    <>
      <Helmet>
        <title>{post.title} | Aarohita Vigyan</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={`https://haritaahar.com/blog/${post.slug}`} />
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
