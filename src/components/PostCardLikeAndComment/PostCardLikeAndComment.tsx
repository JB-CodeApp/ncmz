import React, { FC } from "react";
import PostCardCommentBtn from "@/components/PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeAction from "@/components/PostCardLikeAction/PostCardLikeAction";
import PostViewedCount from "../MyComponents/Blog/PostViewedCount";

export interface PostCardLikeAndCommentProps {
  className?: string;
  itemClass?: string;
  hiddenCommentOnMobile?: boolean;
  useOnSinglePage?: boolean;
  data?: any;
  commentscount?: number | any;
  view?: number;
}

const PostCardLikeAndComment: FC<PostCardLikeAndCommentProps> = ({
  className = "",
  itemClass = "px-3 h-8 text-xs",
  hiddenCommentOnMobile = true,
  useOnSinglePage = false,
  commentscount,
  data,
  view
}) => {
  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 rtl:space-x-reverse ${className}`}
    >
      <PostViewedCount views={view} className={itemClass} />
      <PostCardLikeAction likes={data} className={itemClass} />
      <PostCardCommentBtn
        comment={commentscount}
        className={`${
          hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
        }  ${itemClass}`}
        isATagOnSingle={useOnSinglePage}
      />
    </div>
  );
};

export default PostCardLikeAndComment;
