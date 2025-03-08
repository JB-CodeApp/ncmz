import CardAuthorBox from "@/components/CardAuthorBox/CardAuthorBox";
import Heading from "@/components/Heading/Heading";
import { PostAuthorType } from "@/data/types";
import React, { FC } from "react";
import CardTagsList from "../MyComponents/CardTagsList";

export interface SectionGridAuthorBoxProps {
  className?: string;
  tags: PostAuthorType[];
}

const SectionGridTagBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  tags,
}) => {
  return (
    <div className={`nc-SectionGridAuthorBox relative ${className}`}>
      {/* <Heading desc="Rating based on customer reviews" isCenter>
        Top 10 author of the month
      </Heading> */}
      <Heading desc={`Discover ${tags.length} tags`}>{`All Tags`}</Heading>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 ">
        {tags.map((author) => (
          <CardTagsList key={author.id} tag={author as any} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridTagBox;
