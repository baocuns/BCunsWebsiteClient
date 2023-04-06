/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState, Fragment } from 'react'
import { useTheme } from 'next-themes'
import {
	CiAlignBottom,
	CiGrid41,
	CiHeart,
	CiImageOn,
	CiRead,
	CiTimer,
	CiYoutube,
} from 'react-icons/ci'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Search from '../Search'
import { Dialog, Popover, Transition } from '@headlessui/react'

import {
	ArrowPathIcon,
	BookmarkSquareIcon,
	CalendarIcon,
	ChartBarIcon,
	CursorArrowRaysIcon,
	LifebuoyIcon,
	PhoneIcon,
	PlayIcon,
	ShieldCheckIcon,
	Squares2X2Icon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import OptionsBar from './optionsbar'
import Menu from '../Menu'
import Banner from '../Banner'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const solutions = [
	{
		name: 'Analytics',
		description: 'Get a better understanding of where your traffic is coming from.',
		href: '#',
		icon: ChartBarIcon,
	},
	{
		name: 'Engagement',
		description: 'Speak directly to your customers in a more meaningful way.',
		href: '#',
		icon: CursorArrowRaysIcon,
	},
	{
		name: 'Security',
		description: "Your customers' data will be safe and secure.",
		href: '#',
		icon: ShieldCheckIcon,
	},
	{
		name: 'Integrations',
		description: "Connect with third-party tools that you're already using.",
		href: '#',
		icon: Squares2X2Icon,
	},
	{
		name: 'Automations',
		description: 'Build strategic funnels that will drive your customers to convert',
		href: '#',
		icon: ArrowPathIcon,
	},
]
const callsToAction = [
	{ name: 'Watch Demo', href: '#', icon: PlayIcon },
	{ name: 'Contact Sales', href: '#', icon: PhoneIcon },
]
const resources = [
	{
		name: 'Help Center',
		description: 'Get all of your questions answered in our forums or contact support.',
		href: '#',
		icon: LifebuoyIcon,
	},
	{
		name: 'Guides',
		description: 'Learn how to maximize our platform to get the most out of it.',
		href: '#',
		icon: BookmarkSquareIcon,
	},
	{
		name: 'Events',
		description: 'See what meet-ups and other events we might be planning near you.',
		href: '#',
		icon: CalendarIcon,
	},
	{
		name: 'Security',
		description: 'Understand how we take your privacy seriously.',
		href: '#',
		icon: ShieldCheckIcon,
	},
]
const recentPosts = [
	{ id: 1, name: 'Boost your conversion rate', href: '#' },
	{ id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
	{ id: 3, name: 'Improve your customer experience', href: '#' },
]

const profiles = [
	{
		name: 'Light/Dark',
		description: 'Adjust the light your way!',
		href: '#',
		icon: ChartBarIcon,
	},
]

type Props = {}

const Headers = (props: Props) => {
	//** default */
	const { theme, setTheme } = useTheme()
	const session = useSession()
	const supabase = useSupabaseClient<Database>()
	const router = useRouter()

	//** Event scroll animation header */
	const [isScrollDown, setIsScrollDown] = useState(false)
	const [valueScy, setValueScy] = useState(0)

	const handleScroll = useCallback(() => {
		if (window.scrollY > valueScy) {
			setIsScrollDown(true)
		} else {
			setIsScrollDown(false)
		}

		setValueScy(window.scrollY)
	}, [valueScy])

	useEffect(() => {
		window.addEventListener('scroll', () => handleScroll())
		// return window.removeEventListener('scroll', () => handleScroll())
	}, [handleScroll])
	//** Event scroll animation header */

	//** Open modal search */
	const [isSearch, setIsSearch] = useState<boolean>(false)
	const handleOpenSearch = () => {
		setIsSearch(!isSearch)
	}

	//** Open menu */
	const [isMenu, setIsMenu] = useState<boolean>(false)

	const handleOpenMenu = () => {
		setIsMenu(!isMenu)
		console.log(isMenu)
	}

	return (
		<>
			<div className="h-20">
				<div
					className={`fixed w-full animation_scroll z-20 bg-white/90 dark:bg-gray-800 dark:shadow-gray-700 ${
						isScrollDown ? 'is_scroll' : 'shadow'
					}`}
				>
					{/* banner */}
					<Banner />

					{/* nav */}
					<Popover className="relative bg-transparent">
						<div className="mx-auto max-w-7xl px-6">
							<div className="flex items-center justify-between py-3 md:justify-start md:space-x-10">
								{/* logo */}
								<div className="flex justify-start md:w-0 md:flex-1">
									<Link href={'/'}>
										<span className="sr-only">Your Company</span>
										<img className="h-8 w-auto sm:h-10 rounded" src="/images/BC.png" alt="BCuns" />
									</Link>
								</div>
								<div className="-my-2 -mr-2 md:hidden flex">
									{/* option bar */}
									<OptionsBar />

									<button
										className="inline-flex items-center justify-center rounded-lg p-2 text-black hover:bg-gray-100 hover:text-green-500 focus:outline-none"
										onClick={handleOpenMenu}
									>
										<span className="sr-only">Open menu</span>
										<CiGrid41 size={24} />
									</button>
								</div>
								<Popover.Group as="nav" className="hidden space-x-10 md:flex">
									{/* comics */}
									<Popover className="relative">
										{({ open }) => (
											<>
												<Popover.Button
													className={classNames(
														open ? 'text-red-600 dark:text-white' : 'text-gray-500',
														'group inline-flex items-center rounded text-base font-medium hover:text-red-600 dark:hover:text-white'
													)}
												>
													<span>Comics</span>
													<ChevronDownIcon
														className={classNames(
															open ? 'text-gray-600' : 'text-gray-400',
															'ml-2 h-5 w-5 group-hover:text-gray-500'
														)}
														aria-hidden="true"
													/>
												</Popover.Button>

												<Transition
													as={Fragment}
													enter="transition ease-out duration-200"
													enterFrom="opacity-0 translate-y-1"
													enterTo="opacity-100 translate-y-0"
													leave="transition ease-in duration-150"
													leaveFrom="opacity-100 translate-y-0"
													leaveTo="opacity-0 translate-y-1"
												>
													<Popover.Panel className="absolute z-0 -ml-4 mt-3 w-screen max-w-lg transform px-2 sm:px-0 md:left-1/2 md:ml-0 md:-translate-x-1/2">
														<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
															<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
																<Link
																	href={'/comics'}
																	className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
																>
																	<CiImageOn size={25} className="text-indigo-600" />
																	<span className="ml-3 text-base font-medium text-gray-900">
																		All comics
																	</span>
																</Link>
																<Link
																	href={'/comics/playlist/ranks'}
																	className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
																>
																	<CiAlignBottom size={25} className="text-green-600" />
																	<span className="ml-3 text-base font-medium text-gray-900">
																		Comics with the highest ratings
																	</span>
																</Link>
																<Link
																	href={'/comics/playlist/views'}
																	className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
																>
																	<CiRead size={25} className="text-orange-600" />
																	<span className="ml-3 text-base font-medium text-gray-900">
																		Comics with the most views
																	</span>
																</Link>
																<Link
																	href={'/comics/playlist/likes'}
																	className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
																>
																	<CiHeart size={25} className="text-red-600" />
																	<span className="ml-3 text-base font-medium text-gray-900">
																		Comics with the most likes
																	</span>
																</Link>
																<Link
																	href={'/comics/playlist/updates'}
																	className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
																>
																	<CiTimer size={25} className="text-cyan-600" />
																	<span className="ml-3 text-base font-medium text-gray-900">
																		New updated comics
																	</span>
																</Link>
															</div>
														</div>
													</Popover.Panel>
												</Transition>
											</>
										)}
									</Popover>
									{/* anime */}
									<Popover className="relative">
										{({ open }) => (
											<>
												<Popover.Button
													className={classNames(
														open ? 'text-red-600 dark:text-white' : 'text-gray-500',
														'group inline-flex items-center rounded text-base font-medium hover:text-red-600 dark:hover:text-white'
													)}
												>
													<span>Anime</span>
													<ChevronDownIcon
														className={classNames(
															open ? 'text-gray-600' : 'text-gray-400',
															'ml-2 h-5 w-5 group-hover:text-gray-500'
														)}
														aria-hidden="true"
													/>
												</Popover.Button>

												<Transition
													as={Fragment}
													enter="transition ease-out duration-200"
													enterFrom="opacity-0 translate-y-1"
													enterTo="opacity-100 translate-y-0"
													leave="transition ease-in duration-150"
													leaveFrom="opacity-100 translate-y-0"
													leaveTo="opacity-0 translate-y-1"
												>
													<Popover.Panel className="absolute z-0 -ml-4 mt-3 w-screen max-w-lg transform px-2 sm:px-0 md:left-1/2 md:ml-0 md:-translate-x-1/2">
														<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
															<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
																<Link
																	href={'/anime'}
																	className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
																>
																	<CiYoutube size={25} className="text-indigo-600" />
																	<span className="ml-3 text-base font-medium text-gray-900">
																		All anime
																	</span>
																</Link>
																<Link
																	href={'/anime/playlist/ranks'}
																	className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
																>
																	<CiAlignBottom size={25} className="text-green-600" />
																	<span className="ml-3 text-base font-medium text-gray-900">
																		Anime with the highest ratings
																	</span>
																</Link>
																<Link
																	href={'/anime/playlist/views'}
																	className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
																>
																	<CiRead size={25} className="text-orange-600" />
																	<span className="ml-3 text-base font-medium text-gray-900">
																		Anime with the most views
																	</span>
																</Link>
																<Link
																	href={'/anime/playlist/likes'}
																	className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
																>
																	<CiHeart size={25} className="text-red-600" />
																	<span className="ml-3 text-base font-medium text-gray-900">
																		Anime with the most likes
																	</span>
																</Link>
																<Link
																	href={'/anime/playlist/updates'}
																	className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
																>
																	<CiTimer size={25} className="text-cyan-600" />
																	<span className="ml-3 text-base font-medium text-gray-900">
																		New updated anime
																	</span>
																</Link>
															</div>
														</div>
													</Popover.Panel>
												</Transition>
											</>
										)}
									</Popover>

									<Link href={'/news'}>
										<p className="text-base font-medium text-gray-500 hover:text-gray-900">News</p>
									</Link>
									<Link
										href="blog"
										className="text-base font-medium text-gray-500 hover:text-gray-900"
									>
										Blog
									</Link>

									<Popover className="relative">
										{({ open }) => (
											<>
												<Popover.Button
													className={classNames(
														open ? 'text-red-600 dark:text-white' : 'text-gray-500',
														'group inline-flex items-center rounded text-base font-medium hover:text-red-600 dark:hover:text-white'
													)}
												>
													<span>Docs</span>
													<ChevronDownIcon
														className={classNames(
															open ? 'text-gray-600' : 'text-gray-400',
															'ml-2 h-5 w-5 group-hover:text-gray-500'
														)}
														aria-hidden="true"
													/>
												</Popover.Button>

												<Transition
													as={Fragment}
													enter="transition ease-out duration-200"
													enterFrom="opacity-0 translate-y-1"
													enterTo="opacity-100 translate-y-0"
													leave="transition ease-in duration-150"
													leaveFrom="opacity-100 translate-y-0"
													leaveTo="opacity-0 translate-y-1"
												>
													<Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-lg -translate-x-1/2 transform px-2 sm:px-0">
														<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
															<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
																{resources.map((item) => (
																	<Link
																		key={item.name}
																		href={item.href}
																		className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
																	>
																		<item.icon
																			className="h-6 w-6 flex-shrink-0 text-indigo-600"
																			aria-hidden="true"
																		/>
																		<div className="ml-4">
																			<p className="text-base font-medium text-gray-900">
																				{item.name}
																			</p>
																			<p className="mt-1 text-sm text-gray-500">
																				{item.description}
																			</p>
																		</div>
																	</Link>
																))}
															</div>
															<div className="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
																<div>
																	<h3 className="text-base font-medium text-gray-500">
																		Recent Posts
																	</h3>
																	<ul role="list" className="mt-4 space-y-4">
																		{recentPosts.map((post) => (
																			<li key={post.id} className="truncate text-base">
																				<Link
																					href={post.href}
																					className="font-medium text-gray-900 hover:text-gray-700"
																				>
																					{post.name}
																				</Link>
																			</li>
																		))}
																	</ul>
																</div>
																<div className="mt-5 text-sm">
																	<Link
																		href="#"
																		className="font-medium text-indigo-600 hover:text-indigo-500"
																	>
																		View all posts
																		<span aria-hidden="true"> &rarr;</span>
																	</Link>
																</div>
															</div>
														</div>
													</Popover.Panel>
												</Transition>
											</>
										)}
									</Popover>
								</Popover.Group>

								{/* option bar */}
								<div className="hidden items-center justify-end md:flex md:flex-1 md:w-0">
									<OptionsBar />
								</div>
							</div>
						</div>
					</Popover>
				</div>
			</div>

			{/* serach */}
			<Search open={isSearch} handleCallback={handleOpenSearch} />
			{/* menu mobile */}
			<Menu open={isMenu} handleCallback={handleOpenMenu} />
		</>
	)
}

export default Headers
