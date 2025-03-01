import allblogs from '@/data/jsons/blogs.json'
import allauthors from '@/data/jsons/authors.json'
import allcategories from '@/data/jsons/categories.json'
import { PostDataType } from './types'
import { BLOG_AUTHORS } from './authors'
import { BlogDataType, Tag } from './datatypes'

const CATEGORIES = allcategories || []

const AUTHORS = allauthors || []

const BLOG_LISTING = allblogs
	.filter((post) => post.status === 'published')
	.map((post): BlogDataType => {
		const author = AUTHORS.find((user) => user.slug === post.authorId)

		const categories = Array.isArray(post.categoriesId)
			? post.categoriesId.map((slug) =>
					CATEGORIES.find((category) => category.slug === slug),
				)
			: []

		return {
			...post,
			author: BLOG_AUTHORS.filter((user) => user.slug === post.authorId)[0] || author || null,
			categories: categories.filter(Boolean),
		}
	})

const HIGHLIGHT_BLOGS = BLOG_LISTING
    .filter((post) => post?.ishighlight === "true");

console.log(BLOG_LISTING?.[0]);

CATEGORIES.forEach((category) => {
	category.count = BLOG_LISTING.reduce((acc, post) => {
		if (
			Array.isArray(post.categoriesId) &&
			post.categoriesId.includes(category.slug as any)
		) {
			return acc + 1
		}
		return acc
	}, 0)
})

const TAGSWITHCOUNT = allblogs
	.filter((post) => post.status === 'published')
	.reduce<Tag[]>((tagsAccumulator, post) => {
		if (Array.isArray(post.tagsId)) {
			post.tagsId.forEach((tag: string) => {
				const slug = tag.toLowerCase().replace(/\s+/g, '-')
				const existingTag = tagsAccumulator.find(
					(tagObj) => tagObj.slug === slug,
				)

				if (existingTag) {
					existingTag.count = (parseInt(existingTag.count) + 1).toString()
				} else {
					tagsAccumulator.push({
						id: (tagsAccumulator.length + 1).toString(),
						slug: slug,
						name: tag,
						href: `/tag/${slug}`,
						thumbnail: '',
						count: '1',
						color: '',
					})
				}
			})
		}

		return tagsAccumulator.sort((a, b) => parseInt(b.count) - parseInt(a.count))
	}, [])

export { BLOG_LISTING, CATEGORIES, AUTHORS, TAGSWITHCOUNT, HIGHLIGHT_BLOGS }

// import allblogs from '@/data/jsons/blogs.json';
// import allauthors from '@/data/jsons/authors.json';
// import allcategories from '@/data/jsons/categories.json';
// import { BlogDataType } from './datatypes';

// const CATEGORIES = allcategories || [];
// const AUTHORS = allauthors || [];

// // ✅ Function to Get Filtered Blogs Dynamically
// const getFilteredBlogs = (filters: {
//     highlight?: boolean;
//     contentType?: string;
//     postType?: string;
//     category?: string;
//     tag?: string;
//     sortByViews?: boolean;
// } = {}): BlogDataType[] => {
//     let filteredBlogs = allblogs.filter((post) => post.status === 'published');

//     // ✅ Filter by Highlighted Blogs
//     if (filters.highlight) {
//         filteredBlogs = filteredBlogs.filter((post) => post.ishighlight === "true");
//     }

//     // ✅ Filter by Content Type (e.g., 'free', 'login', 'subscribed')
//     if (filters.contentType) {
//         filteredBlogs = filteredBlogs.filter((post) =>
//             post.contentType?.split(', ').includes(filters.contentType as string)
//         );
//     }

//     // ✅ Filter by Post Type (e.g., 'standard', 'audio', 'video')
//     if (filters.postType) {
//         filteredBlogs = filteredBlogs.filter((post) =>
//             post.postType?.split(', ').includes(filters.postType as string)
//         );
//     }

//     // ✅ Filter by Category ID
//     if (filters.category) {
//         filteredBlogs = filteredBlogs.filter((post) =>
//             post.categoriesId.includes(filters.category as string)
//         );
//     }

//     // ✅ Filter by Tag ID
//     if (filters.tag) {
//         filteredBlogs = filteredBlogs.filter((post) =>
//             post.tagsId.includes(filters.tag as string)
//         );
//     }

//     // ✅ Sort by Most Viewed
//     if (filters.sortByViews) {
//         filteredBlogs = filteredBlogs.sort((a, b) => b.viewdCount - a.viewdCount);
//     }

//     return filteredBlogs.map((post) => {
//         const author = AUTHORS.find((user) => user.slug === post.authorId);
//         const categories = Array.isArray(post.categoriesId)
//             ? post.categoriesId.map((slug) =>
//                 CATEGORIES.find((category) => category.slug === slug)
//             )
//             : [];

//         return {
//             ...post,
//             author: author || null,
//             categories: categories.filter(Boolean),
//         };
//     });
// };

// // ✅ Add `count` to Each Category
// CATEGORIES.forEach((category) => {
//     category.count = allblogs.reduce((acc, post) => {
//         if (Array.isArray(post.categoriesId) && post.categoriesId.includes(category.slug as any)) {
//             return acc + 1;
//         }
//         return acc;
//     }, 0);
// });

// // ✅ Export Data & Filters
// export { getFilteredBlogs, CATEGORIES, AUTHORS };

