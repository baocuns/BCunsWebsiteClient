/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState, Fragment } from 'react'
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
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Search from '../Search'
import { Popover, Transition } from '@headlessui/react'

import { ChartBarIcon, PhoneIcon, PlayIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const callsToAction = [
	{ name: 'Watch Demo', href: '#', icon: PlayIcon },
	{ name: 'Contact Sales', href: '#', icon: PhoneIcon },
]

type Props = {
	profile: Database['public']['Tables']['profiles']['Row'] | undefined
}

const OptionsBar = (props: Props) => {
	//** default */
	const { theme, setTheme } = useTheme()
	const session = useSession()
	const supabase = useSupabaseClient<Database>()
	const router = useRouter()

	//** Open modal search */
	const [isSearch, setIsSearch] = useState<boolean>(false)

	// function
	const handleOpenSearch = () => {
		setIsSearch(!isSearch)
	}

	//** Open modal search */
	return (
		<>
			<div className="flex">
				{/* Search */}
				<button
					type="button"
					className="inline-flex items-center justify-center rounded-lg p-2 text-black hover:bg-gray-100 hover:text-green-500 dark:hover:text-green-500 dark:text-white dark:focus:text-black"
					onClick={handleOpenSearch}
				>
					<span className="sr-only">Open search</span>
					<CiSearch size={24} />
				</button>
				{/* Dark/Light */}
				{/* <button
					type="button"
					className="inline-flex items-center justify-center rounded-lg p-2 text-black hover:bg-gray-100 hover:text-green-500"
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				>
					{theme === 'dark' ? <MdDarkMode size={24} /> : <MdLightMode size={24} />}
				</button> */}
				{/* notification */}
				<Popover className="hidden">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open ? 'animate-bounce text-red-500' : 'text-black',
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
											<p>Notification </p>
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
										<div className="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
											{callsToAction.map((item) => (
												<div key={item.name} className="flow-root">
													<Link
														href={item.href}
														className="-m-3 flex items-center rounded-lg p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
													>
														<item.icon
															className="h-6 w-6 flex-shrink-0 text-gray-400"
															aria-hidden="true"
														/>
														<span className="ml-3">{item.name}</span>
													</Link>
												</div>
											))}
										</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
				{/* messenger */}
				<Popover className="hidden">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open ? 'animate-bounce text-red-500' : 'text-black',
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
										<div className="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
											{callsToAction.map((item) => (
												<div key={item.name} className="flow-root">
													<Link
														href={item.href}
														className="-m-3 flex items-center rounded-lg p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
													>
														<item.icon
															className="h-6 w-6 flex-shrink-0 text-gray-400"
															aria-hidden="true"
														/>
														<span className="ml-3">{item.name}</span>
													</Link>
												</div>
											))}
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
										open ? 'animate-bounce text-red-500' : 'text-black',
										'group inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 hover:text-green-500 dark:hover:text-green-500 dark:text-white dark:focus:text-black'
									)}
								>
									<CiUser size={24} />
								</button>
							) : (
								<Popover.Button
									className={classNames(
										open ? 'animate-bounce text-red-500' : 'text-black',
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
												{props.profile ? props.profile.full_name : 'User'}
											</p>
										</div>
										<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
											<Link
												href={
													props.profile
														? '/' + props.profile?.bcuns_id
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
											{session && session?.user.id === 'ad14fcf2-067d-4351-b065-ab18349e157c' && (
												<Link href={'/dashboard'} className="-m-3 rounded-lg p-3 hover:bg-gray-50">
													<Popover.Button className={'flex items-center w-full'}>
														<CiBowlNoodles size={25} className="text-sky-600" />
														<span className="ml-3 text-base font-normal text-gray-900">
															Bán hàng
														</span>
													</Popover.Button>
												</Link>
											)}
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
													{theme === 'dark' ? <MdDarkMode size={24} /> : <MdLightMode size={24} />}
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
				{/* Login/Logout */}
				{/* {session ? (
					<button
						type="button"
						className="inline-flex items-center justify-center rounded-lg p-2 text-black hover:bg-gray-100 hover:text-green-500"
						onClick={() => supabase.auth.signOut()}
					>
						<CiLogout size={24} />
					</button>
				) : (
					<button
						type="button"
						className="inline-flex items-center justify-center rounded-lg p-2 text-black hover:bg-gray-100 hover:text-green-500"
						onClick={() => router.push(`/auth/login?redirect=${router.asPath}`)}
					>
						<CiLogin size={24} />
					</button>
				)} */}
			</div>
			<Search open={isSearch} handleCallback={handleOpenSearch} />
		</>
	)
}

export default OptionsBar
