'use client'

import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import React, { FC, Fragment, ReactNode } from 'react'
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from '@headlessui/react'

export interface NcDropDownItem {
	id: string
	name: string
	icon: string
}

export interface NcDropDownProps {
	className?: string
	panelMenusClass?: string
	triggerIconClass?: string
	data: NcDropDownItem[]
	renderTrigger?: () => ReactNode
	renderItem?: (item: NcDropDownItem) => JSX.Element
	title?: string
	onClick: (item: NcDropDownItem) => void
}

const SocialShareNcDropDown: FC<NcDropDownProps> = ({
	className = `h-8 w-8 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center }`,
	triggerIconClass = 'h-6 w-6',
	panelMenusClass = 'origin-top-right',
	title = 'More',
	renderTrigger,
	renderItem,
	data,
	onClick,
}) => {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<MenuButton className={className} title={title}>
				{renderTrigger ? (
					renderTrigger()
				) : (
					<EllipsisHorizontalIcon className={triggerIconClass} />
				)}
			</MenuButton>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems
					className={`absolute ${panelMenusClass} end-0 z-30 mt-2 w-56 divide-y divide-neutral-100 rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-white dark:ring-opacity-10`}
				>
					<div className="px-1 py-3 text-sm text-neutral-6000 dark:text-neutral-300">
						{data.map((item) => (
							<MenuItem
								as={'div'}
								key={item.id}
								onClick={() => onClick(item)}
								data-menu-item-id={item.id}
							>
								{() =>
									renderItem && typeof renderItem(item) !== 'undefined' ? (
										renderItem(item)
									) : (
										<button
											className={
												'flex w-full items-center truncate rounded-xl px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'
											}
										>
											{!!item.icon && (
												<div
													dangerouslySetInnerHTML={{ __html: item.icon }}
												></div>
											)}
											<span className="ms-3">{item.name}</span>
										</button>
									)
								}
							</MenuItem>
						))}
					</div>
				</MenuItems>
			</Transition>
		</Menu>
	)
}

export default SocialShareNcDropDown
