// "use client";

import React from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Nav from "@/components/Nav/Nav";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import NcImage from "@/components/NcImage/NcImage";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { avatarImgs } from "@/contains/fakeData";
import VerifyIcon from "@/components/VerifyIcon";
import AccountActionDropdown from "@/components/AccountActionDropdown/AccountActionDropdown";
import Image from "next/image";
import { AUTHORS, getBlogsByAuthor } from "@/data/blogs";
import Link from "next/link";
import AuthorSocials from "@/components/MyComponents/AuthorSocials";
import { AuthorBlogFiltere } from "@/components/MyComponents/AuthorBlogFiltere";

// const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 12);

// const FILTERS = [
//   { name: "Most Recent" },
//   { name: "Most Appreciated" },
//   { name: "Most Discussed" },
//   { name: "Most Viewed" },
// ];
// { name: "Curated by Admin" },
// const TABS = ["Articles", "Favorites", "Saved"];

const PageAuthor = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const { author, authorblogs } = getBlogsByAuthor(slug);

  const posts = authorblogs;

  return (
    <div className={`nc-PageAuthor `}>
      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          <NcImage
            alt=""
            containerClassName="absolute inset-0"
            sizes="(max-width: 1280px) 100vw, 1536px"
            src={author?.bgImage || ""}
            className="object-cover w-full h-full"
            fill
            priority
          />
        </div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
            <div className="w-32 lg:w-40 flex-shrink-0 mt-12 sm:mt-0">
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold rounded-full w-20 h-20 text-xl lg:text-2xl lg:w-36 lg:h-36 ring-4 ring-white dark:ring-0 shadow-2xl z-0">
                <Image
                  alt="Avatar"
                  src={author?.avatar || avatarImgs[0]}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/*  */}
            <div className="pt-5 md:pt-1 lg:ml-6 xl:ml-12 flex-grow">
              <div className="max-w-screen-sm space-y-3.5 ">
                <h2 className="inline-flex items-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
                  <span>{author?.displayName}</span>
                  <VerifyIcon
                    className="ml-2"
                    iconClass="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8"
                  />
                </h2>
                <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                  {author?.desc}
                </span>
                <a
                  href={author?.Social.website as any || ''}
                  className="flex items-center text-xs font-medium space-x-2.5 rtl:space-x-reverse cursor-pointer text-neutral-500 dark:text-neutral-400 truncate"
                >
                  <GlobeAltIcon className="flex-shrink-0 w-4 h-4" />
                  <span className="text-neutral-700 dark:text-neutral-300 truncate">
                    {author?.Social.website}
                  </span>
                </a>
                <AuthorSocials
                  socials={author?.Social as any}
                  itemClass="block w-7 h-7" />
                {/* <SocialsList itemClass="block w-7 h-7" /> */}
              </div>
            </div>

            {/*  */}
            <div className="absolute md:static start-5 end-5 top-4 sm:start-auto sm:top-5 sm:end-5 flex justify-end">
              {/* <FollowButton
                isFollowing={false}
                fontSize="text-sm md:text-base font-medium"
                sizeClass="px-4 py-1 md:py-2.5 h-8 md:!h-10 sm:px-6 lg:px-8"
              /> */}

              {/* <div className="mx-2">
                <NcDropDown
                  className="flex-shrink-0 flex items-center justify-center focus:outline-none h-10 w-10 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full"
                  renderTrigger={() => <ShareIcon className="h-5 w-5" />}
                  onClick={() => { }}
                  data={SOCIALS_DATA}
                />
              </div> */}

              <AccountActionDropdown containerClassName="h-10 w-10 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700" />
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
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
            blogdata={posts.slice(0, 12)}
          />

          {/* PAGINATION */}
          <div
            className="flex justify-center mt-12 lg:mt-16"
          //  className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center"
          >
            {posts.length > 12 && <Link href="/blog">
              <ButtonPrimary>Show me more</ButtonPrimary>
            </Link>
            }
          </div>
        </main>

        
        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  return AUTHORS.map((author) => ({
    slug: author.slug.toString(),
  }));
}


export default PageAuthor;
