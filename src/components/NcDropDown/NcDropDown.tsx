'use client'
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, PocketShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

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
	url?: any
}

const NcDropDown: FC<NcDropDownProps> = ({
	className = `h-8 w-8 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center }`,
	triggerIconClass = 'h-6 w-6',
	panelMenusClass = 'origin-top-right',
	title = 'More',
	renderTrigger,
	renderItem,
	data,
	url,
	onClick,
}) => {

	const currentblogurl = process.env.NEXT_PUBLIC_FRONTEND_URL + url;

	const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

	const { title: blogTitle,
		summary: blogSummary,
		featuredImage: Image
	} = parsedData || {};

	const emailcontent = `
  Dear Readers,

  I hope you're doing well!

  I wanted to share something exciting with you. It's called **${process.env.NEXT_PUBLIC_SITE_NAME}** – a modern website designed to showcase custom iPhone and iPad apps. The design is clean and professional, making it perfect for showing off your apps in a way that's both engaging and easy for your visitors to explore.

  Check out our latest blog post here:
  ${currentblogurl}

  Feel free to take a look and let me know if you have any questions. 

  Best regards,  
  ${process.env.NEXT_PUBLIC_SITE_NAME}
`;

	const socials = [
		{
			id: "Facebook",
			name: "Facebook",
			icon: `<svg class="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_17_61)">
		<path d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" fill="currentColor"/>
		</g>
		</svg>
		`,
			shareComponent: (
				<FacebookShareButton
					url={currentblogurl}
					hashtag={'#blog'}
					// description={blogSummary as any}
					// media={process.env.NEXT_PUBLIC_FRONTEND_URL + Image}
					className="share-button"
				>
					<span className="ms-3">Facebook</span>
				</FacebookShareButton>
			),
			href: "#",
		},
		{
			id: "Twitter",
			name: "Twitter",
			icon: `<svg class="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_17_80)">
		<path d="M15.1003 43.5C33.2091 43.5 43.1166 28.4935 43.1166 15.4838C43.1166 15.0619 43.1072 14.6307 43.0884 14.2088C45.0158 12.815 46.679 11.0886 48 9.11066C46.205 9.90926 44.2993 10.4308 42.3478 10.6575C44.4026 9.42588 45.9411 7.491 46.6781 5.21159C44.7451 6.35718 42.6312 7.16528 40.4269 7.60128C38.9417 6.02318 36.978 4.97829 34.8394 4.62816C32.7008 4.27803 30.5064 4.64216 28.5955 5.66425C26.6846 6.68635 25.1636 8.30947 24.2677 10.2827C23.3718 12.2559 23.1509 14.4693 23.6391 16.5807C19.725 16.3842 15.8959 15.3675 12.4 13.5963C8.90405 11.825 5.81939 9.33893 3.34594 6.29909C2.0888 8.46655 1.70411 11.0314 2.27006 13.4722C2.83601 15.9131 4.31013 18.047 6.39281 19.44C4.82926 19.3904 3.29995 18.9694 1.93125 18.2119V18.3338C1.92985 20.6084 2.7162 22.8132 4.15662 24.5736C5.59704 26.334 7.60265 27.5412 9.8325 27.99C8.38411 28.3863 6.86396 28.4441 5.38969 28.1588C6.01891 30.1149 7.24315 31.8258 8.89154 33.0527C10.5399 34.2796 12.5302 34.9613 14.5847 35.0025C11.0968 37.7423 6.78835 39.2283 2.35313 39.2213C1.56657 39.2201 0.780798 39.1719 0 39.0769C4.50571 41.9676 9.74706 43.5028 15.1003 43.5Z" fill="currentColor"/>
		</g>
		</svg>
		`,
			shareComponent: (
				<TwitterShareButton
					url={currentblogurl}
					title={blogTitle}
					hashtags={['#blog']}
					related={[]}
				>
					<span className="ms-3">Twitter</span>
				</TwitterShareButton>
			),
			href: "#",
		},
		{
			id: "Linkedin",
			name: "Linkedin",
			icon: `<svg class="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_17_68)">
		<path d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4062 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4062 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39062 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39062 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031Z" fill="currentColor"/>
		</g>
		</svg>
		`,
			shareComponent: (
				<LinkedinShareButton
					url={currentblogurl}
					title={blogTitle}
					summary={blogSummary}
					source={process.env.NEXT_PUBLIC_FRONTEND_URL} >
					<span className="ms-3">LinkedIn</span>
				</LinkedinShareButton>
			),
			href: "#",
		}
		,
		{
			id: "WhatsApp",
			name: "WhatsApp",
			icon: `<svg class="w-5 h-5" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_17_68)">
    <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 29.079097 3.1186875 32.88588 4.984375 36.208984 L 2.0371094 46.730469 A 1.0001 1.0001 0 0 0 3.2402344 47.970703 L 14.210938 45.251953 C 17.434629 46.972929 21.092591 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 21.278025 46 17.792121 45.029635 14.761719 43.333984 A 1.0001 1.0001 0 0 0 14.033203 43.236328 L 4.4257812 45.617188 L 7.0019531 36.425781 A 1.0001 1.0001 0 0 0 6.9023438 35.646484 C 5.0606869 32.523592 4 28.890107 4 25 C 4 13.390466 13.390466 4 25 4 z M 16.642578 13 C 16.001539 13 15.086045 13.23849 14.333984 14.048828 C 13.882268 14.535548 12 16.369511 12 19.59375 C 12 22.955271 14.331391 25.855848 14.613281 26.228516 L 14.615234 26.228516 L 14.615234 26.230469 C 14.588494 26.195329 14.973031 26.752191 15.486328 27.419922 C 15.999626 28.087653 16.717405 28.96464 17.619141 29.914062 C 19.422612 31.812909 21.958282 34.007419 25.105469 35.349609 C 26.554789 35.966779 27.698179 36.339417 28.564453 36.611328 C 30.169845 37.115426 31.632073 37.038799 32.730469 36.876953 C 33.55263 36.755876 34.456878 36.361114 35.351562 35.794922 C 36.246248 35.22873 37.12309 34.524722 37.509766 33.455078 C 37.786772 32.688244 37.927591 31.979598 37.978516 31.396484 C 38.003976 31.104927 38.007211 30.847602 37.988281 30.609375 C 37.969311 30.371148 37.989581 30.188664 37.767578 29.824219 C 37.302009 29.059804 36.774753 29.039853 36.224609 28.767578 C 35.918939 28.616297 35.048661 28.191329 34.175781 27.775391 C 33.303883 27.35992 32.54892 26.991953 32.083984 26.826172 C 31.790239 26.720488 31.431556 26.568352 30.914062 26.626953 C 30.396569 26.685553 29.88546 27.058933 29.587891 27.5 C 29.305837 27.918069 28.170387 29.258349 27.824219 29.652344 C 27.819619 29.649544 27.849659 29.663383 27.712891 29.595703 C 27.284761 29.383815 26.761157 29.203652 25.986328 28.794922 C 25.2115 28.386192 24.242255 27.782635 23.181641 26.847656 L 23.181641 26.845703 C 21.603029 25.455949 20.497272 23.711106 20.148438 23.125 C 20.171937 23.09704 20.145643 23.130901 20.195312 23.082031 L 20.197266 23.080078 C 20.553781 22.728924 20.869739 22.309521 21.136719 22.001953 C 21.515257 21.565866 21.68231 21.181437 21.863281 20.822266 C 22.223954 20.10644 22.02313 19.318742 21.814453 18.904297 L 21.814453 18.902344 C 21.828863 18.931014 21.701572 18.650157 21.564453 18.326172 C 21.426943 18.001263 21.251663 17.580039 21.064453 17.130859 C 20.690033 16.232501 20.272027 15.224912 20.023438 14.634766 L 20.023438 14.632812 C 19.730591 13.937684 19.334395 13.436908 18.816406 13.195312 C 18.298417 12.953717 17.840778 13.022402 17.822266 13.021484 L 17.820312 13.021484 C 17.450668 13.004432 17.045038 13 16.642578 13 z M 16.642578 15 C 17.028118 15 17.408214 15.004701 17.726562 15.019531 C 18.054056 15.035851 18.033687 15.037192 17.970703 15.007812 C 17.906713 14.977972 17.993533 14.968282 18.179688 15.410156 C 18.423098 15.98801 18.84317 16.999249 19.21875 17.900391 C 19.40654 18.350961 19.582292 18.773816 19.722656 19.105469 C 19.863021 19.437122 19.939077 19.622295 20.027344 19.798828 L 20.027344 19.800781 L 20.029297 19.802734 C 20.115837 19.973483 20.108185 19.864164 20.078125 19.923828 C 19.867096 20.342656 19.838461 20.445493 19.625 20.691406 C 19.29998 21.065838 18.968453 21.483404 18.792969 21.65625 C 18.639439 21.80707 18.36242 22.042032 18.189453 22.501953 C 18.016221 22.962578 18.097073 23.59457 18.375 24.066406 C 18.745032 24.6946 19.964406 26.679307 21.859375 28.347656 C 23.05276 29.399678 24.164563 30.095933 25.052734 30.564453 C 25.940906 31.032973 26.664301 31.306607 26.826172 31.386719 C 27.210549 31.576953 27.630655 31.72467 28.119141 31.666016 C 28.607627 31.607366 29.02878 31.310979 29.296875 31.007812 L 29.298828 31.005859 C 29.655629 30.601347 30.715848 29.390728 31.224609 28.644531 C 31.246169 28.652131 31.239109 28.646231 31.408203 28.707031 L 31.408203 28.708984 L 31.410156 28.708984 C 31.487356 28.736474 32.454286 29.169267 33.316406 29.580078 C 34.178526 29.990889 35.053561 30.417875 35.337891 30.558594 C 35.748225 30.761674 35.942113 30.893881 35.992188 30.894531 C 35.995572 30.982516 35.998992 31.07786 35.986328 31.222656 C 35.951258 31.624292 35.8439 32.180225 35.628906 32.775391 C 35.523582 33.066746 34.975018 33.667661 34.283203 34.105469 C 33.591388 34.543277 32.749338 34.852514 32.4375 34.898438 C 31.499896 35.036591 30.386672 35.087027 29.164062 34.703125 C 28.316336 34.437036 27.259305 34.092596 25.890625 33.509766 C 23.114812 32.325956 20.755591 30.311513 19.070312 28.537109 C 18.227674 27.649908 17.552562 26.824019 17.072266 26.199219 C 16.592866 25.575584 16.383528 25.251054 16.208984 25.021484 L 16.207031 25.019531 C 15.897202 24.609805 14 21.970851 14 19.59375 C 14 17.077989 15.168497 16.091436 15.800781 15.410156 C 16.132721 15.052495 16.495617 15 16.642578 15 z" fill="currentColor"/>
  </g>
</svg>`,
			shareComponent: (
				<WhatsappShareButton
					url={currentblogurl}
					title={blogTitle}
					separator=" "
				>
					<span className="ms-3">Whatsapp</span>

				</WhatsappShareButton>
			),
			href: "#",
		},
		{
			id: "Pocket",
			name: "Pocket",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24">
  <path d="M3 5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V17C21 17.5523 20.5523 18 20 18H4C3.44772 18 3 17.5523 3 17V5ZM4 6V16H20V6H4ZM6 8C5.44772 8 5 8.44772 5 9V13C5 13.5523 5.44772 14 6 14H18C18.5523 14 19 13.5523 19 13V9C19 8.44772 18.5523 8 18 8H6Z" fill="currentColor"/>
</svg>
`,
			shareComponent: (
				<PocketShareButton
					url={currentblogurl}
					title={blogTitle}
				>
					<span className="ms-3">Pocket</span>

				</PocketShareButton>
			),
			href: "#",
		},
		{
			id: "Email",
			name: "Email",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24">
  <path d="M12 13.5L5 8.5V7L12 12L19 7V8.5L12 13.5ZM12 21C6.48 21 2 16.52 2 12C2 7.48 6.48 3 12 3C17.52 3 22 7.48 22 12C22 16.52 17.52 21 12 21ZM12 4C7.03 4 4 7.03 4 12C4 16.97 7.03 20 12 20C16.97 20 20 16.97 20 12C20 7.03 16.97 4 12 4Z" fill="currentColor"/>
</svg>
		`,
			shareComponent: (
				<EmailShareButton
					url={currentblogurl}
					title={blogTitle}
					subject={`Check Out Our Latest Blog: ${blogTitle}`}
					body={emailcontent}
					separator=" "
				>
					<span className="ms-3">Email</span>
				</EmailShareButton>
			),
			href: "#",
		}
	];

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
						{socials.map((item) => (
							<MenuItem
								as={'div'}
								key={item.id}
								onClick={() => onClick(item)}
								data-menu-item-id={item.id}
							>
								{item.shareComponent ? (
									<button
										className="flex w-full items-center truncate rounded-xl px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
									>
										{!!item.icon && <div dangerouslySetInnerHTML={{ __html: item.icon }} />}
										{item.shareComponent}
									</button>
								) : renderItem && typeof renderItem(item) !== 'undefined' ? (
									renderItem(item)
								) : (
									<button
										className="flex w-full items-center truncate rounded-xl px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
									>
										{!!item.icon && <div dangerouslySetInnerHTML={{ __html: item.icon }} />}
										<span className="ms-3">{item.name}</span>
									</button>
								)}
							</MenuItem>
						))}
					</div>
				</MenuItems>
			</Transition>
		</Menu>
	)
}

export default NcDropDown
