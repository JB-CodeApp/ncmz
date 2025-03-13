import React from 'react'
import SectionHero from '@/components/SectionHero/SectionHero'
import Vector1 from "@/images/Vector1.png";
import Image from "next/image";
import { TagFilteredBlogs } from '@/components/SectionHero/TagFilteredBlogs';
import { BLOGTAGSWITHCOUNT, CATEGORIES, latestBlogs, mostViewedBlogs } from '@/data/blogs';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox/SectionGridAuthorBox';
import SectionGridTagBox from '@/components/MyComponents/SectionGridTagBox';
import Nav from '@/components/Nav/Nav';
import { AuthorBlogFiltere } from '@/components/MyComponents/AuthorBlogFiltere';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Link from 'next/link';
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2';
import Heading from '@/components/Heading/Heading';

const TagPage = () => {

  return (
    <div className="nc-PageHomeDemo3 relative">
      <div className="container relative">
        <SectionHero
          rightImg="/assets/images/seoimages/tag.webp"
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

        {/* <div>
          <TagFilteredBlogs
            slug=""
            mostviewed={mostViewedBlogs}
            mostrecent={latestBlogs}
          />
        </div> */}

        {/* <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28"> */}
        {/* <main> */}
        <Heading desc={`Stay updated with new blogs`}>{`Recently Published Blogs`}</Heading>

        {/* TABS FILTER */}
        <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
          <Nav className="sm:space-x-2 rtl:space-x-reverse">
            &nbsp;
            {/* {TABS.map((item, index) => (
                <NavItem
                  key={index}
                  isActive={tabActive === item}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))} */}
          </Nav>
          <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
        </div>
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
        {/* </div> */}

      </div>
    </div>
  );
};

export default TagPage;
