import React, { FC } from "react";
import Tag from "@/components/Tag/Tag";
import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1";
import { TaxonomyType } from "@/data/types";
import { DEMO_TAGS } from "@/data/taxonomies";
import { BLOGTAGSWITHCOUNT } from "@/data/blogs";
import { CategoryType } from "@/data/datatypes";

// const tagsDemo = DEMO_TAGS.filter((_, i) => i < 9);
const tagsDemo = BLOGTAGSWITHCOUNT;

export interface WidgetTagsProps {
  className?: string;
  tags?: CategoryType[];
}

const WidgetTags: FC<WidgetTagsProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  tags = tagsDemo,
}) => {
  return (
    <div className={`nc-WidgetTags rounded-3xl overflow-hidden ${className}`}>
      <WidgetHeading1
        title="💡 More tags"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-wrap p-4 xl:p-5">
        {tags.map((tag) => (
          <Tag className="mr-2 mb-2" key={tag.id} tag={tag as any} />
        ))}
      </div>
    </div>
  );
};

export default WidgetTags;
