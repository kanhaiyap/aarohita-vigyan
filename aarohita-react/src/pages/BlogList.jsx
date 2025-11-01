import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogs } from "../data/blogs";

export default function BlogList() {
  const navigate = useNavigate();

  function goToProjects() {
    // navigate to home (HashRouter uses #/) then scroll to #projects
    navigate("/");
    // small delay to allow the Home component to mount
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 120);
  }

  return (
    <>
      <Helmet>
        <title>Blog — AI, IoT & Web Development Insights | Aarohita Vigyan</title>
        <meta
          name="description"
          content="Insights and how-to articles on AI, IoT, POS systems, and website development from Aarohita Vigyan. Practical guides for businesses and developers in India."
        />
        <meta
          name="keywords"
          content="AI blog India, IoT articles, website development blog, POS systems, Bhojan Mitra, Aarohita Vigyan"
        />
        <link rel="canonical" href="https://haritaahar.com/blog/" />

        {/* Open Graph / Twitter defaults for blog listing */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Aarohita Vigyan Blog" />
        <meta property="og:description" content="Insights on AI, IoT, and website development from Aarohita Vigyan." />
        <meta property="og:url" content="https://haritaahar.com/blog/" />
        <meta property="og:image" content="https://haritaahar.com/images/og/blog-listing.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aarohita Vigyan Blog" />
        <meta name="twitter:description" content="Insights on AI, IoT, and website development from Aarohita Vigyan." />
        <meta name="twitter:image" content="https://haritaahar.com/images/og/blog-listing.png" />
      </Helmet>

      <section className="max-w-5xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 text-center">
          Aarohita Vigyan Blog
        </h1>

        <div className="text-center mb-8 text-sm text-slate-600">
          <span>Looking for our projects? </span>
          <button onClick={goToProjects} className="text-blue-600 hover:underline font-medium">
            View Showcase Projects
          </button>
          <span className="mx-2">·</span>
          <Link to="/website-development" className="text-blue-600 hover:underline font-medium">
            Website Development Services
          </Link>
        </div>

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
