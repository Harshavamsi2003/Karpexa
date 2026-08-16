/* =====================================================================
   SEO ROUTE TABLE
   One entry per URL. Used three ways:
     1. <Seo /> applies it on client-side navigation
     2. scripts/prerender.mjs bakes it into static HTML at build time
     3. the same script generates sitemap.xml from it
   Add a route here and all three stay in sync.
   ===================================================================== */

import { brand, SITE_URL, sectors } from '../data/content';
import { capabilities } from '../pages/capabilities';

const abs = (p) => `${SITE_URL}${p === '/' ? '' : p}`;
const OG_IMAGE = `${SITE_URL}/images/og/karpexa-og.jpg`;

/* ---------- Reusable graph nodes ---------- */

export const organizationLd = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: brand.full,
  alternateName: brand.name,
  legalName: brand.legal,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/brand/karpexa-logo.png`,
    width: 512,
    height: 512,
  },
  image: OG_IMAGE,
  description:
    'Karpexa Technologies is an end-to-end IT services and consulting firm delivering infrastructure, cloud, managed services, cyber security, data analytics, ERP and technology staffing.',
  foundingDate: brand.founded,
  email: brand.email,
  telephone: brand.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${brand.address.line1}, ${brand.address.line2}`,
    addressLocality: brand.address.city,
    addressRegion: brand.address.region,
    postalCode: brand.address.postal,
    addressCountry: brand.address.country,
  },
  areaServed: { '@type': 'Country', name: 'India' },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: brand.email,
      telephone: brand.phone,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  ],
  knowsAbout: capabilities.map((c) => c.title),
};

export const websiteLd = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: brand.full,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-IN',
};

/* Sitelink hinting: an explicit navigation graph of the pages we want
   Google to consider as sitelinks under the brand result. */
export const siteNavigationLd = {
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#sitenav`,
  name: 'Karpexa primary navigation',
  itemListElement: [
    { name: 'Capabilities', url: abs('/capabilities'), description: 'Every service Karpexa delivers, from infrastructure to analytics.' },
    { name: 'Sectors', url: abs('/sectors'), description: 'Industries we build and support technology for.' },
    { name: 'Our Work', url: abs('/our-work'), description: 'GPU/AI server infrastructure and large-scale government & academic storage work.' },
    { name: 'About us', url: abs('/company'), description: 'Who Karpexa is, how we work and what we commit to.' },
    { name: 'Contact', url: abs('/contact'), description: 'Start a conversation with the Karpexa team.' },
    { name: 'Cloud Services', url: abs('/capabilities/cloud'), description: 'Cloud architecture, migration and managed operations.' },
    { name: 'Cyber Security', url: abs('/capabilities/security'), description: 'Identity, endpoint, network and cloud security services.' },
    { name: 'Managed IT Services', url: abs('/capabilities/managed-it'), description: '24×7 service desk, monitoring and IT operations.' },
    { name: 'IT Infrastructure', url: abs('/capabilities/it-infrastructure'), description: 'Data centre, network, devices and meeting rooms.' },
  ].map((item, i) => ({
    '@type': 'SiteNavigationElement',
    position: i + 1,
    name: item.name,
    description: item.description,
    url: item.url,
  })),
};

const breadcrumb = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    item: abs(t.path),
  })),
});

