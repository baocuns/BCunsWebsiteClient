/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState, Fragment } from 'react'
import { useTheme } from 'next-themes'
import { CiBellOn, CiChat2, CiGrid41, CiLogin, CiLogout, CiSearch } from 'react-icons/ci'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Search from '../Search'
import { Popover, Transition } from '@headlessui/react'

import {
	ArrowPathIcon,
	Bars3Icon,
	BookmarkSquareIcon,
	CalendarIcon,
	ChartBarIcon,
	CursorArrowRaysIcon,
	LifebuoyIcon,
	PhoneIcon,
	PlayIcon,
	ShieldCheckIcon,
	Squares2X2Icon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

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
	//** Open modal search */

	return (
		<>
			<div className="h-20">
				<div
					className={`fixed w-full animation_scroll z-20 bg-white/90 dark:bg-gray-800 dark:shadow-gray-700 ${
						isScrollDown ? 'is_scroll' : 'shadow'
					}`}
				>
					<Popover className="relative bg-transparent">
						<div className="mx-auto max-w-7xl px-6">
							<div className="flex items-center justify-between py-3 lg:justify-start lg:space-x-10">
								{/* logo */}
								<div className="flex justify-start lg:w-0 lg:flex-1">
									<Link href={'/'}>
										<span className="sr-only">Your Company</span>
										<img className="h-8 w-auto sm:h-10 rounded" src="/images/BC.png" alt="BCuns" />
									</Link>
								</div>
								<div className="-my-2 -mr-2 lg:hidden">
									<Popover.Button className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="sr-only">Open menu</span>
										<CiGrid41 size={24} />
									</Popover.Button>
								</div>
								<Popover.Group as="nav" className="hidden space-x-10 lg:flex">
									<Popover className="relative">
										{({ open }) => (
											<>
												<Popover.Button
													className={classNames(
														open ? 'text-gray-900' : 'text-gray-500',
														'group inline-flex items-center rounded-lg bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
													)}
												>
													<span>Solutions</span>
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
													<Popover.Panel className="absolute z-0 -ml-4 mt-3 w-screen max-w-lg transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
														<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
															<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
																{solutions.map((item) => (
																	<a
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
																	</a>
																))}
															</div>
															<div className="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
																{callsToAction.map((item) => (
																	<div key={item.name} className="flow-root">
																		<a
																			href={item.href}
																			className="-m-3 flex items-center rounded-lg p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
																		>
																			<item.icon
																				className="h-6 w-6 flex-shrink-0 text-gray-400"
																				aria-hidden="true"
																			/>
																			<span className="ml-3">{item.name}</span>
																		</a>
																	</div>
																))}
															</div>
														</div>
													</Popover.Panel>
												</Transition>
											</>
										)}
									</Popover>

									<Link href={'/comics'}>
										<p className="text-base font-medium text-gray-500 hover:text-gray-900">
											Comics
										</p>
									</Link>
									<a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
										Docs
									</a>

									<Popover className="relative">
										{({ open }) => (
											<>
												<Popover.Button
													className={classNames(
														open ? 'text-gray-900' : 'text-gray-500',
														'group inline-flex items-center rounded-lg bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
													)}
												>
													<span>More</span>
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
																	<a
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
																	</a>
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
																				<a
																					href={post.href}
																					className="font-medium text-gray-900 hover:text-gray-700"
																				>
																					{post.name}
																				</a>
																			</li>
																		))}
																	</ul>
																</div>
																<div className="mt-5 text-sm">
																	<a
																		href="#"
																		className="font-medium text-indigo-600 hover:text-indigo-500"
																	>
																		View all posts
																		<span aria-hidden="true"> &rarr;</span>
																	</a>
																</div>
															</div>
														</div>
													</Popover.Panel>
												</Transition>
											</>
										)}
									</Popover>
								</Popover.Group>
								<div className="hidden items-center justify-end lg:flex lg:flex-1 lg:w-0">
									<div className="flex items-center">
										<button
											type="button"
											className="hover:text-green-500 p-1"
											onClick={handleOpenSearch}
										>
											<CiSearch size={24} />
										</button>
									</div>
									<button type="button" className="hover:text-green-500 p-1 mx-1">
										<CiBellOn size={24} />
									</button>
									<button type="button" className="hover:text-green-500 p-1 mx-1">
										<CiChat2 size={24} />
									</button>
									{session ? (
										<button
											type="button"
											className="hover:text-green-500 p-1 mx-1"
											onClick={() => supabase.auth.signOut()}
										>
											<CiLogout size={24} />
										</button>
									) : (
										<button
											type="button"
											className="hover:text-green-500 p-1 mx-1"
											onClick={() => router.push(`/auth/login?redirect=${router.asPath}`)}
										>
											<CiLogin size={24} />
										</button>
									)}
									<button
										type="button"
										className="hover:text-green-500 p-1 mx-1"
										onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
									>
										{theme === 'dark' ? <MdDarkMode size={24} /> : <MdLightMode size={24} />}
									</button>
								</div>
							</div>
						</div>

						<Transition
							as={Fragment}
							enter="duration-200 ease-out"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="duration-100 ease-in"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Popover.Panel
								focus
								className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition lg:hidden z-50"
							>
								<div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="px-5 pt-5 pb-6">
										<div className="flex items-center justify-between">
											<div>
												<img
													className="h-8 w-auto"
													src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
													alt="Your Company"
												/>
											</div>
											<div className="-mr-2">
												<Popover.Button className="inline-flex items-center justify-center rounded-lg bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
													<span className="sr-only">Close menu</span>
													<XMarkIcon className="h-6 w-6" aria-hidden="true" />
												</Popover.Button>
											</div>
										</div>
										<div className="mt-6">
											<nav className="grid gap-y-8">
												{solutions.map((item) => (
													<a
														key={item.name}
														href={item.href}
														className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
													>
														<item.icon
															className="h-6 w-6 flex-shrink-0 text-indigo-600"
															aria-hidden="true"
														/>
														<span className="ml-3 text-base font-medium text-gray-900">
															{item.name}
														</span>
													</a>
												))}
											</nav>
										</div>
									</div>
									<div className="space-y-6 py-6 px-5">
										<div className="grid grid-cols-2 gap-y-4 gap-x-8">
											<a
												href="#"
												className="text-base font-medium text-gray-900 hover:text-gray-700"
											>
												Pricing
											</a>

											<a
												href="#"
												className="text-base font-medium text-gray-900 hover:text-gray-700"
											>
												Docs
											</a>
											{resources.map((item) => (
												<a
													key={item.name}
													href={item.href}
													className="text-base font-medium text-gray-900 hover:text-gray-700"
												>
													{item.name}
												</a>
											))}
										</div>
										<div>
											<a
												href="#"
												className="flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
											>
												Sign up
											</a>
											<p className="mt-6 text-center text-base font-medium text-gray-500">
												Existing customer?{' '}
												<a href="#" className="text-indigo-600 hover:text-indigo-500">
													Sign in
												</a>
											</p>
										</div>
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</Popover>
				</div>
			</div>
			<Search open={isSearch} handleCallback={handleOpenSearch} />
		</>
	)
}

export default Headers
