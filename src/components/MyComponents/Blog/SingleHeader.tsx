'use client'

import React, { FC } from 'react'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import PostMeta2 from '@/components/PostMeta2/PostMeta2'
import SingleTitle from '@/app/(singles)/SingleTitle'
import SingleMetaAction2 from '@/app/(singles)/SingleMetaAction2'

export interface SingleHeaderProps {
	hiddenDesc?: boolean
	titleMainClass?: string
	className?: string
	data?: Record<string, any>;
}

const SingleHeader: FC<SingleHeaderProps> = ({
	titleMainClass,
	hiddenDesc = false,
	className = '',
	data
}) => {

	return (
		<>

			<div className={`nc-SingleHeader ${className}`}>
				<div className="space-y-5">
					<CategoryBadgeList
						itemClass="!px-3"
						categories={data?.categories}
					/>

					<SingleTitle
						mainClass={titleMainClass}
						title={`${data?.title}`}
					/>
					{!hiddenDesc && (
						<span className="block pb-1 text-base text-neutral-500 dark:text-neutral-400 md:text-lg">
							{(data?.desc)}
						</span>
					)}
					<div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className="flex flex-col justify-between space-y-5 sm:flex-row sm:items-end sm:space-x-5 sm:space-y-0 rtl:space-x-reverse">
						<PostMeta2
							readtime={data?.readingTime}
							postdata={data?.publishedAt}
							authordata={data?.author}
							size="large"
							className="flex-shrink-0 leading-none"
							hiddenCategories
							avatarRounded="rounded-full shadow-inner"
						/>
						<SingleMetaAction2
							views={data?.viewdCount || 1}
							comments={data?.comments.length || 1}
							likes={data?.likeUsersId?.length || 1}
							URL={data?.href}
							data={data}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default SingleHeader
