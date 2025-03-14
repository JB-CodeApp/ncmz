import Card3Small from "@/components/Card3Small/Card3Small";
import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import React, { FC } from "react";

const widgetPostsDemo: PostDataType[] = DEMO_POSTS.filter(
  (_, i) => i > 2 && i < 7
);

export interface WidgetPostsProps {
  className?: string;
  posts?: PostDataType[];
}

const WidgetPosts: FC<WidgetPostsProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  posts = widgetPostsDemo,
}) => {
  return (
    <div className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}>
      <WidgetHeading1
        title="🎯 Popular Posts"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {posts.map((post) => (
          <Card3Small
            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            key={post.id}
            post={post as any}
          />
        ))}
      </div>
    </div>
  );
};

export default WidgetPosts;
