import allblogs from '@/data/jsons/blogs.json';
import allauthors from '@/data/jsons/authors.json';
import allcategories from '@/data/jsons/categories.json';
import alltags from '@/data/jsons/tags.json';

import { BlogDataType } from './datatypes';

const CATEGORIES = allcategories || [];
const AUTHORS = allauthors || [];
const TAGS = alltags || [];

const publishandnotdeleteBlogs = allblogs.filter((post) => post.status === 'published' && post.deletedAt === "");


//  Function to Get Filtered Blogs Dynamically
const getFilteredBlogs = (filters: {
    highlight?: boolean;
    contentType?: string;
    postType?: string;
    category?: string;
    tag?: string;
    sortByViews?: boolean;
	latestblogs?: boolean;
} = {}) => {
	let filteredBlogs = publishandnotdeleteBlogs

    //  Filter by Highlighted Blogs
    if (filters.highlight) {
        filteredBlogs = filteredBlogs.filter((post) => post.ishighlight === "true");
    }

    //  Filter by Content Type (e.g., 'free', 'login', 'subscribed')
    if (filters.contentType) {
        filteredBlogs = filteredBlogs.filter((post) =>
            post.contentType?.split(', ').includes(filters.contentType as string)
        );
    }

    //  Filter by Post Type (e.g., 'standard', 'audio', 'video')
    if (filters.postType) {
        filteredBlogs = filteredBlogs.filter((post) =>
            post.postType?.split(', ').includes(filters.postType as string)
        );

		if (filters.postType !== 'standard') {
			filteredBlogs = filteredBlogs.filter((post) => post.postTypeUrl);
		}
    }

    //  Filter by Category ID
    if (filters.category) {
        filteredBlogs = filteredBlogs.filter((post) =>
            post.categoriesId.includes(filters.category as string)
        );
    }

    //  Filter by Tag ID
    if (filters.tag) {
        filteredBlogs = filteredBlogs.filter((post) =>
            post.tagsId.includes(filters.tag as string)
        );
    }

    //  Sort by Most Viewed
    if (filters.sortByViews) {
        filteredBlogs = filteredBlogs.sort((a, b) => b.viewdCount - a.viewdCount);
    }

	//  Sort by Latest Viewed
    if (filters.latestblogs) {
        filteredBlogs = filteredBlogs.sort((a, b) => new Date(b.publishedAt || b.createdAt || 0).getTime() - new Date(a.publishedAt || a.createdAt || 0).getTime());
    }

    return filteredBlogs.map((post) => {
        const author = AUTHORS.find((user) => user.slug === post.authorId);
        const categories = Array.isArray(post.categoriesId)
            ? post.categoriesId.map((slug) =>
                CATEGORIES.find((category) => category.slug === slug)
            )
            : [];

        return {
            ...post,
            author: author || "",
            categories: categories.filter(Boolean),
        };
    });
};

//  Add `count` to Each Category
CATEGORIES.forEach((category) => {
    category.count = publishandnotdeleteBlogs.reduce((acc, post) => {
        if (Array.isArray(post.categoriesId) && post.categoriesId.includes(category.slug as any)) {
            return acc + 1;
        }
        return acc;
    }, 0);
});

const BLOGTAGSWITHCOUNT = TAGS.map((tag) => {
    const count = publishandnotdeleteBlogs
        .reduce((acc, post) => {
            if (Array.isArray(post.tagsId) && post.tagsId.includes(tag.slug as any)) {
                return acc + 1;
            }
            return acc;
        }, 0);

    return { ...tag, count };
})
.sort((a, b) => b.count - a.count); 

// console.log(BLOGTAGSWITHCOUNT)

const mostViewedBlogs = getFilteredBlogs({ sortByViews: true });

const latestBlogs = getFilteredBlogs({ latestblogs: true });


function matchedblogs(slug: string | string[]) {
    const slugArray = Array.isArray(slug) ? slug : [slug];

    if (slugArray.includes("All items")) {
      return mostViewedBlogs;
    }

    return mostViewedBlogs.filter((post) => {
      const lowerCaseSlugArray = slugArray.map(s => s.toLowerCase());
      return post.categoriesId?.some((category: string) =>
        lowerCaseSlugArray.includes(category.toLowerCase())
      );
    });
  }

// function paginationblogs(POSTS_PER_PAGE: number, currentPage: number) {
// 	const indexOfLastPost = currentPage * POSTS_PER_PAGE;
// 	const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
// 	const currentPosts = mostViewedBlogs.slice(indexOfFirstPost, indexOfLastPost);
// 	return currentPosts;
// }

function paginationblogs({ POSTS_PER_PAGE, currentPage }: { POSTS_PER_PAGE: number; currentPage: number }) {
    return getFilteredBlogs().slice(0, POSTS_PER_PAGE * currentPage);
}


export { 
	getFilteredBlogs, 
	matchedblogs, 
	paginationblogs,
	mostViewedBlogs, 
	latestBlogs, 
	CATEGORIES, 
	AUTHORS, 
	TAGS, 
	BLOGTAGSWITHCOUNT ,
	allblogs
};