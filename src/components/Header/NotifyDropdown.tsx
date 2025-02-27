import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import Avatar from '@/components/Avatar/Avatar'
import { FC, Fragment } from 'react'

const solutions = [
	{
		name: 'Eden Tuan',
		description: 'Mentioned you in a comment',
		time: '3 minutes ago',
		href: '##',
	},
	{
		name: 'Leo Messi',
		description: 'Create your own targeted content',
		time: '1 minute ago',
		href: '##',
	},
	{
		name: 'Leo Kante',
		description: 'Keep track of your growth',
		time: '3 minutes ago',
		href: '##',
	},
]

interface Props {
	className?: string
}

const NotifyDropdown: FC<Props> = ({ className = 'hidden sm:block' }) => {
	return (
		<div className={className}>
			<Popover className="relative">
				{({ open }) => (
					<>
						<PopoverButton
							className={` ${open ? '' : 'text-opacity-90'} group relative inline-flex items-center rounded-full p-3 text-base font-medium hover:bg-gray-100 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:hover:bg-neutral-800`}
						>
							<span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-blue-500"></span>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M12 6.43994V9.76994"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
								/>
								<path
									d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
								/>
								<path
									d="M15.33 18.8201C15.33 20.6501 13.83 22.1501 12 22.1501C11.09 22.1501 10.25 21.7701 9.65004 21.1701C9.05004 20.5701 8.67004 19.7301 8.67004 18.8201"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeMiterlimit="10"
								/>
							</svg>
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute -end-28 z-10 mt-3 w-screen max-w-xs px-4 sm:end-0 sm:max-w-sm sm:px-0">
								<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid gap-8 bg-white p-7 dark:bg-neutral-800">
										<h3 className="text-xl font-semibold">Notifications</h3>
										{solutions.map((item, index) => (
											<a
												key={index}
												href={item.href}
												className="relative -m-3 flex rounded-lg p-2 pr-8 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
											>
												<Avatar
													sizeClass="w-8 h-8 sm:w-12 sm:h-12"
													radius="rounded-full"
												/>
												<div className="ms-3 space-y-1 sm:ms-4">
													<p className="text-sm font-medium text-gray-900 dark:text-gray-200">
														{item.name}
													</p>
													<p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
														{item.description}
													</p>
													<p className="text-xs text-gray-400 dark:text-gray-400">
														{item.time}
													</p>
												</div>
												<span className="absolute right-1 top-1/2 h-2 w-2 -translate-y-1/2 transform rounded-full bg-blue-500"></span>
											</a>
										))}
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	)
}

export default NotifyDropdown
