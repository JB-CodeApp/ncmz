import Avatar from '@/components/Avatar/Avatar'
import { DEMO_AUTHORS } from '@/data/authors'
import { BlogAuthorType } from '@/data/datatypes'
import { PostAuthorType } from '@/data/types'
import Link from 'next/link'
import React, { FC } from 'react'

export interface SingleAuthorProps {
	authordata?: BlogAuthorType
}

const SingleAuthor: FC<SingleAuthorProps> = ({ authordata }) => {
	return (
		<div className="nc-SingleAuthor flex">
			<Link href={authordata?.href as any}>
				<Avatar
					imgUrl={authordata?.avatar as any }
					userName={authordata?.displayName as any}
					sizeClass="h-12 w-12 text-lg sm:text-xl sm:h-24 sm:w-24"
				/>
			</Link>
			<div className="ml-3 flex max-w-lg flex-col sm:ml-5">
				<span className="text-xs uppercase tracking-wider text-neutral-400">
					WRITTEN BY
				</span>
				<h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
					<Link href={authordata?.href as any}>{authordata?.displayName as any}</Link>
				</h2>
				<span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-300 sm:text-base">
					{authordata?.desc as any}
					<Link
						className="ml-1 font-medium text-primary-6000"
						href={authordata?.href as any}
					>
						Read more
					</Link>
				</span>
			</div>
		</div>
	)
}

export default SingleAuthor
