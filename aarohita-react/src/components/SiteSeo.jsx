import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SiteSeo() {
  const canonical = 'https://haritaahar.com/';

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
  '@id': `${canonical}#organization`,
  name: 'Aarohita Vigyan Pvt. Ltd.',
  url: canonical,
  logo: `${canonical}images/logo.png`,
    sameAs: [
      'https://x.com/Kanhaiyapandey6',
      'https://www.linkedin.com/in/kunwar-kanhaiya-pandey-72711811a/',
      'https://github.com/kanhaiyap'
    ],
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: '+91-9731615178',
      contactType: 'customer service',
      areaServed: 'IN'
    }]
  };

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
  '@id': `${canonical}#person`,
    name: 'Kunwar Kanhaiya Pandey',
    jobTitle: 'Founder & CEO',
    worksFor: { '@id': `${canonical}#organization` },
  url: `${canonical}kunwar-kanhaiya-pandey`,
    sameAs: [
      'https://x.com/Kanhaiyapandey6',
      'https://www.linkedin.com/in/kunwar-kanhaiya-pandey-72711811a/',
      'https://github.com/kanhaiyap'
    ]
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${canonical}#website`,
    url: canonical,
    name: 'Aarohita Vigyan',
    publisher: { '@id': `${canonical}#organization` }
  };

  return (
    <Helmet>
  <link rel="author" href="https://haritaahar.com/kunwar-kanhaiya-pandey" />
      <link rel="me" href="https://www.linkedin.com/in/kunwar-kanhaiya-pandey-72711811a/" />
      <link rel="me" href="https://x.com/Kanhaiyapandey6" />
      <meta name="author" content="Kunwar Kanhaiya Pandey" />
      <meta name="publisher" content="Aarohita Vigyan Pvt. Ltd." />
      <script type="application/ld+json">{JSON.stringify(org)}</script>
      <script type="application/ld+json">{JSON.stringify(person)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
    </Helmet>
  );
}
