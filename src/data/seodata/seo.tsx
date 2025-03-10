"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Defaultseo from "./Defaultseo.json";
import { BlogjsonLd } from "./LdjsonArray";
import SEOMetadata from "./seometadata.json";
import { allblogs, AUTHORS } from "../blogs";

interface FaqItem {
  question: string;
  answer: string;
}

interface CustomMetadata {
  updatedAt: string;
  publishedAt: string;
  seo_title?: string;
  seo_description?: string;
  seo_keyword?: string;
  og_image?: string;
  json_ld: string[];
  faq: FaqItem[];
  product?: any[];
}

interface SEOProps {
  slug: string;
}

export default function SEO({ slug }: SEOProps) {
  const siteURL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://bhumikaios.com";

  const [breadcrumbJsonLd, setBreadcrumbJsonLd] = useState<string | null>(null);
  const [isBlogPage, setIsBlogPage] = useState(false);
  const [metadata, setMetadata] = useState<CustomMetadata>({
    updatedAt: "",
    publishedAt: "",
    seo_title: "",
    seo_description: "",
    seo_keyword: "",
    og_image: "",
    json_ld: [],
    faq: [],
    product: [],
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pathname = window.location.pathname;
    setIsBlogPage(pathname.startsWith("/blog/"));

    const generateBreadcrumbs = () => {
      const pathArray = pathname.split("/").filter(Boolean);
      return [
        { "@type": "ListItem", position: 1, name: "Home", item: siteURL + "/" },
        ...pathArray.map((segment, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: segment.charAt(0).toUpperCase() + segment.slice(1),
          item: `${siteURL}/${pathArray.slice(0, index + 1).join("/")}`,
        })),
      ];
    };

    const fetchMetadata = () => {
      let pageMetadata: CustomMetadata | any = SEOMetadata.find((page: any) => page.page_title === slug);

      if (!pageMetadata) {
        if (pathname.startsWith("/category")) {
          pageMetadata = SEOMetadata.find((page: any) => page.page_title === "category");
        } else if (pathname.startsWith("/tag")) {
          pageMetadata = SEOMetadata.find((page: any) => page.page_title === "tag");
        }
      }

      if (!pageMetadata) {
        const blogMatch = allblogs.find((blog: any) => blog.slug === slug);
        if (blogMatch) {
          pageMetadata = {
            seo_title: blogMatch.title,
            seo_description: blogMatch.seo?.seoDesc || blogMatch.desc,
            seo_keyword: blogMatch.tagsId?.join(", ") || "",
            og_image: blogMatch.featuredImage,
            json_ld: Array.isArray(blogMatch.seo?.jsonLD) ? blogMatch.seo.jsonLD : blogMatch.seo?.jsonLD ? [blogMatch.seo.jsonLD] : [],
            faq: blogMatch.faqs || [],
            publishedAt: blogMatch.publishedAt || new Date().toISOString(),
            updatedAt: blogMatch.updatedAt || new Date().toISOString(),
            product: [],
          };
        }
      }

      if (!pageMetadata) {
        const authorMatch = AUTHORS.find((author: any) => author.slug === slug);
        if (authorMatch) {
          pageMetadata = {
            seo_title: authorMatch.displayName,
            seo_description: authorMatch.desc,
            seo_keyword: "Author, Writer, Blog",
            og_image: authorMatch.avatar,
            json_ld: [],
            faq: [],
            product: [],
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
          };
        }
      }

      if (pageMetadata) {
        setMetadata({
          ...pageMetadata,
          updatedAt: pageMetadata.updatedAt || new Date().toISOString(),
          publishedAt: pageMetadata.publishedAt || new Date().toISOString(),
        });
      }
    };

    setBreadcrumbJsonLd(
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: generateBreadcrumbs(),
      })
    );

    fetchMetadata();
  }, [slug]);

  const seoData = metadata.seo_title ? metadata : Defaultseo;
  const imageUrl = metadata.og_image ? `${siteURL}${metadata.og_image}` : `${siteURL}/${Defaultseo.images[0].url}`;

  // ✅ FAQ Schema Generation
  const FaqSchema = metadata.faq.length > 0
    ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": metadata.faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    }
    : null;

  return (
    <head>
      <title>{seoData.seo_title}</title>
      <meta name="description" content={seoData.seo_description} />
      <meta name="keywords" content={seoData.seo_keyword} />

      {/* <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} /> */}
      {typeof window !== "undefined" ? (
        <link rel="canonical" href={window.location.href} />
      ) : (
        null
      )}

      {/* SEO OG INFO */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_NAME || "Website"} />
      <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
      <meta property="og:title" content={seoData.seo_title} />
      <meta property="og:description" content={seoData.seo_description} />
      <meta property="og:image" content={imageUrl} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="og:image:alt" content={process.env.NEXT_PUBLIC_SITE_NAME || "Website"} />
      <meta name="og:image:type" content="image/webp" />

      {/* SEO TWITTER INFO */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter :title" content={seoData.seo_title} />
      <meta property="twitter:site_name" content={process.env.NEXT_PUBLIC_SITE_NAME || "Website"} />
      <meta property="twitter:url" content={typeof window !== "undefined" ? window.location.href : ""} />
      <meta property="twitter:description" content={seoData.seo_description} />
      <meta property="twitter:image" content={imageUrl} />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <meta name="twitter:image:alt" content={process.env.NEXT_PUBLIC_SITE_NAME || "Website"} />
      <meta name="twitter:image:type" content="image/webp" />

      <meta name="robots" content="index, follow" />

      {isBlogPage && (
        <>
          <meta property="article:published_time" content={metadata.publishedAt || new Date().toISOString()} />
          <meta property="article:modified_time" content={metadata.updatedAt || new Date().toISOString()} />
        </>
      )}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            isBlogPage
              ? {
                ...(BlogjsonLd[0] ? JSON.parse(BlogjsonLd[0]) : {}),
                datePublished: metadata.publishedAt || new Date().toISOString(),
                dateModified: metadata.updatedAt || new Date().toISOString(),
              }
              : BlogjsonLd[0] ? JSON.parse(BlogjsonLd[0]) : {}
          ),
        }}
      />

      {/* FAQ JSON-LD */}
      {FaqSchema && metadata.faq &&
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(isBlogPage ? FaqSchema : metadata.faq) }}
        />}

      {/* Breadcrumb JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd ?? "" }} />

      {/* JSON-LD for Product */}
      {metadata.product && metadata.product.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata.product) }} />
      )}
    </head>
  );
}