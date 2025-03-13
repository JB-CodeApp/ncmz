import React from 'react'
import SectionHero from '@/components/SectionHero/SectionHero'
import Vector1 from "@/images/Vector1.png";
import Image from "next/image";
import { TagFilteredBlogs } from '@/components/SectionHero/TagFilteredBlogs';
import { CATEGORIES, latestBlogs, mostViewedBlogs } from '@/data/blogs';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';
import Nav from '@/components/Nav/Nav';
import { AuthorBlogFiltere } from '@/components/MyComponents/AuthorBlogFiltere';
import Link from 'next/link';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2';
import Heading from '@/components/Heading/Heading';

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

          {/* <div>
            <TagFilteredBlogs
              slug=""
              mostviewed={mostViewedBlogs}
              mostrecent={latestBlogs}
            />
          </div> */}
          <Heading desc={`Stay updated with new blogs`}>{`Recently Published Blogs`}</Heading>

          {/* TABS FILTER */}
       
          <AuthorBlogFiltere
            blogdata={latestBlogs.slice(0, 12)}
          />

          {/* PAGINATION */}
          <div
            className="flex justify-center mt-12 lg:mt-16"
          //  className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center"
          >
            {latestBlogs.length > 12 && <Link href="/blog">
              <ButtonPrimary>Show me more</ButtonPrimary>
            </Link>
            }
          </div>
          {/* </main> */}


          {/* SUBCRIBES */}
          <SectionSubscribe2 />

        </div>
      </div>
    </>
  )
};

export default AuthorPage;
