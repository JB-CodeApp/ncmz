import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route;
  targetBlank?: boolean;
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
    id: string | number;
    name: string;
    slug: string;
    href: Route;
    count?: number;
    thumbnail?: string | StaticImageData;
    color?: TwMainColor | string;
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
    author: BlogAuthorType
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

//  ##########  TwMainColor ######## //
export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";
