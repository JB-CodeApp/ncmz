import React from 'react'
import SectionHero from '@/components/SectionHero/SectionHero'
import Vector1 from "@/images/Vector1.png";
import Image from "next/image";
import { TagFilteredBlogs } from '@/components/SectionHero/TagFilteredBlogs';
import { CATEGORIES, latestBlogs, mostViewedBlogs } from '@/data/blogs';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';

const AuthorPage = () => {

  return (
    <>
      <div className="nc-PageHomeDemo3 relative">
        <div className="container relative">
          <SectionHero
            rightImg="/assets/images/seoimages/category.webp"
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
                  <span className="relative">Categories</span>
                </span>
              </>
            }
            btnText="Getting started"
            subHeading="This page offers insights into essential development categories like Architecture, Network, UI/UX Development, and Data Storage to help you get started and stay updated."
          />

          <SectionSliderNewCategories
            className="pb-16 lg:pb-28"
            heading="Top trending categories"
            subHeading={`Discover ${CATEGORIES.length} categories`}
            categories={CATEGORIES as any}
            categoryCardType="card4"
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
    </>
  )
};

export default AuthorPage;