const faqLd = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const serviceLd = (c) => ({
  '@type': 'Service',
  '@id': `${abs(`/capabilities/${c.slug}`)}#service`,
  name: c.title,
  serviceType: c.title,
  description: c.seo.description,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'India' },
  url: abs(`/capabilities/${c.slug}`),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${c.title} services`,
    itemListElement: c.offerings.map((o) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: o.name, description: o.desc },
    })),
  },
});

/* ---------- The route table ---------- */

export const routes = [
  {
    path: '/',
    title: 'Karpexa Technologies | End-to-End IT Services & Digital Infrastructure',
    description:
      'Karpexa Technologies delivers end-to-end IT — infrastructure, cloud, managed services, cyber security, data analytics, ERP and technology staffing — designed, deployed and operated by one accountable team.',
    keywords:
      'IT services company India, end to end IT solutions, managed IT services, cloud migration, cyber security services, IT infrastructure provider, digital transformation partner',
    priority: '1.0',
    changefreq: 'weekly',
    graph: [organizationLd, websiteLd, siteNavigationLd, {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Karpexa Technologies',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
    }],
  },
  {
    path: '/capabilities',
    title: 'IT Capabilities & Services | Karpexa Technologies',
    description:
      'Ten IT capabilities under one agreement — infrastructure, cloud, managed services, cyber security, data and analytics, digital workspace, ERP, staffing, AMC and managed print.',
    keywords: 'IT services list, enterprise IT capabilities, IT solutions provider India, managed services and cloud',
    priority: '0.9',
    changefreq: 'monthly',
    graph: [
      breadcrumb([{ name: 'Home', path: '/' }, { name: 'Capabilities', path: '/capabilities' }]),
      {
        '@type': 'CollectionPage',
        name: 'Karpexa capabilities',
        url: abs('/capabilities'),
        hasPart: capabilities.map((c) => ({
          '@type': 'Service',
          name: c.title,
          description: c.short,
          url: abs(`/capabilities/${c.slug}`),
        })),
      },
    ],
  },
  ...capabilities.map((c) => ({
    path: `/capabilities/${c.slug}`,
    title: c.seo.title,
    description: c.seo.description,
    keywords: c.seo.keywords,
    priority: '0.8',
    changefreq: 'monthly',
    graph: [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Capabilities', path: '/capabilities' },
        { name: c.title, path: `/capabilities/${c.slug}` },
      ]),
      serviceLd(c),
      faqLd(c.faqs),
    ],
  })),
  {
    path: '/sectors',
    title: 'Industries We Serve | IT for BFSI, Healthcare, Manufacturing & GCCs',
    description:
      'Sector-specific IT delivery for global capability centres, healthcare and life sciences, banking and financial services, manufacturing, automotive, retail, technology, media and startups.',
    keywords: 'IT services for BFSI, healthcare IT services India, manufacturing IT solutions, GCC IT partner, retail IT infrastructure',
    priority: '0.8',
    changefreq: 'monthly',
    graph: [
      breadcrumb([{ name: 'Home', path: '/' }, { name: 'Sectors', path: '/sectors' }]),
      {
        '@type': 'CollectionPage',
        name: 'Industries served by Karpexa',
        url: abs('/sectors'),
        hasPart: sectors.map((s) => ({ '@type': 'Thing', name: s.name, description: s.text })),
      },
    ],
  },
  {
    path: '/our-work',
    title: 'Our Work | GPU & AI Server Infrastructure, HPC and Government-Scale Storage',
    description:
      'Karpexa builds GPU-accelerated AI servers, HPC platforms and high-capacity storage infrastructure for demanding technology, government, defence, aerospace and academic environments.',
    keywords:
      'GPU server infrastructure India, AI HPC infrastructure provider, high performance computing infrastructure, government storage infrastructure, defence research infrastructure, academic HPC storage',
    priority: '0.75',
    changefreq: 'monthly',
    graph: [
      breadcrumb([{ name: 'Home', path: '/' }, { name: 'Our Work', path: '/our-work' }]),
      {
        '@type': 'CollectionPage',
        name: 'Karpexa infrastructure work',
        url: abs('/our-work'),
        about: { '@id': `${SITE_URL}/#organization` },
        hasPart: [
          { '@type': 'Thing', name: 'GPU & AI Server Infrastructure', description: 'GPU-accelerated AI servers, HPC and enterprise infrastructure for AI, deep-learning, simulation and research workloads.' },
          { '@type': 'Thing', name: 'Government & Academic Storage Infrastructure', description: 'High-capacity enterprise storage, servers and data-centre infrastructure for government, defence, aerospace and academic organisations.' },
        ],
      },
    ],
  },
  {
    path: '/company',
    title: 'About Karpexa Technologies | Our Story, Values & Commitments',
    description:
      'Karpexa Technologies is an engineering-led IT firm built for mid-sized organisations — senior engineers on every engagement, vendor-neutral advice and documentation you own.',
    keywords: 'about Karpexa, IT consulting company Bengaluru, IT services company India, technology partner Bengaluru, IT services company profile',
    priority: '0.7',
    changefreq: 'yearly',
    graph: [
      breadcrumb([{ name: 'Home', path: '/' }, { name: 'About us', path: '/company' }]),
      { '@type': 'AboutPage', name: 'About Karpexa Technologies', url: abs('/company'), mainEntity: { '@id': `${SITE_URL}/#organization` } },
    ],
  },
  {
    path: '/contact',
    title: 'Contact Karpexa Technologies | Talk to an Engineer',
    description:
      'Start a conversation with Karpexa Technologies. Tell us where your technology is today and we will come back with a clear, practical next step — usually within one business day.',
    keywords: 'contact IT services company, IT consulting enquiry India, Karpexa contact',
    priority: '0.7',
    changefreq: 'yearly',
    graph: [
      breadcrumb([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
      { '@type': 'ContactPage', name: 'Contact Karpexa', url: abs('/contact'), mainEntity: { '@id': `${SITE_URL}/#organization` } },
    ],
  },
];

export const routeMap = Object.fromEntries(routes.map((r) => [r.path, r]));

export const getRouteMeta = (pathname) => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return (
    routeMap[clean] || {
      path: clean,
      title: 'Page not found | Karpexa Technologies',
      description: 'The page you are looking for does not exist. Explore Karpexa’s IT capabilities instead.',
      keywords: '',
      noindex: true,
      graph: [],
    }
  );
};

export const buildJsonLd = (route) => ({
  '@context': 'https://schema.org',
  '@graph': route.graph || [],
});

export { SITE_URL, OG_IMAGE };