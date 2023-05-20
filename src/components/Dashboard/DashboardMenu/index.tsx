/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useRef } from 'react'
import { CiChat1, CiGrid41, CiMemoPad, CiServer, CiUser } from 'react-icons/ci'
import { classNames } from '../../../lib'

type Props = {
	open: boolean
	handleCallback: () => void
}

const listdb = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: <CiGrid41 size={25} />,
	},
	{
		name: 'User',
		href: '/user',
		icon: <CiUser size={25} />,
	},
	{
		name: 'Posts',
		href: '/dashboard/posts',
		icon: <CiMemoPad size={25} />,
	},
	{
		name: 'Chats',
		href: '/chats',
		icon: <CiChat1 size={25} />,
	},
	{
		name: 'Storage',
		href: '/storage',
		icon: <CiServer size={25} />,
	},
]

const DashboardMenu = (props: Props) => {
	const router = useRouter()
	const cancelButtonRef = useRef(null)

	return (
		<Transition.Root show={props.open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-30"
				onClose={props.handleCallback}
				initialFocus={cancelButtonRef}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 left-20 flex max-w-full">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
										<div className="px-4 sm:px-6 flex justify-between items-center border-b pb-2">
											<div className="flex items-center">
												<img
													className="h-6 w-auto sm:h-10 rounded"
													src="/images/Cuns.jpg"
													alt="BCuns"
												/>
												<Dialog.Title className="ml-3 text-base font-bold leading-6 text-gray-900">
													Cuns Manager
												</Dialog.Title>
											</div>

											<button
												type="button"
												className="rounded-md text-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white p-1"
												onClick={props.handleCallback}
											>
												<span className="sr-only">Close panel</span>
												<XMarkIcon className="h-6 w-6" aria-hidden="true" />
											</button>
										</div>
										<div className="relative mt-6 flex-1 px-4 sm:px-6">
											{/* Your content */}
											<nav className="grid gap-y-8">
												{listdb.map((e, i) => (
													<Link
														key={i}
														href={e.href}
														className={classNames(
															'flex gap-2 rounded py-2 px-4 font-bold',
															router.asPath.search('/dashboard/') === 0
																? router.asPath.search(e.href) === 0 && e.href !== '/dashboard'
																	? 'bg-red-200 text-red-600 shadow shadow-red-400'
																	: 'text-gray-500'
																: e.href === '/dashboard'
																? 'bg-red-200 text-red-600 shadow shadow-red-400'
																: 'text-gray-500'
														)}
														onClick={props.handleCallback}
													>
														{e.icon}
														<span>{e.name}</span>
													</Link>
												))}
											</nav>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default DashboardMenu
