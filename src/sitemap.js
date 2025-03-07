const fs = require("fs");
const path = require("path");

const TAGS = require('./data/jsons/tags.json');
const BLOG_LISTING = require('./data/jsons/blogs.json');
const CATEGORIES = require('./data/jsons/categories.json');
const AUTHORS = require('./data/jsons/authors.json');

const formattedDate = new Date().toISOString(); 

const sitemapDir = './public';

const URL = 'https://bhumikaios.com';

if (!fs.existsSync(sitemapDir)) {
  fs.mkdirSync(sitemapDir, { recursive: true });
}

const generateSitemapXml = (urls) => {
  const urlSet = urls.map(({ loc, lastmod, changefreq, priority }) => {
    return `
      <url>
        <loc>${URL}${loc}</loc>
        <lastmod>${lastmod ? lastmod : formattedDate}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlSet}
  </urlset>`;
};

const generateBlogSitemap = () => {
  const blogUrls = BLOG_LISTING
    .filter((post) => post.status === 'published' && post.deletedAt === '')
    .map(blog => ({
      loc: `/blogs/${blog.slug}`,
      lastmod: blog.updatedAt > blog.publishedAt ? blog.updatedAt : blog.publishedAt,
      changefreq: 'daily',
      priority: 0.9,
    }));

  const sitemap = generateSitemapXml(blogUrls);
  fs.writeFileSync(path.join(sitemapDir, 'blog-sitemap.xml'), sitemap);
};

const generateAuthorsSitemap = () => {
  const authorUrls = AUTHORS
  .filter((post) => post.status === 'active')
  .map(author => ({
    loc: `/author/${author.slug}`,
    lastmod: author.updated_at || author.created_at,
    changefreq: 'monthly',
    priority: 0.8,
  }));

  const sitemap = generateSitemapXml(authorUrls);
  fs.writeFileSync(path.join(sitemapDir, 'authors-sitemap.xml'), sitemap);
};

const generateCategoriesSitemap = () => {
  const categoryUrls = CATEGORIES.map(category => ({
    loc: `/category/${category.slug}`,
    lastmod: formattedDate,
    changefreq: 'weekly',
    priority: 0.8,
  }));

  const sitemap = generateSitemapXml(categoryUrls);
  fs.writeFileSync(path.join(sitemapDir, 'category-sitemap.xml'), sitemap);
};

const generateTagsSitemap = () => {
  const tagUrls = TAGS.map(tag => ({
    loc: `/tag/${tag.slug}`,
    lastmod: formattedDate,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const sitemap = generateSitemapXml(tagUrls);
  fs.writeFileSync(path.join(sitemapDir, 'tags-sitemap.xml'), sitemap);
};

const generateSitemaps = () => {
  generateBlogSitemap();
  generateAuthorsSitemap();
  generateCategoriesSitemap();
  generateTagsSitemap();
};
console.log('Generated All Sitemaps...');

generateSitemaps();