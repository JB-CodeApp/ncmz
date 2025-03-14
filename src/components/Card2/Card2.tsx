import React, { FC } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "@/data/types";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import Image from "next/image";
import PostCardMeta from "../PostCardMeta/PostCardMeta";
import { BlogDataType } from "@/data/datatypes";

export interface Card2Props {
  className?: string;
  post: BlogDataType;
  size?: "normal" | "large";
}

const Card2: FC<Card2Props> = ({
  className = "h-full",
  size = "normal",
  post,
}) => {
  const {
    title,
    href,
    readingTime,
    featuredImage,
    desc,
    categories,
    postType,
  } = post;

  return (
    <div className={`nc-Card2 group relative flex flex-col ${className}`}>
      <div className="block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] z-0">
        <Image
          fill
          sizes="(max-width: 600px) 480px, 800px"
          className="object-cover rounded-3xl"
          src={featuredImage}
          alt={title}
        />
        <PostTypeFeaturedIcon
          className="absolute bottom-2 left-2"
          postType={postType}
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        />
        <CategoryBadgeList
          className="flex flex-wrap space-x-2 absolute top-3 left-3"
          itemClass="relative"
          categories={categories as any}
        />
      </div>

      <Link href={href} className="absolute inset-0" />

      <div className="mt-5 px-4 flex flex-col">
        <div className="space-y-3">
          <PostCardMeta
            className="relative text-sm"
            avatarSize="h-8 w-8 text-sm"
            meta={post as any}
          />

          <h3
            className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 ${size === "large" ? "text-base sm:text-lg md:text-xl" : "text-base"
              }`}
          >
            <Link href={href} className="line-clamp-2" title={title}>
              {title}
            </Link>
          </h3>
          <span className="block text-neutral-500 dark:text-neutral-400 text-[15px] leading-6 ">
            {desc}
          </span>
        </div>
        <div className="my-5 border-t border-neutral-200 dark:border-neutral-700"></div>
        {/* <div className="flex items-center justify-between">
          <PostCardLikeAndComment
            view={post?.viewdCount || 1}
            commentscount={post?.comments.length || 1}
            data={post?.likeUsersId?.length || 1}
            className="relative" />
          <PostCardSaveAction className="relative" readingTime={readingTime} />
        </div> */}
      </div>
    </div>
  );
};

export default Card2;
