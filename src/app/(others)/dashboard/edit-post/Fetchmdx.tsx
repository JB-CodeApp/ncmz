const getMdxContentBySlug = async (mdxFilePath: string): Promise<string | null> => {
    // console.log(mdxFilePath)
    try {
        const res = await fetch(`/api/get-mdx?path=${encodeURIComponent(mdxFilePath)}`);
        const data = await res.json();

        if (res.ok && data.content) {
            return data.content;
        } else {
            console.error("❌ Error fetching MDX content:", data.error);
            return null;
        }
    } catch (error) {
        console.error("❌ Fetch failed:", error);
        return null;
    }
};

export default getMdxContentBySlug;
