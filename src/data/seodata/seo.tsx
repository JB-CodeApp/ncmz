"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Defaultseo from "./Defaultseo.json";
import SEOMetadata from "./seometadata.json";
import { BlogjsonLd } from "./LdjsonArray"

interface CustomMetadata {
  seo_title?: string;
  seo_description?: string;
  seo_keyword?: string;
  og_image?: string;
  json_ld?: string;
  faq?: any[];
  product?: any[];
}

export default function SEO({ slug }: { slug: string }) {
  const siteURL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://bhumikaios.com";

  const [breadcrumbJsonLd, setBreadcrumbJsonLd] = useState<string | null>(null);

  const [metadata, setMetadata] = useState<CustomMetadata>({});

  useEffect(() => {
    const generateBreadcrumbs = () => {
      const pathArray = window.location.pathname.split('/').filter((segment) => segment !== '');

      const breadcrumbItems = pathArray.map((segment, index) => {
        const url = `${siteURL}/${pathArray.slice(0, index + 1).join('/')}`;
        return {
          "@type": "ListItem",
          "position": index + 2,
          "name": segment.charAt(0).toUpperCase() + segment.slice(1),
          "item": (index === 2) ? siteURL + window.location.pathname : url,
        };
      });

      const homeBreadcrumb = {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteURL + '/'
      };

      return [homeBreadcrumb, ...breadcrumbItems];
    };

    const fetchMetadata = () => {
      const pageMetadata = SEOMetadata.find((page) => page.page_title === slug) || {};
      setMetadata(pageMetadata);
    };

    const breadcrumbListSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": generateBreadcrumbs()
    };
    setBreadcrumbJsonLd(JSON.stringify(breadcrumbListSchema));

    fetchMetadata();
  }, [slug]);

  const seoData = metadata.seo_title ? metadata : Defaultseo;
  const imageUrl = metadata.og_image ? `${siteURL}/${metadata.og_image}` : `${siteURL}/${Defaultseo.images[0].url}`;

  return (
    <head>
      <title>{seoData.seo_title}</title>
      <meta name="description" content={seoData.seo_description} />
      <meta name="keywords" content={seoData.seo_keyword} />

      <meta property="og:title" content={seoData.seo_title} />
      <meta property="og:description" content={seoData.seo_description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={`${siteURL}/${slug}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.seo_title} />
      <meta name="twitter:description" content={seoData.seo_description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON/LD */}

      {/* Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: BlogjsonLd ?? '' }}
      />

      {/* BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd ?? '' }}
      />

      {/* SEO json from FAQs */}
      {metadata.faq && metadata.faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata.faq) }} />
      )}

      {/* SEO json from JSONLD */}
      {metadata.json_ld && metadata.json_ld.length > 0 && (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: metadata.json_ld || [] }}
        />
      )}

      {/* SEO json from Product */}
      {metadata.product && metadata.product.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata.product) }} />
      )}

    </head>
  );
}
