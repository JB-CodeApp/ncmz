import React from 'react'
import SectionHero from '@/components/SectionHero/SectionHero'
import Vector1 from "@/images/Vector1.png";
import Image from "next/image";
import { TagFilteredBlogs } from '@/components/SectionHero/TagFilteredBlogs';
import { BLOGTAGSWITHCOUNT, CATEGORIES, latestBlogs, mostViewedBlogs } from '@/data/blogs';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox/SectionGridAuthorBox';
import SectionGridTagBox from '@/components/MyComponents/SectionGridTagBox';

const TagPage = () => {

  return (
    <div className="nc-PageHomeDemo3 relative">
      <div className="container relative">
        <SectionHero
          rightImg="/assets/images/seoimages/tags.webp"
          // rightImg="/assets/images/seoimages/blogs_hero_image.webp"
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          heading={
            <>
              All &nbsp;
              <span className="relative pr-3">
                {/* <Image
                            className="w-full absolute top-1/2 -start-1 transform -translate-y-1/2"
                            src={Vector1}
                            alt=""
                        /> */}
                <span className="relative">Tags</span>
              </span>
            </>
          }
          btnText="Getting started"
          subHeading="iOS tags include technologies and frameworks like Swift, UIKit, SwiftUI and CoreData commonly used in iOS app development."
        />

        <SectionGridTagBox
          className="pb-16 lg:pb-28"
          tags={BLOGTAGSWITHCOUNT as any}
        />

        <div>
          <TagFilteredBlogs
            slug=""
            mostviewed={mostViewedBlogs}
            mostrecent={latestBlogs}
          />
        </div>

      </div>
    </div>
  );
};

export default TagPage;
