'use client'  // To ensure this is a Client Component

import React, { useMemo, useState } from 'react'
import Card11 from '@/components/Card11/Card11'
import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox'

// const FILTERS = [
//   { name: 'Most Recent' },
//   { name: 'Most Viewed' },
// ]

export const FilteredBlogs = ({slug, data, mostviewed, mostrecent, filtertype, blogdata  }: any) => {
  const [selected, setSelected] = useState(filtertype[0])
  // console.log('selected', selected)

  const blogsToShow = useMemo(() => {
  // console.log('blogdata', blogdata)

    let filteredBlogs = [...blogdata]

    if (selected === "Most Recent") {
      filteredBlogs = filteredBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      // console.log('most recent', filteredBlogs)
    } else if (selected === "Most Viewed") {
      filteredBlogs = filteredBlogs.sort((a, b) => b.viewCount - a.viewCount)
      // console.log('most Viewed', filteredBlogs)

    } else if (selected === "Most Appreciated") {
      filteredBlogs = filteredBlogs.sort((a, b) => b.likeUsersId.length - a.likeUsersId.length) 
      // console.log('most Appreciated', filteredBlogs)
      
    } else if (selected === "Most Discussed") {
      filteredBlogs = filteredBlogs.sort((a, b) => b.comments.length - a.comments.length)
      // console.log('most Appreciated', filteredBlogs)
    }

    return filteredBlogs
  }, [selected, blogdata])

  return (
    <>
      <div className="flex flex-col sm:justify-between sm:flex-row">
        <div className="flex space-x-2.5 rtl:space-x-reverse">
          {/* <ModalCategories categories={CATEGORIES as any} />
          <ModalTags tags={TAGS as any} /> */}
        </div>
        <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
        <div className="flex justify-end">
          <ArchiveFilterListBox
            lists={filtertype}
            // selected={selected as any}
            // setSelected={setSelected}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
        {blogsToShow.map((post: { id: React.Key | null | undefined }) => (
          <Card11 key={post.id} post={post as any} />
        ))}
      </div>
    </>
  )
}
