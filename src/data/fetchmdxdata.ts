import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const fetchSingleMdxFile = async (mdxFile: string) => {
    try {
      const mdxPath = path.join(process.cwd(), mdxFile.replace(/^\/+/, ""));
  
      if (!fs.existsSync(mdxPath)) {
        console.error(`❌ MDX file not found at path: ${mdxPath}`);
        return null;
      }
  
      const fileContent = await fs.promises.readFile(mdxPath, 'utf-8');
      
      const { data: frontmatter, content } = matter(fileContent);
  
      return { frontmatter, content };
    } catch (error) {
      console.error("❌ Error fetching MDX file:", error);
      return null;
    }
  };
  export {fetchSingleMdxFile}