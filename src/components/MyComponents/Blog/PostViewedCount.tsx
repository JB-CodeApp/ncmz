"use client";

import React, { FC, useState } from "react";
import convertNumbThousand from "@/utils/convertNumbThousand";

export interface PostCardLikeActionProps {
    className?: string;
    likeCount?: number;
    views?: any;
}

const PostViewedCount: FC<PostCardLikeActionProps> = ({
    views,
    className = "px-3 h-8 text-xs",
    likeCount = views || 1,
}) => {

    return (
        <button
            className={`nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors ${className} text-neutral-700 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-800 hover "
                }`}
            title="Viewed"
        >
            <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                 fillRule="evenodd"
          stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M12 5C7.03043 5 3.12435 7.59047 2.23607 10.858C2.08247 11.2956 2.08247 11.7044 2.23607 12.142C3.12435 15.4095 7.03043 18 12 18C16.9696 18 20.8756 15.4095 21.7639 12.142C21.9175 11.7044 21.9175 11.2956 21.7639 10.858C20.8756 7.59047 16.9696 5 12 5ZM12 15C9.23858 15 7 12.7614 7 10C7 7.23858 9.23858 5 12 5C14.7614 5 17 7.23858 17 10C17 12.7614 14.7614 15 12 15Z"
                />
            </svg>


            {likeCount && (
                <span
                    className={`ml-1 text-neutral-900 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-200" }`}
                >
                    {convertNumbThousand(likeCount)}
                </span>
            )}
        </button>
    );
};

export default PostViewedCount;
