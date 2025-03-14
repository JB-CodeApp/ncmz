import allblogs from '@/data/jsons/blogs.json'
import allauthors from '@/data/jsons/authors.json'
import allcategories from '@/data/jsons/categories.json'
import alltags from '@/data/jsons/tags.json'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { BlogDataType } from './datatypes'

const formatDate = (dateString: string) =>
	new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

const getNextIndexAndId = (allblogs: any[]) => {
	// const lastBlog = allblogs.length > 0 ? allblogs[allblogs.length - 1] : null;
	// const nextIndex = lastBlog ? lastBlog.index + 1 : 1;
	const nextIndex = allblogs.length + 1
	const newId =
		Date.now().toString(36) + Math.random().toString(36).substr(2, 9)

	return { index: nextIndex, id: newId }
}

const CATEGORIES = allcategories || []
const AUTHORS = allauthors.filter((author) => author.status === 'active') || []
const TAGS = alltags || []

const allblogwithlatest = allblogs
	.sort(
		(a, b) =>
			new Date(b.publishedAt || b.createdAt || 0).getTime() -
			new Date(a.publishedAt || a.createdAt || 0).getTime(),
	)
	.map((blog) => ({
		...blog,
		publishedAt: blog.publishedAt ? formatDate(blog.publishedAt) : '',
		createdAt: blog.createdAt ? formatDate(blog.createdAt) : '',
	}))

// published and deletedAt empty blogs fetch only
const publishandnotdeleteBlogs = allblogs
	.filter((post) => post.status === 'published' && post.deletedAt === '')
	.map((blog) => ({
		...blog,
		publishedAt: blog.publishedAt ? formatDate(blog.publishedAt) : '',
		createdAt: blog.createdAt ? formatDate(blog.createdAt) : '',
	}))

// Blog Detail Page
const fetchSingleMdxFile = async (mdxFile: string) => {
	try {
		const mdxPath = path.join(process.cwd(), mdxFile.replace(/^\/+/, ''))

		if (!fs.existsSync(mdxPath)) {
			console.error(`❌ MDX file not found at path: ${mdxPath}`)
			return null
		}

		const fileContent = await fs.promises.readFile(mdxPath, 'utf-8')

		const { data: frontmatter, content } = matter(fileContent)

		return { frontmatter, content }
	} catch (error) {
		console.error('❌ Error fetching MDX file:', error)
		return null
	}
}

//  Function to Get Filtered Blogs Dynamically
const getFilteredBlogs = (
	filters: {
		highlight?: boolean
		contentType?: string
		postType?: string
		category?: string
		tag?: string
		sortByViews?: boolean
		latestblogs?: boolean
	} = {},
) => {
	let filteredBlogs = publishandnotdeleteBlogs

	//  Filter by Highlighted Blogs Only 5 Blog For Home Page Hero Section
	if (filters.highlight) {
		filteredBlogs = filteredBlogs
			.filter((post) => post.ishighlight === 'true')
			.slice(0, 5)
	}

	//  Filter by Content Type (e.g., 'free', 'login', 'subscribed')
	if (filters.contentType) {
		filteredBlogs = filteredBlogs.filter((post) =>
			post.contentType?.split(', ').includes(filters.contentType as string),
		)
	}

	//  Filter by Post Type (e.g., 'standard', 'audio', 'video')
	if (filters.postType) {
		filteredBlogs = filteredBlogs.filter((post) =>
			post.postType?.split(', ').includes(filters.postType as string),
		)

		if (filters.postType !== 'standard') {
			filteredBlogs = filteredBlogs.filter((post) => post.postTypeUrl)
		}
	}

	//  Filter by Category ID
	if (filters.category) {
		filteredBlogs = filteredBlogs.filter((post) =>
			post.categoriesId.includes(filters.category as never),
		)
	}

	//  Filter by Tag ID
	if (filters.tag) {
		filteredBlogs = filteredBlogs.filter((post) =>
			post.tagsId.includes(filters.tag as string),
		)
	}

	//  Sort by Most Viewed
	if (filters.sortByViews) {
		filteredBlogs = filteredBlogs.sort((a, b) => b.viewdCount - a.viewdCount)
	}

	//  Sort by Latest Viewed
	if (filters.latestblogs) {
		filteredBlogs = filteredBlogs.sort(
			(a, b) =>
				new Date(b.publishedAt || b.createdAt || 0).getTime() -
				new Date(a.publishedAt || a.createdAt || 0).getTime(),
		)
	}

	return filteredBlogs.map((post) => {
		const author = AUTHORS.find((user) => user.slug === post.authorId)
		const categories = Array.isArray(post.categoriesId)
			? post.categoriesId.map((slug) =>
					CATEGORIES.find((category) => category.slug === slug),
				)
			: []
		const tags = Array.isArray(post.tagsId)
			? TAGS.filter((tag) => post.tagsId.includes(tag.slug))
			: []

		return {
			...post,
			author: author || '',
			categories: categories.filter(Boolean),
			tag: tags,
			publishedAt: post.publishedAt ? formatDate(post.publishedAt) : '',
			createdAt: post.createdAt ? formatDate(post.createdAt) : '',
		}
	})
}

