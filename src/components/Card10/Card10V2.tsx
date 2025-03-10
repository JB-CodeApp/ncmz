"use client";
import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import PostCardMetaV2 from "@/components/PostCardMeta/PostCardMetaV2";
import Link from "next/link";

export interface Card10V2Props {
  className?: string;
  post: PostDataType;
}

const Card10V2: FC<Card10V2Props> = ({ className = "h-full", post }) => {
  const { href, categories } = post;
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card10V2 relative flex flex-col ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-16 aspect-h-12 sm:aspect-h-9 overflow-hidden z-0">
        <div>
          <PostFeaturedMedia post={post as any} isHover={isHover} />
        </div>

        <Link
          href={href}
          className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity"
        ></Link>
      </div>
      <div className="absolute top-3 inset-x-3 flex justify-between items-start space-x-4 rtl:space-x-reverse">
        <CategoryBadgeList categories={categories as any} />
        <PostCardSaveAction />
      </div>

      <div className="space-y-2.5 mt-4 px-4">
        <PostCardMetaV2 meta={post as any} />
      </div>
    </div>
  );
};

export default Card10V2;
