import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogs } from "../data/blogs";

export default function BlogList() {
  return (
    <>
      <Helmet>
        <title>Blog | Aarohita Vigyan</title>
        <meta
          name="description"
          content="SEO-optimized articles from Aarohita Vigyan about website and web app development in India, AI automation, and digital transformation."
        />
        <meta
          name="keywords"
          content="website development bhilai, ai web app india, hire web developer, react django blog, aarohita vigyan blog"
        />
        <link rel="canonical" href="https://haritaahar.com/blog/" />
      </Helmet>

      <section className="max-w-5xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-10 text-center">
          Aarohita Vigyan Blog
        </h1>

        <div className="space-y-8">
          {blogs.map((b) => (
            <article
              key={b.slug}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-2 text-blue-700">
                <Link to={`/blog/${b.slug}`}>{b.title}</Link>
              </h2>
              <p className="text-slate-600 mb-4">{b.description}</p>
              <p className="text-sm text-slate-500 mb-3">{b.date}</p>
              <Link
                to={`/blog/${b.slug}`}
                className="text-blue-600 font-medium underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