const blogs = getFilteredBlogs()

const getBlogsByAuthor = (authorSlug: string) => {
	const author = AUTHORS.find((user) => user.slug === authorSlug) || null
	const authorblogs = blogs
		.filter((post) => post.authorId === authorSlug)
		.slice(0, 13) // Limit to 13 posts show in Author Page
		.sort(
			(a, b) =>
				new Date(b.publishedAt || b.createdAt || 0).getTime() -
				new Date(a.publishedAt || a.createdAt || 0).getTime(),
		)

	return { author, authorblogs }
}

//  Add `count` to Each Category
CATEGORIES.forEach((category) => {
	category.count = publishandnotdeleteBlogs.reduce((acc, post) => {
		if (
			Array.isArray(post.categoriesId) &&
			post.categoriesId.includes(category.slug as any)
		) {
			return acc + 1
		}
		return acc
	}, 0)
})

const BLOGTAGSWITHCOUNT = TAGS.map((tag) => {
	const count = publishandnotdeleteBlogs.reduce((acc, post) => {
		if (Array.isArray(post.tagsId) && post.tagsId.includes(tag.slug as any)) {
			return acc + 1
		}
		return acc
	}, 0)

	return { ...tag, count }
}).sort((a, b) => b.count - a.count)

// console.log(BLOGTAGSWITHCOUNT)

const mostViewedBlogs = getFilteredBlogs({ sortByViews: true })

const latestBlogs = getFilteredBlogs({ latestblogs: true })

function matchedblogs(slug: string | string[]) {
	const slugArray = Array.isArray(slug) ? slug : [slug]

	if (slugArray.includes('All items')) {
		return mostViewedBlogs
	}

	return mostViewedBlogs.filter((post) => {
		const lowerCaseSlugArray = slugArray.map((s) => s.toLowerCase())
		return post.categoriesId?.some((category: string) =>
			lowerCaseSlugArray.includes(category.toLowerCase()),
		)
	})
}

// function paginationblogs(POSTS_PER_PAGE: number, currentPage: number) {
// 	const indexOfLastPost = currentPage * POSTS_PER_PAGE;
// 	const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
// 	const currentPosts = mostViewedBlogs.slice(indexOfFirstPost, indexOfLastPost);
// 	return currentPosts;
// }

// function paginationblogs({
// 	POSTS_PER_PAGE,
// 	currentPage,
// }: {
// 	POSTS_PER_PAGE: number
// 	currentPage: number
// }) {
// 	const startIndex = (currentPage - 1) * POSTS_PER_PAGE
// 	const endIndex = startIndex + POSTS_PER_PAGE

// 	return getFilteredBlogs().slice(startIndex, endIndex)
// }

function blogslugmatched(slug: string) {
	return blogs.find((post) => post.slug === slug) || null
}

const findRelatedBlogs = (slug: string) => {
	const currentBlog = blogs.find((blog) => blog.slug === slug)
	if (!currentBlog) return []

	const { tagsId = [], categoriesId = [] } = currentBlog

	return blogs
		.filter(
			(blog) =>
				blog.slug !== slug &&
				(blog.tagsId?.some((tag) => tagsId.includes(tag)) ||
					blog.categoriesId?.some((category) =>
						categoriesId.includes(category),
					)),
		)
		.slice(0, 4)
}
//   For BLog Detail page
const findAuthorBlogs = (slug: string) => {
	const currentBlog = blogs.find((blog) => blog.slug === slug)
	if (!currentBlog) return []

	const { authorId } = currentBlog

	return blogs
		.filter((blog) => blog.slug !== slug && blog.authorId === authorId)
		.slice(0, 4)
		.map(blog => ({
            ...blog,
            publishedAt: blog.publishedAt ? formatDate(blog.publishedAt) : '',
            createdAt: blog.createdAt ? formatDate(blog.createdAt) : '',
        }));
}

// Use in blog listing page and admin posts login in
const paginatePosts = (blogdata: any[], currentPage: number) => {
	const POSTS_PER_PAGE = 12
	const startIndex = (currentPage - 1) * POSTS_PER_PAGE
	const endIndex = startIndex + POSTS_PER_PAGE
	return blogdata.slice(0, endIndex)
}

const convertSlugToTitle = (slug: string) =>
	slug
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ')

export {
	fetchSingleMdxFile,
	getFilteredBlogs,
	matchedblogs,
	getNextIndexAndId,
	// paginationblogs,
	blogslugmatched,
	findRelatedBlogs,
	findAuthorBlogs,
	getBlogsByAuthor, //For Author Page
	paginatePosts,
	mostViewedBlogs,
	latestBlogs,
	CATEGORIES,
	AUTHORS,
	TAGS,
	BLOGTAGSWITHCOUNT,
	allblogs,
	allblogwithlatest,
	convertSlugToTitle,
}
