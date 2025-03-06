'use client'  // To ensure this is a Client Component

import React, { useMemo, useState } from 'react'
import Card11 from '@/components/Card11/Card11'
import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox'
import { BLOGTAGSWITHCOUNT, CATEGORIES, paginatePosts } from '@/data/blogs'
import ModalCategories from './ModalCategories'
import ModalTags from '@/app/(archives)/ModalTags'
import FilterListBox from '../MyComponents/FilterListBox'
import ButtonPrimary from '../Button/ButtonPrimary'
import Link from 'next/link'

const FILTERS = [
  { name: 'Most Recent' },
  { name: 'Most Viewed' },
]

export const TagFilteredBlogs = ({ slug, data, mostviewed, mostrecent }: any) => {
  const [selected, setSelected] = useState(FILTERS[0])
  const [currentPage, setCurrentPage] = useState(1);

  const blogdata = selected.name === 'Most Recent' ? mostrecent : mostviewed
  // const POSTS_PER_PAGE = 12
  //   const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  //   const endIndex = startIndex + POSTS_PER_PAGE;
  //   const currentPosts = blogsToShow.slice(0, endIndex);
  // console.log(blogsToShow.length)

  const currentPosts = paginatePosts(blogdata, currentPage);

  const handleShowMore = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
      <div className="flex flex-col sm:justify-between sm:flex-row">
        <div className="flex space-x-2.5 rtl:space-x-reverse">
          <ModalCategories categories={CATEGORIES as any} />
          <ModalTags tags={BLOGTAGSWITHCOUNT as any} />
        </div>
        <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
        <div className="flex justify-end">
          <FilterListBox
            lists={FILTERS}
            selected={selected as any}
            setSelected={setSelected}
          />
        </div>


      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
        {currentPosts.map((post: any, i: React.Key | null | undefined) => (
          <Card11 key={i} post={post as any} />
        ))}
      </div>
      <div
        className="flex justify-center py-12 lg:py-16"
      >
        {currentPosts.length < blogdata.length ? (
          <ButtonPrimary onClick={handleShowMore}>
            Show me more
          </ButtonPrimary>
        ) : (
          <></>
        )}
        {/* {blogsToShow.length > POSTS_PER_PAGE &&
          <ButtonPrimary onClick={handleShowMore}>
            Show me more
          </ButtonPrimary>
        } */}
      </div>
    </>
  )
}
