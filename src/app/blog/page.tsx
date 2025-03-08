import React from 'react'
import SectionHero from '@/components/SectionHero/SectionHero'
import Vector1 from "@/images/Vector1.png";
import Image from "next/image";
import { TagFilteredBlogs } from '@/components/SectionHero/TagFilteredBlogs';
import { latestBlogs, mostViewedBlogs } from '@/data/blogs';

const page = () => {

    return (
        <>
            <div className="nc-PageHomeDemo3 relative">
                <div className="container relative">
                    <SectionHero
                        rightImg="/assets/images/seoimages/blogs.webp"
                        // rightImg="/assets/images/seoimages/blogs_hero_image.webp"
                        className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
                        heading={
                            <>
                                All &nbsp;
                                <span className="relative pr-3">
                                    <Image
                                        className="w-full absolute top-1/2 -start-1 transform -translate-y-1/2"
                                        src={Vector1}
                                        alt=""
                                    />
                                    <span className="relative">Blogs</span>
                                </span>
                            </>
                        }
                        btnText="Getting started"
                        subHeading="Expert blogs on iOS app development, Swift programming, UI/UX design, and app optimization. Stay updated with new trends."
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
}

export default page