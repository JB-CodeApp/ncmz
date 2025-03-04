'use client';

import React, { useMemo, useState } from 'react';
import Card11 from '@/components/Card11/Card11';
import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox';
import { BLOGTAGSWITHCOUNT, CATEGORIES } from '@/data/blogs';
import ModalTags from '@/app/(archives)/ModalTags';
import FilterListBox from '../MyComponents/FilterListBox';
import ModalCategories from '../SectionHero/ModalCategories';

const FILTERS = [
  { name: 'Most Recent', key: 'latest' },
  { name: 'Most Appreciated', key: 'appreciated' },
  { name: 'Most Discussed', key: 'discussed' },
  { name: 'Most Viewed', key: 'viewed' },
];

export const AuthorBlogFiltere = ({ blogdata }: { blogdata: any[] }) => {
  const [selected, setSelected] = useState(FILTERS[0]);

  const filteredBlogs = useMemo(() => {
    if (!blogdata.length) return [];

    switch (selected.key) {
      case 'viewed':
        return [...blogdata].sort((a, b) => b.viewdCount - a.viewdCount);
      case 'discussed':
        return [...blogdata].sort((a, b) => (b.comments?.length || 1) - (a.comments?.length || 1));
      case 'appreciated':
        return [...blogdata].sort((a, b) => (b.likeUsersId?.length || 1) - (a.likeUsersId?.length || 1));
      default:
        return [...blogdata].sort(
          (a, b) => new Date(b.publishedAt || b.createdAt || 0).getTime() - new Date(a.publishedAt || a.createdAt || 0).getTime()
        );
    }
  }, [selected, blogdata]);

  return (
    <>
      <div className="flex flex-col sm:justify-between sm:flex-row">
        <div className="flex space-x-2.5 rtl:space-x-reverse">
          <ModalCategories categories={CATEGORIES as any} />
          <ModalTags tags={BLOGTAGSWITHCOUNT as any} />
        </div>
        <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
        <div className="flex justify-end">
          <FilterListBox lists={FILTERS} selected={selected} setSelected={setSelected as any} />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((post) => <Card11 key={post.id} post={post} />)
        ) : (
          <p className="text-center col-span-full text-neutral-500">No blogs found.</p>
        )}
      </div>
    </>
  );
};
