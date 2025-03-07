import { blogslugmatched } from '@/data/blogs';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const { slug, ...updatedFields } = await req.json();
    // console.log(updatedFields)
    const filePath = path.join(process.cwd(), 'src', 'data', 'jsons', 'blogs.json');

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const existingPost = blogslugmatched(slug);
    if (!existingPost) return new Response(JSON.stringify({ error: 'Blog post not found' }), { status: 404 });

    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    if (updatedFields.publishedAt) updatedFields.publishedAt = now;

    // Handle Featured Image Upload
    if (updatedFields.image) {
      // const uploadDir = path.join(process.cwd(), 'public', 'blog', `${year}`, `${month}`, 'data');
      // await fsPromises.mkdir(uploadDir, { recursive: true });

      const imageName = updatedFields.image;
      // const imagePath = path.join(uploadDir, imageName);

      // if (!imagePath.includes('.')) throw new Error(`❌ Invalid image path: ${imagePath}`);

      // await fsPromises.writeFile(imagePath, Buffer.from(await updatedFields.image.arrayBuffer()));
      updatedFields.featuredImage = `/blog/${year}/${month}/data/${imageName}`;
    }
    const formatDate = (dateString) =>
      new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    const formattedPublishedAt = formatDate(existingPost.publishedAt);
    const formattedUpdatedAt = formatDate(existingPost.updatedAt);

    // Handle MDX Content Update
    if (updatedFields.MDXContent) {
      const mdxFilePath = updatedFields.mdxPath?.replace('/public', '') || '';
      if (!mdxFilePath.includes('.mdx')) throw new Error(`❌ Invalid MDX file path: ${mdxFilePath}`);

      const mdxFullPath = path.join(process.cwd(), 'public', mdxFilePath);
      await fsPromises.mkdir(path.dirname(mdxFullPath), { recursive: true });

      const mdxMetadata = `---
slug: '${slug}'
title: '${updatedFields.title || existingPost.title}'
desc: '${updatedFields.desc || existingPost.desc}'
author: '${updatedFields.authorId || existingPost.authorId}'
tags: ${JSON.stringify(updatedFields.tagsId || existingPost.tagsId)}
category: ${JSON.stringify(updatedFields.categoriesId || existingPost.categoriesId)}
postType: '${updatedFields.postType || existingPost.postType}'
image: '${updatedFields.featuredImage || existingPost.image}'
date: '${formattedPublishedAt}'
updatedate: '${formattedUpdatedAt}'
status: '${updatedFields.status || existingPost.status}'
---
`;

      const mdxWithMetadata = mdxMetadata + updatedFields.MDXContent;
      await fsPromises.writeFile(mdxFullPath, mdxWithMetadata);
    }

    // Update JSON Data
    const updatedData = data.map(blog =>
      blog.slug === slug
        ? { ...blog, ...updatedFields, publishdate: formattedDate }
        : blog
    );

    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    return new Response(JSON.stringify({ message: 'Blog updated successfully' }), { status: 200 });
  } catch (error) {
    console.error('❌ Error updating blog:', error);
    return new Response(JSON.stringify({ error: 'Failed to update blog', details: error.message }), { status: 500 });
  }
}
