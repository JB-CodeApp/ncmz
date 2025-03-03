import fs from "fs";
import path from "path";
import matter from "gray-matter";

const fetchmdxdata = (mdxFile: string) => {
    try {
      const mdxPath = path.join(process.cwd(), mdxFile.replace(/^public\//, ""));
      if (!fs.existsSync(mdxPath)) return null;
  
      const fileContent = fs.readFileSync(mdxPath, "utf-8");
      const { data: frontmatter, content } = matter(fileContent);
  
      return { frontmatter, content };
    } catch (error) {
      console.error("❌ Error fetching MDX file:", error);
      return null;
    }
  };

export { fetchmdxdata }
