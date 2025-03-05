import React from 'react'
import Image from 'next/image'
import SingleHeader from './SingleHeader';
import BlogVideo from './BlogVideo';
import BlogAudio from './BlogAudio';

const BlogHeader = ({ data }: any) => {

    if (!data) {
        return <div>Post not found</div>;
    }

    return (
        <>
            {
                data.postType === "standard" && (
                    <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">

                        <div className="dark container relative z-10">
                            <div className="max-w-screen-md">
                                <SingleHeader hiddenDesc data={data} />
                            </div>
                        </div>
                        {/* md:w-1/2 lg:w-2/5 2xl:w-1/3 */}
                        <div className="mt-8 md:mt-0 md:absolute md:top-0 md:end-0 md:bottom-0 ">
                            <div className="hidden md:block absolute top-0 start-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r rtl:bg-gradient-to-l"></div>
                            <Image
                                className="block w-full h-full object-cover"
                                src={data?.featuredImage as any}
                                alt=""
                                width={1635}
                                height={774}
                                sizes="(max-width: 1024px) 100vw, 1240px"
                            />
                        </div>
                    </header>
                )
            }

            {
                data?.postType === "video" &&
                <BlogVideo data={data} />
            }

            {
                data?.postType === "audio" &&
                <BlogAudio data={data} />
            }
        </>
    )
}

export default BlogHeader