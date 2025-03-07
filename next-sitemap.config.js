/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://bhumikaios.com',
  generateRobotsTxt: true, // Generates robots.txt
  sitemapSize: 5000,
  generateIndexSitemap: true,
  outDir: './public',
  exclude: ["/api/*", "/admin/*", "/author/*", "/blog/*", "/category/*", "/tag/*", "/dashboard/*", "/login", "/dashboard"], // Exclude unnecessary paths
  additionalSitemaps: [
    `${process.env.SITE_URL || 'https://bhumikaios.com'}/blog-sitemap.xml`, // Blog listing sitemap
    `${process.env.SITE_URL || 'https://bhumikaios.com'}/authors-sitemap.xml`, // Authors sitemap
    `${process.env.SITE_URL || 'https://bhumikaios.com'}/tags-sitemap.xml`, // Tags sitemap
    `${process.env.SITE_URL || 'https://bhumikaios.com'}/category-sitemap.xml`, // Pages sitemap
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://bhumikaios.com'}/blog-sitemap.xml`,
      `${process.env.SITE_URL || 'https://bhumikaios.com'}/authors-sitemap.xml`,
      `${process.env.SITE_URL || 'https://bhumikaios.com'}/tags-sitemap.xml`,
      `${process.env.SITE_URL || 'https://bhumikaios.com'}/category-sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    let lastmod = new Date(); // Default lastmod

    const metadata = require('./src/data/seodata/seometadata.json'); // Your SEO metadata
    const lastSegment = path.split('/').pop(); // Get last segment of path

    // Loop through metadata to match the page
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

    // Handling specific path patterns

    // Blog Listing Pages (/blog)
    if (path.startsWith('/blog')) {
      return {
        loc: path,
        lastmod,
        changefreq: 'daily',
        priority: 0.9,
      };
    }

    // Authors Pages (/author)
    if (path.startsWith('/author')) {
      return {
        loc: path,
        lastmod,
        changefreq: 'monthly',
        priority: 0.8,
      };
    }

    // Tags Pages (/tag)
    if (path.startsWith('/tag')) {
      return {
        loc: path,
        lastmod,
        changefreq: 'weekly',
        priority: 0.7,
      };
    }

    // Static Pages (e.g., /about, /contact)
    if (path === '/about' || path === '/contact') {
      return {
        loc: path,
        lastmod,
        changefreq: 'monthly',
        priority: 0.6,
      };
    }

    return {
      loc: path,
      lastmod,
      changefreq: 'weekly',
      priority: 0.7,
    };
  },
};

module.exports = config;
