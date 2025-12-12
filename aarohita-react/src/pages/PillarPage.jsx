import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import pillars from '../data/pillars';

function PillarPage({ pillar }) {
  const params = useParams();
  const subpage = params.subpage || '';
  const pillarData = pillars[pillar];

  if (!pillarData) {
    return (
      <div className="container mx-auto p-6 pt-20 md:pt-24">
    <h1 className="text-3xl font-bold anchor-offset">Page not found</h1>
        <p>Unknown pillar.</p>
      </div>
    );
  }

  if (!subpage) {
    // Render pillar index with list of subpages
    return (
      <div className="container mx-auto p-6 pt-20 md:pt-24">
        <Helmet>
          <title>{pillarData.title} | Aarohita Vigyan</title>
          <meta name="description" content={pillarData.description} />
        </Helmet>

  <h1 className="text-4xl font-extrabold mb-4 anchor-offset">{pillarData.title}</h1>
        <p className="mb-6">{pillarData.description}</p>

        <h2 className="text-2xl font-bold mb-2">Guides & Articles</h2>
        <ul className="list-disc pl-6">
          {pillarData.pages.map(p => (
            <li key={p.slug} className="mb-2">
              <Link to={`/${pillar}/${p.slug}`} className="text-blue-600 hover:underline">
                {p.title}
              </Link>
              <div className="text-sm text-gray-600">{p.description}</div>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h3 className="text-xl font-semibold">Related pillars</h3>
          <div className="flex gap-4 mt-3">
            {Object.keys(pillars).filter(k => k !== pillar).map(k => (
              <Link key={k} to={`/${k}`} className="px-3 py-2 bg-gray-100 rounded">
                {pillars[k].title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render subpage
  const page = pillarData.pages.find(p => p.slug === subpage);
  if (!page) {
    return (
      <div className="container mx-auto p-6 pt-20 md:pt-24">
  <h1 className="text-3xl font-bold anchor-offset">Not found</h1>
        <p>The article you are looking for does not exist under this pillar.</p>
        <Link to={`/${pillar}`} className="text-blue-600 hover:underline">Back to {pillarData.title}</Link>
      </div>
    );
  }

  // Render article page with internal links to related pages
  const related = pillarData.pages.filter(p => p.slug !== page.slug).slice(0, 6);

  // support external static HTML referenced by contentUrl (served from public/)
  const [html, setHtml] = useState(page.content || null);
  const [loading, setLoading] = useState(!page.content && !!page.contentUrl);

  useEffect(() => {
    let mounted = true;
    if (page.contentUrl && !page.content) {
      setLoading(true);
      fetch(page.contentUrl)
        .then(r => {
          if (!r.ok) throw new Error('Network response not ok');
          return r.text();
        })
        .then(text => {
          if (!mounted) return;
          setHtml(text);
        })
        .catch(() => {
          if (!mounted) return;
          setHtml('<p>Sorry, this content could not be loaded.</p>');
        })
        .finally(() => mounted && setLoading(false));
    }
    return () => {
      mounted = false;
    };
  }, [page.contentUrl, page.content]);

  return (
    <div className="container mx-auto p-6 pt-20 md:pt-24">
      <Helmet>
        <title>{page.title} | {pillarData.title} | Aarohita Vigyan</title>
        <meta name="description" content={page.description} />
  <link rel="canonical" href={`https://haritaahar.com/${pillar}/${page.slug}`} />
      </Helmet>

  <h1 className="text-3xl font-bold mb-4 anchor-offset">{page.title}</h1>
      <p className="text-gray-700 mb-6">{page.description}</p>

      {loading ? (
        <div className="py-8">Loading article…</div>
      ) : (
        <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html || '<p>No content available.</p>' }} />
      )}

      <div className="mt-10">
        <h3 className="text-xl font-semibold">Related articles</h3>
        <ul className="list-disc pl-6 mt-3">
          {related.map(r => (
            <li key={r.slug}>
              <Link to={`/${pillar}/${r.slug}`} className="text-blue-600 hover:underline">{r.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h4 className="font-semibold">Explore other pillars</h4>
        <div className="flex gap-3 mt-3">
          {Object.keys(pillars).filter(k => k !== pillar).map(k => (
            <Link key={k} to={`/${k}`} className="px-3 py-2 bg-gray-100 rounded">{pillars[k].title}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PillarPage;
