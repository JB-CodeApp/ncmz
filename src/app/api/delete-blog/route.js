import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const { slug } = await req.json();
        const filePath = path.join(process.cwd(), 'src', 'data', 'jsons', 'blogs.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        const updatedData = data.map(blog =>
            blog.slug === slug ? { ...blog, deletedAt: new Date().toISOString() } : blog
        );
        
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
        return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error deleting blog', error: error.message }), { status: 500 });
    }
}