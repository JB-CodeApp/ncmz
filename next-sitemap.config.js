/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
  generateRobotsTxt: true, // Generates robots.txt
  // sitemapSize: 5000,
  generateIndexSitemap: true,
  outDir: './public',
  exclude: ["/api/*", "/admin/*", "/author/*", "/blog/*", "/category/*", "/tag/*", "/dashboard/*", "/login", "/dashboard"], // Exclude unnecessary paths
  // additionalSitemaps: [
  //   `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog-sitemap.xml`, // Blog listing sitemap
  //   `${process.env.SITE_URL || 'https://bhumikaios.com'}/authors-sitemap.xml`, // Authors sitemap
  //   `${process.env.SITE_URL || 'https://bhumikaios.com'}/tags-sitemap.xml`, // Tags sitemap
  //   `${process.env.SITE_URL || 'https://bhumikaios.com'}/category-sitemap.xml`, // Pages sitemap
  // ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://bhumikaios.com'}/blog-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://bhumikaios.com'}/authors-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://bhumikaios.com'}/tags-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://bhumikaios.com'}/category-sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    let lastmod = new Date().toISOString();
    
    const metadata = require('./src/data/seodata/seometadata.json');
    const lastSegment = path.split('/').pop();

    // GENERAL STATIC PAGE EXAMPLE aBOUT, CONTACT PAGES 
    metadata.forEach(item => {
      if (lastSegment === item.page_title) {
        const createdDate = new Date(item.created_date);
        const updatedDate = new Date(item.updated_date);

        if (!isNaN(createdDate) && !isNaN(updatedDate)) {
          lastmod = updatedDate > createdDate ? updatedDate.toISOString() : createdDate.toISOString();
        } else {
          console.log("Invalid date(s), using fallback. and use this ", lastmod);
        }
      }
    });

    return {
      loc: path,
      lastmod,
      changefreq: 'weekly',
      priority: 0.7,
    };
  },
};

module.exports = config;
