import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

export async function POST(request) {
    if (process.env.NODE_ENV !== 'production') {
        try {
            const formData = await request.formData();
            const postDataJSON = formData.get('postData');

            if (!postDataJSON) {
                return new Response(JSON.stringify({ error: 'Missing post data' }), { status: 400 });
            }

            const postData = JSON.parse(postDataJSON);

            const dateObj = new Date();
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const year = dateObj.getFullYear().toString();

            const baseDir = path.join(process.cwd(), 'public', 'blog', `${year}`, `${month}`);
            console.log("path => ", baseDir);
            const dataDir = path.join(baseDir, 'data');

            // Ensure the year/month/data folders exist
            await fsPromises.mkdir(dataDir, { recursive: true });

            let featuredImagePath = '';
            const featuredImage = formData.get('featuredImage');
            if (featuredImage) {
                const featuredImageBuffer = Buffer.from(await featuredImage.arrayBuffer());
                const featuredImageName = featuredImage.name.replace(/\s+/g, '_');
                const featuredImageUploadPath = path.join(dataDir, featuredImageName);

                await fsPromises.writeFile(featuredImageUploadPath, featuredImageBuffer);
                featuredImagePath = `/blog/${year}/${month}/data/${featuredImageName}`;
            }

            const mdxMetadata = `---\nslug: '${postData.slug || ''}'\ntitle: '${postData.title || ''}'\ndesc: '${postData.desc || ''}'\nauthor: '${postData.authorId || ''}'\ntags: ${JSON.stringify(postData.tagsId || [])}\ncategory: ${JSON.stringify(postData.categoriesId || [])}\npostType: '${postData.postType || ''}'\nimage: '${featuredImagePath || ''}'\ndate: '${postData.date || new Date().toISOString()}'\npublishdate: '${postData.publishdate || new Date().toISOString()}'\nstatus: '${postData.status || ''}'\n---\n\n`;

            let mdxPath = '';
            const MDXContent = formData.get('MDXContent');
            if (MDXContent) {
                const mdxFileName = postData.slug + `.mdx`;  // Name of the MDX file
                const mdxUploadPath = path.join(baseDir, mdxFileName);  // Path to save the MDX file

                const mdxWithMetadata = mdxMetadata + MDXContent;  // Combine metadata with MDX content
                await fsPromises.writeFile(mdxUploadPath, mdxWithMetadata);

                mdxPath = `/public/blog/${year}/${month}/${mdxFileName}`;
            }

            if (mdxPath) {
                postData.mdxPath = mdxPath; 
            }

            if (featuredImagePath) {
                postData.featuredImage = featuredImagePath;
            }

            let blogImagePaths = [];
            const blogImages = formData.getAll('blogImages');
            if (blogImages.length > 0) {
                for (const blogImage of blogImages) {
                    const blogImageBuffer = Buffer.from(await blogImage.arrayBuffer());
                    const blogImageName = blogImage.name.replace(/\s+/g, '_');
                    const blogImageUploadPath = path.join(dataDir, blogImageName);

                    await fsPromises.writeFile(blogImageUploadPath, blogImageBuffer);
                    blogImagePaths.push(`/blog/${year}/${month}/data/${blogImageName}`);
                }
            }

            if (blogImagePaths.length > 0) {
                postData.blogResources = blogImagePaths;
            }

            let audioFilePath = '';
            const audioFiles = formData.getAll('audioUrl');
            if (audioFiles.length > 0) {
                for (const audioFile of audioFiles) {
                    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
                    const audioFileName = audioFile.name.replace(/\s+/g, '_');
                    const audioFileUploadPath = path.join(dataDir, audioFileName);

                    await fsPromises.writeFile(audioFileUploadPath, audioBuffer);

                    audioFilePath = `/blog/${year}/${month}/data/${audioFileName}`;
                    break;
                }
            }

            if (audioFilePath) {
                postData.audioUrl = audioFilePath;
            }

            let videoFilePaths = [];
            const videoFiles = formData.getAll('videoFile');
            if (videoFiles.length > 0) {
                for (const videoFile of videoFiles) {
                    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
                    const videoFileName = videoFile.name.replace(/\s+/g, '_');
                    const videoFileUploadPath = path.join(dataDir, videoFileName);

                    await fsPromises.writeFile(videoFileUploadPath, videoBuffer);
                    videoFilePaths.push(`/blog/${year}/${month}/data/${videoFileName}`);
                }
            }

            if (videoFilePaths.length > 0) {
                postData.videoFiles = videoFilePaths;
            }

            delete postData.MDXContent;
            
            const filePath = path.join(process.cwd(), 'src', 'data', 'jsons', 'blogs.json');
            const data = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
            let posts = JSON.parse(data);
            posts.push(postData);

            await fsPromises.mkdir(path.dirname(filePath), { recursive: true });

            fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');

            return new Response(JSON.stringify({ message: 'Post and files saved successfully' }), { status: 200 });
        } catch (error) {
            console.error('Error saving post data:', error);
            return new Response(JSON.stringify({ error: 'Failed to save post data' }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: 'Cannot perform file operations during static export' }), { status: 400 });
    }
}
