/* eslint-disable @next/next/no-img-element */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import {
	CiAlignBottom,
	CiHeart,
	CiImageOn,
	CiRead,
	CiSignpostDuo1,
	CiTimer,
	CiYoutube,
} from 'react-icons/ci'
import { BsChevronDown } from 'react-icons/bs'
import { HiOutlineUsers } from 'react-icons/hi'

type Props = {
	open: boolean
	handleCallback: () => void
}

const Menu = (props: Props) => {
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
										<div className="px-4 sm:px-6 flex justify-between items-center border-b">
											<div className="flex items-center">
												<img
													className="h-6 w-auto sm:h-10 rounded"
													src="/images/BC.png"
													alt="BCuns"
												/>
												<Dialog.Title className="ml-3 text-base font-semibold leading-6 text-gray-900">
													BCuns
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
												<Link
													href={'/news'}
													className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
													onClick={props.handleCallback}
												>
													<CiSignpostDuo1 size={25} className="text-green-600" />
													<span className="ml-3 text-base font-medium text-gray-900">News</span>
												</Link>
												{/* comics */}
												<div className="-m-3">
													<input type="checkbox" name="" className="peer hidden" id="comcis" />
													<div className="is-checked">
														<label
															htmlFor="comcis"
															className="p-3 flex justify-between rounded-lg hover:bg-gray-50"
														>
															<div className="flex items-center">
																<CiImageOn size={25} className="text-red-600" />
																<span className="ml-3 text-base font-medium text-gray-900">
																	Comics
																</span>
															</div>
															<div className="flex items-center p-3 ">
																<BsChevronDown className="transition ease-in-out duration-500 group-first:checked:rotate-180" />
															</div>
														</label>
													</div>
													<div className="overflow-hidden transition-[height] ease-in-out duration-500 h-0 pl-8 peer-checked:h-full">
														<Link
															href={'/comics'}
															className="flex items-center rounded-lg p-3 hover:bg-gray-50"
															onClick={props.handleCallback}
														>
															<CiImageOn size={25} className="text-indigo-600" />
															<span className="ml-3 text-base font-medium text-gray-900">
																All comics
															</span>
														</Link>
														<Link
															href={'/comics/playlist/ranks'}
															className="flex items-center rounded-lg p-3 hover:bg-gray-50"
															onClick={props.handleCallback}
														>
															<CiAlignBottom size={25} className="text-green-600" />
															<span className="ml-3 text-base font-medium text-gray-900">
																Top ratings
															</span>
														</Link>
														<Link
															href={'/comics/playlist/views'}
															className="flex items-center rounded-lg p-3 hover:bg-gray-50"
															onClick={props.handleCallback}
														>
															<CiRead size={25} className="text-orange-600" />
															<span className="ml-3 text-base font-medium text-gray-900">
																Top views
															</span>
														</Link>
														<Link
															href={'/comics/playlist/likes'}
															className="flex items-center rounded-lg p-3 hover:bg-gray-50"
															onClick={props.handleCallback}
														>
															<CiHeart size={25} className="text-red-600" />
															<span className="ml-3 text-base font-medium text-gray-900">
																Top likes
															</span>
														</Link>
														<Link
															href={'/comics/playlist/updates'}
															className="flex items-center rounded-lg p-3 hover:bg-gray-50"
															onClick={props.handleCallback}
														>
															<CiTimer size={25} className="text-cyan-600" />
															<span className="ml-3 text-base font-medium text-gray-900">
																New updated
															</span>
														</Link>
													</div>
												</div>
												{/* anime */}
												<div className="-m-3">
													<input type="checkbox" name="" className="peer hidden" id="anime" />
													<div className="">
														<label
															htmlFor="anime"
															className="p-3 flex justify-between rounded-lg hover:bg-gray-50"
														>
															<div className="flex items-center">
																<CiYoutube size={25} className="text-orange-600" />
																<span className="ml-3 text-base font-medium text-gray-900">
																	Anime
																</span>
															</div>
															<div className="flex items-center p-3 ">
																<BsChevronDown />
															</div>
														</label>
													</div>
													<div className="overflow-hidden transition-[height] ease-in-out duration-500 h-0 pl-8 peer-checked:h-full">
														<Link
															href={'/anime'}
															className="flex items-center rounded-lg p-3 hover:bg-gray-50"
															onClick={props.handleCallback}
														>
															<CiYoutube size={25} className="text-indigo-600" />
															<span className="ml-3 text-base font-medium text-gray-900">
																All anime
															</span>
														</Link>
														<Link
															href={'/anime/playlist/ranks'}
															className="flex items-center rounded-lg p-3 hover:bg-gray-50"
															onClick={props.handleCallback}
														>
															<CiAlignBottom size={25} className="text-green-600" />
															<span className="ml-3 text-base font-medium text-gray-900">
																Top ratings
															</span>
														</Link>
														<Link
															href={'/anime/playlist/views'}
															className="flex items-center rounded-lg p-3 hover:bg-gray-50"
															onClick={props.handleCallback}
														>
															<CiRead size={25} className="text-orange-600" />
															<span className="ml-3 text-base font-medium text-gray-900">
																Top views
															</span>
														</Link>
														<Link
															href={'/anime/playlist/likes'}
															className="flex items-center rounded-lg p-3 hover:bg-gray-50"
															onClick={props.handleCallback}
														>
															<CiHeart size={25} className="text-red-600" />
															<span className="ml-3 text-base font-medium text-gray-900">
																Top likes
															</span>
														</Link>
														<Link
															href={'/anime/playlist/updates'}
															className="flex items-center rounded-lg p-3 hover:bg-gray-50"
															onClick={props.handleCallback}
														>
															<CiTimer size={25} className="text-cyan-600" />
															<span className="ml-3 text-base font-medium text-gray-900">
																New updated
															</span>
														</Link>
													</div>
												</div>
												<Link
													href={'/blog'}
													className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
													onClick={props.handleCallback}
												>
													<HiOutlineUsers size={25} className="text-indigo-600" />
													<span className="ml-3 text-base font-medium text-gray-900">Blog</span>
												</Link>
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

export default Menu
