"use client";

import CardLarge1 from "@/components/CardLarge1/CardLarge1";
import Heading from "@/components/Heading/Heading";
import { BlogDataType } from "@/data/datatypes";
import { PostDataType } from "@/data/types";
import React, { FC, useState } from "react";

export interface SectionLargeSliderProps {
  className?: string;
  heading?: string;
  posts: BlogDataType[];
}

const SectionLargeSlider: FC<SectionLargeSliderProps> = ({
  posts,
  heading = "Featured Articles",
  className = "",
}) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= posts.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return posts.length - 1;
      }
      return state - 1;
    });
  };

  return (
    <div className={`nc-SectionLargeSlider relative ${className}`}>
      {/* {!!heading && <Heading desc="">{heading}</Heading>} */}
      <div
        className={`nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between`}
      >
        <div
          className={
            "max-w-2xl"
          }
        >
          <h1
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold`}
          >
            {heading}
          </h1>

        </div>
      </div>
      {posts.map((item, index) => {
        if (indexActive !== index) return null;
        return (
          <CardLarge1
            key={index}
            onClickNext={handleClickNext}
            onClickPrev={handleClickPrev}
            post={item as any}
          />
        );
      })}
    </div>
  );
};

export default SectionLargeSlider;
