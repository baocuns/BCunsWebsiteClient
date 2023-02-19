/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState, Fragment } from 'react'
import { useTheme } from 'next-themes'
import { CiBellOn, CiChat2, CiGrid41, CiLogin, CiLogout, CiSearch, CiUser } from 'react-icons/ci'
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

const profiles = [
	{
		name: 'Light/Dark',
		description: 'Adjust the light your way!',
		href: '#',
		icon: ChartBarIcon,
	},
]

type Props = {}

const OptionsBar = (props: Props) => {
	//** default */
	const { theme, setTheme } = useTheme()
	const session = useSession()
	const supabase = useSupabaseClient<Database>()
	const router = useRouter()

	//** Open modal search */
	const [isSearch, setIsSearch] = useState<boolean>(false)
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
					className="inline-flex items-center justify-center rounded-lg p-2 text-black hover:bg-gray-100 hover:text-green-500"
					onClick={handleOpenSearch}
				>
					<span className="sr-only">Open search</span>
					<CiSearch size={24} />
				</button>
				{/* Dark/Light */}
				<button
					type="button"
					className="inline-flex items-center justify-center rounded-lg p-2 text-black hover:bg-gray-100 hover:text-green-500"
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				>
					{theme === 'dark' ? <MdDarkMode size={24} /> : <MdLightMode size={24} />}
				</button>
				{/* notification */}
				<Popover className="">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open ? 'animate-bounce text-red-500' : 'text-black',
									'group relative inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 hover:text-green-500'
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
											<p>Messenger</p>
										</div>
										<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
											{profiles.map((item) => (
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
														<p className="text-base font-medium text-gray-900">{item.name}</p>
														<p className="mt-1 text-sm text-gray-500">{item.description}</p>
													</div>
												</Link>
											))}
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
				<Popover className="">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open ? 'animate-bounce text-red-500' : 'text-black',
									'group relative inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 hover:text-green-500'
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
											{profiles.map((item) => (
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
														<p className="text-base font-medium text-gray-900">{item.name}</p>
														<p className="mt-1 text-sm text-gray-500">{item.description}</p>
													</div>
												</Link>
											))}
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
							<Popover.Button
								className={classNames(
									open ? 'animate-bounce text-red-500' : 'text-black',
									'group inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 hover:text-green-500'
								)}
							>
								<CiUser size={24} />
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
											<p>Say Hi</p>
										</div>
										<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
											{profiles.map((item) => (
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
														<p className="text-base font-medium text-gray-900">{item.name}</p>
														<p className="mt-1 text-sm text-gray-500">{item.description}</p>
													</div>
												</Link>
											))}
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
				{/* Login/Logout */}
				{session ? (
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
				)}
			</div>
			<Search open={isSearch} handleCallback={handleOpenSearch} />
		</>
	)
}

export default OptionsBar
