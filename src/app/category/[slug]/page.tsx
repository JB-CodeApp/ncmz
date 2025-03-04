import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { AuthorBlogFiltere } from "@/components/MyComponents/AuthorBlogFiltere";
import { TagFilteredBlogs } from "@/components/SectionHero/TagFilteredBlogs";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import { getFilteredBlogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import BgImg from "@/images/image/background_img.webp";

const PageCategory = ({ params }: { params: { slug: string } }) => {
    const slug = params.slug;

    const techBlogs = getFilteredBlogs({ category: slug });

    return (
        <>
            <div className={`nc-PageArchive`}>
                {/* HEADER */}
                <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
                    <div className="relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
                        <Image
                            fill
                            alt="archive"
                            src={BgImg}
                            className="object-cover w-full h-full rounded-3xl md:rounded-[40px]"
                            sizes="(max-width: 1280px) 100vw, 1536px"
                        />
                        <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
                            <h1 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
                                {slug}
                            </h1>
                            <span className="block mt-4 text-neutral-300">{techBlogs.length} Articles</span>
                        </div>
                    </div>
                </div>
                {/* ====================== END HEADER ====================== */}

                <div className="container pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
                    <AuthorBlogFiltere
                        blogdata={techBlogs.slice(0, 12)}
                    />

                    {/* PAGINATION mt-12 lg:mt-16 */}
                    <div
                        className="flex justify-center "
                    >
                        {techBlogs.length > 12 && <Link href="/blog">
                            <ButtonPrimary>Show me more</ButtonPrimary>
                        </Link>
                        }
                    </div>

                    {/* SUBCRIBES */}
                    <SectionSubscribe2 />
                </div>

            </div>
        </>
    )
}
export default PageCategory;
