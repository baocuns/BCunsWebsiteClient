import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import {
	CiBellOn,
	CiBowlNoodles,
	CiChat2,
	CiLogin,
	CiLogout,
	CiSearch,
	CiUser,
} from 'react-icons/ci'
import { Popover, Transition } from '@headlessui/react'
import { classNames } from '../../../lib'
import Link from 'next/link'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import Search from '../../Search'
import DashboardMenu from '../DashboardMenu'

type Props = {}

const Navbar = (props: Props) => {
	//** default */
	const session = useSession()
	const supabase = useSupabaseClient<Database>()
	const { theme, setTheme } = useTheme()
	const router = useRouter()

	//** Open modal search */
	const [isSearch, setIsSearch] = useState<boolean>(false)

	const [isScrollDown, setIsScrollDown] = useState(false)
	const [valueScy, setValueScy] = useState(0)
	const [profile, setProfile] = useState<Database['public']['Tables']['profiles']['Row']>()

	// function
	const handleOpenSearch = () => {
		setIsSearch(!isSearch)
	}

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
	}, [handleScroll])

	//** Open menu */
	const [isMenu, setIsMenu] = useState<boolean>(false)

	const handleOpenMenu = () => {
		setIsMenu(!isMenu)
		// console.log(isMenu)
	}
	return (
		<div className="h-20">
			<div
				className={`fixed w-full md:w-4/5 animation_scroll z-20 bg-white/25 dark:bg-gray-800/90 dark:shadow-gray-700 ${
					isScrollDown ? 'is_scroll' : 'shadow'
				}`}
			>
				<div className="flex justify-between py-3 px-4">
					<div className="flex items-center">
						<button onClick={handleOpenMenu} className="text-white">
							<AiOutlineMenu size={25} color="white" />
						</button>
					</div>
					<div className="flex">
						{/* Search */}
						<button
							type="button"
							className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-gray-100 hover:text-green-500 dark:hover:text-green-500 dark:text-white dark:focus:text-black"
							onClick={handleOpenSearch}
						>
							<span className="sr-only">Open search</span>
							<CiSearch size={24} />
						</button>
						{/* notification */}
						<Popover className="">
							{({ open }) => (
								<>
									<Popover.Button
										className={classNames(
											open ? 'animate-bounce text-red-500' : 'text-white',
											'group relative inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 hover:text-green-500 dark:hover:text-green-500 dark:text-white dark:focus:text-black'
										)}
									>
										<span className="absolute top-2 right-2 flex h-3 w-3">
											<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
											<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
										</span>
										<span className="sr-only">Open notification</span>
										<CiBellOn size={24} />
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
										<Popover.Panel className="absolute w-screen max-w-xs md:max-w-md right-10">
											<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
												<div className="py-4 px-8 border-b">
													<p>Notification</p>
												</div>
												<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
													<Link
														href={'item.href'}
														className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
													>
														<div className="ml-4">
															<p className="text-base font-medium text-gray-900">item.name</p>
															<p className="mt-1 text-sm text-gray-500">item.description</p>
														</div>
													</Link>
												</div>
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
						{/* messenger */}
						<Popover className="">
							{({ open }) => (
								<>
									<Popover.Button
										className={classNames(
											open ? 'animate-bounce text-red-500' : 'text-white',
											'group relative inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 hover:text-green-500 dark:hover:text-green-500 dark:text-white dark:focus:text-black'
										)}
									>
										<span className="absolute top-2 right-2 flex h-3 w-3">
											<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
											<span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
										</span>
										<span className="sr-only">Open messenger</span>
										<CiChat2 size={24} />
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
										<Popover.Panel className="absolute w-screen max-w-xs md:max-w-md right-10">
											<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
												<div className="py-4 px-8 border-b">
													<p>Messenger</p>
												</div>
												<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
													ABC
												</div>
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
						{/* Profile */}
						<Popover className="">
							{({ open }) => (
								<>
									{open ? (
										<button
											className={classNames(
												open ? 'animate-bounce text-red-500' : 'text-white',
												'group inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 hover:text-green-500 dark:hover:text-green-500 dark:text-white dark:focus:text-black'
											)}
										>
											<CiUser size={24} />
										</button>
									) : (
										<Popover.Button
											className={classNames(
												open ? 'animate-bounce text-red-500' : 'text-white',
												'group inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 hover:text-green-500 dark:hover:text-green-500 dark:text-white dark:focus:text-black'
											)}
										>
											<CiUser size={24} />
										</Popover.Button>
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
										<Popover.Panel className="absolute w-screen max-w-xs md:max-w-md right-10">
											<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
												<div className="flex gap-2 py-4 px-8 border-b">
													<p className="text-black">Say Hi</p>
													<p className="font-bold text-black">
														{profile ? profile.full_name : 'User'}
													</p>
												</div>
												<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
													<Link
														href={
															profile
																? '/' + profile?.bcuns_id
																: `/auth/login?redirect=${router.asPath}`
														}
														className="-m-3 rounded-lg p-3 hover:bg-gray-50"
													>
														<Popover.Button className={'flex items-center w-full'}>
															<CiUser size={25} className="text-red-600" />
															<span className="ml-3 text-base font-normal text-gray-900">
																Tài khoản
															</span>
														</Popover.Button>
													</Link>
													{/* dashboard */}
													<Link
														href={'/dashboard'}
														className="-m-3 rounded-lg p-3 hover:bg-gray-50"
													>
														<Popover.Button className={'flex items-center w-full'}>
															<CiBowlNoodles size={25} className="text-sky-600" />
															<span className="ml-3 text-base font-normal text-gray-900">
																Bán hàng
															</span>
														</Popover.Button>
													</Link>
												</div>
												<div className="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
													<div className="flex w-full justify-between md:justify-start md:gap-10">
														{/* login/logout */}
														{session ? (
															<Popover.Button
																type="button"
																className="-m-3 flex items-center rounded-lg p-3 text-base font-normal text-gray-900 hover:bg-gray-100"
																onClick={() => supabase.auth.signOut()}
															>
																<CiLogout size={24} />
																<span className="ml-3">Đăng xuất</span>
															</Popover.Button>
														) : (
															<Popover.Button
																type="button"
																className="-m-3 flex items-center rounded-lg p-3 text-base font-normal text-gray-900 hover:bg-gray-100"
																onClick={() => router.push(`/auth/login?redirect=${router.asPath}`)}
															>
																<CiLogin size={24} />
																<span className="ml-3">Đăng nhập</span>
															</Popover.Button>
														)}

														{/* light/dark */}
														<Popover.Button
															type="button"
															className="-m-3 flex items-center rounded-lg p-3 text-base font-normal text-gray-900 hover:bg-gray-100"
															onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
														>
															{theme === 'dark' ? (
																<MdDarkMode size={24} />
															) : (
																<MdLightMode size={24} />
															)}
															{theme === 'dark' ? (
																<span className="ml-3">Tối</span>
															) : (
																<span className="ml-3">Sáng</span>
															)}
														</Popover.Button>
													</div>
												</div>
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
					</div>
				</div>
			</div>
			<Search open={isSearch} handleCallback={handleOpenSearch} />
			<DashboardMenu open={isMenu} handleCallback={handleOpenMenu} />
		</div>
	)
}

export default Navbar
