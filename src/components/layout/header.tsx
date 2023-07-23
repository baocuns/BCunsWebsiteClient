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
// import { supabase } from '../../config/supabase'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const comicsHeader = [
	{
		name: 'Danh sách đề cử',
		href: '/comics',
		icon: <CiImageOn size={25} className="text-indigo-600" />,
	},
	{
		name: 'Bảng xếp hạng',
		href: '/comics/playlist/ranks',
		icon: <CiAlignBottom size={25} className="text-green-600" />,
	},
	{
		name: 'Lượt xem khủng',
		href: '/comics/playlist/views',
		icon: <CiRead size={25} className="text-orange-600" />,
	},
	{
		name: 'Yêu thích',
		href: '/comics/playlist/likes',
		icon: <CiHeart size={25} className="text-red-600" />,
	},
	{
		name: 'Mới cập nhật',
		href: '/comics/playlist/updates',
		icon: <CiTimer size={25} className="text-cyan-600" />,
	},
]
const animesHeader = [
	{
		name: 'Danh sách đề cử',
		href: '/anime',
		icon: <CiImageOn size={25} className="text-indigo-600" />,
	},
	{
		name: 'Bảng xếp hạng',
		href: '/anime/playlist/ranks',
		icon: <CiAlignBottom size={25} className="text-green-600" />,
	},
	{
		name: 'Lượt xem khủng',
		href: '/anime/playlist/views',
		icon: <CiRead size={25} className="text-orange-600" />,
	},
	{
		name: 'Yêu thích',
		href: '/anime/playlist/likes',
		icon: <CiHeart size={25} className="text-red-600" />,
	},
	{
		name: 'Mới cập nhật',
		href: '/anime/playlist/updates',
		icon: <CiTimer size={25} className="text-cyan-600" />,
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
	const [profile, setProfile] = useState<Database['public']['Tables']['profiles']['Row']>()

	//*********************************** Event proile */
	useEffect(() => {
		session?.user.id !== undefined && supabase
			.from('profiles')
			.select()
			.eq('uid', session?.user.id)
			.single()
			.then(({ data, error, status }) => {
				if (data) {
					setProfile(data)
				}
			})
	}, [session?.user.id, supabase])

	// realtime
	useEffect(() => {
		const channel = supabase
			.channel('realtime_profiles')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'profiles' },
				(payload) => {
					// console.log('payload: ', payload)
					if (session?.user.id === payload.new?.uid) {
						setProfile({
							id: payload.new.id,
							uid: payload.new.uid,
							bcuns_id: payload.new.bcuns_id,
							full_name: payload.new.full_name,
							story: payload.new.story,
							avatar_url: payload.new.avatar_url,
							is_block: payload.new.is_block,
							is_public: payload.new.is_public,
						})
					}
				}
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [session?.user.id, supabase])
	useEffect(() => {
		!session && setProfile(undefined)
	}, [session])
	//********************************** Event proile */

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
		// console.log(isMenu)
	}

	return (
		<>
			<div className="h-20">
				<div
					className={`fixed w-full animation_scroll z-20 bg-white/90 dark:bg-gray-800/90 dark:shadow-gray-700 ${
						isScrollDown ? 'is_scroll' : 'shadow'
					}`}
				>
					{/* banner */}
					{/* <Banner /> */}

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
									<OptionsBar profile={profile} />

									<button
										className="inline-flex items-center justify-center rounded-lg p-2 text-black hover:bg-gray-100 hover:text-green-500 focus:outline-none dark:text-white"
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
												{open ? (
													<>
														<button
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
														</button>
													</>
												) : (
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
													</>
												)}

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
																{comicsHeader.map((e, i) => (
																	<Link
																		key={i}
																		href={e.href}
																		className="-m-3 rounded-lg hover:bg-gray-50"
																	>
																		<Popover.Button className="flex items-center w-full p-3">
																			{e.icon}
																			<span className="ml-3 text-base font-medium text-gray-900">
																				{e.name}
																			</span>
																		</Popover.Button>
																	</Link>
																))}
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
												{open ? (
													<>
														<button
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
														</button>
													</>
												) : (
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
													</>
												)}

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
																{animesHeader.map((e, i) => (
																	<Link
																		key={i}
																		href={e.href}
																		className="-m-3 rounded-lg hover:bg-gray-50"
																	>
																		<Popover.Button className="flex items-center w-full p-3">
																			{e.icon}
																			<span className="ml-3 text-base font-medium text-gray-900">
																				{e.name}
																			</span>
																		</Popover.Button>
																	</Link>
																))}
															</div>
														</div>
													</Popover.Panel>
												</Transition>
											</>
										)}
									</Popover>

									{/* <Link href={'#'}>
										<p className="text-base font-medium text-gray-500 hover:text-gray-900">News</p>
									</Link>
									<Link
										href="#"
										className="text-base font-medium text-gray-500 hover:text-gray-900"
									>
										Blog
									</Link> */}
								</Popover.Group>

								{/* option bar */}
								<div className="hidden items-center justify-end md:flex md:flex-1 md:w-0">
									<OptionsBar profile={profile} />
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
