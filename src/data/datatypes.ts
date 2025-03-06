import { Route } from '@/routers/types'
import { StaticImageData } from 'next/image'

//  ######  CustomLink  ######## //
export interface CustomLink {
	label: string
	href: Route
	targetBlank?: boolean
}

//  ##########  CategoryType ######## //
// export interface CategoryType {
//   id: string | number;
//   name: string;
//   slug: string;
//   href: Route;
//   count?: number;
//   thumbnail?: string | StaticImageData;
//   color?: TwMainColor | string;
// }
export interface CategoryType {
	id: string | number
	name: string
	slug: string
	href: Route
	count?: number
	thumbnail?: string | StaticImageData
	color?: TwMainColor | string
}

//  ##########  BlogAuthorType ######## //
export interface BlogAuthorType {
	id: string | number
	firstName: string
	lastName: string
	displayName: string
	slug: string | any
	email?: string
	password?: string
	gender: string
	avatar: string | StaticImageData
	bgImage?: string | StaticImageData
	blog_count: number
	href: Route
	desc: string
	Social: {
		website: string
		facebook: string
		twitter: string
		instagram: string
		linkedin: string
	}
	followers: string[]
	follow: string[]
}

//  ##########  BlogDataType ######## //
export interface BlogDataType {
	id: string | number
	title: string
	slug: string
	href: Route
	mdxFile: string
	featuredImage: string | StaticImageData
	authorId: string[]
	desc?: string
	viewdCount: number
	readingTime: number
	bookmarkUsersId: string[]
	likeUsersId: string[]
	categoriesId: string[]
	tagsId: string[]
	status: 'draft' | 'published' | 'deleted'
	ishighlight: string
	contentType: 'free' | 'login' | 'subscribed'
	postType: 'standard' | 'video' | 'gallery' | 'audio'
	postTypeUrl?: string
	seo: {
		seoTitle: string
		seoKeyword: string
		seoDesc: string
		jsonLD: string
	}
	blogImgs: string[]
	faqs: {
		question: string
		answer: string
	}[]
	date: string
	categories: CategoryType[]
	like: {
		count: number
		isLiked: boolean
	}
	comments: {
		userId: number
		comments: string
		commentDate: string
		commentLikes: number
	}[]
	createdAt: string
	updatedAt: string
	publishedAt: string
	deletedAt: string
	tag: any[]
	author: any[]
	category: CategoryType[]
}

//  ##########  Tag ######## //
export interface Tag {
	id: string
	slug: string
	name: string
	href: string
	thumbnail: string
	count: string
	color: string
}

export interface PostData {
	index: number
	id: string
	title: string
	slug: string
	desc: string
	// tags: string[]
	// categoryslug: string[]
	href: string
	// commentCount: number
	viewdCount: number
	readingTime: number
	// bookmark: {
	// 	count: number
	// 	isBookmarked: boolean
	// }
	// like: {
	// 	count: number
	// 	isLiked: boolean
	// }
	featuredImage: File | string
	// date: string
	// publishdate: string
	// author: string
	authorslug: string
	postType: string
	// MDXFile: File | null;
	// jsonld: string
	status: string
	// contenttype: string
	authorId: number | any
	categoriesId: number[] | any
	audioFile?: File | string // Add this line
	videoUrl?: string // Add this line
	ishighlight?: string
	MDXContent?: string
	faqs?: { question: string; answer: string }[]
	bookmarkUsersId?: any
	likeUsersId?: any
	tagsId?: any
	contentType?: any
	postTypeUrl?: any
	seo: {
		seoTitle: string
		seoKeyword: string
		seoDesc: string
		jsonLD: string
	}
	blogImgs?: string[]
	comments: {
		userId: number | any
		comments: string
		commentDate: string
		commentLikes: number | any
	}[]
	createdAt: Date
	updatedAt: Date
	publishedAt: Date
	deletedAt: Date | any
	image?: File | string
	mdxPath?: string
	tags: any
	categoryslug: any
}

//  ##########  TwMainColor ######## //
export type TwMainColor =
	| 'pink'
	| 'green'
	| 'yellow'
	| 'red'
	| 'indigo'
	| 'blue'
	| 'purple'
	| 'gray'
