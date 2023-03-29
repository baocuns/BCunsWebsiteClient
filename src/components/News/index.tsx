/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

type Props = {}

const News = (props: Props) => {
	return (
		<>
			<div className="px-4 sm:px-8 md:px-12 lg:px-16 py-4 md:py-12">
				<div className="flex justify-between pb-3 md:py-6">
					<h2 className="text-3xl lg:text-5xl font-bold dark:text-white">What&apos;s happening?</h2>
					<Link href={'#'} className="hidden lg:block">
						<div className="flex items-center gap-1 px-4 py-2 rounded shadow font-bold uppercase hover:bg-gray-100 transition duration-500 ease-in-out hover:scale-110 dark:shadow-gray-700 dark:hover:bg-gray-700 dark:text-white">
							<p>see more</p>
							<FiChevronRight size={20} />
						</div>
					</Link>
				</div>
				<div className="py-6">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
						<div className="md:col-span-3 relative transition duration-500 ease-in-out hover:scale-105 z-10">
							<div className="w-full h-full">
								<img
									src="https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/thumb_1920x1080__notext_-74b733a15710-1677820176303-e0UF4omJ.jpg?v=0&maxW=1400&format=webp"
									alt=""
									className="h-full w-full rounded"
								/>
							</div>
							<Link href="#">
								<span aria-hidden="true" className="absolute inset-0"></span>
								<div className="absolute bottom-0 w-full bg-black/50 px-6 md:px-12 py-5 md:py-10 rounded-b">
									<p className="text-white font-bold text-sm md:text-3xl">
										Prime Gaming and Riot Games Run it Back
									</p>
								</div>
							</Link>
						</div>
						<div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-none md:grid-rows-4 gap-4">
							<div className="grid grid-cols-3 gap-4 relative transition duration-500 ease-in-out hover:scale-105 shadow rounded dark:shadow-gray-700">
								<div
									className=""
									style={{
										clipPath: 'polygon(0 0,100% 0,85% 100%,0 100%)',
									}}
								>
									<img
										src="https://popsimg.akamaized.net/api/v2/containers/file2/cms_assets/kl2023_thumb_1920x1080__notext_-d5822577b9ea-1678181211902-7CHfDw6A.jpg?v=0&maxW=1400&format=webp"
										alt=""
										className="h-full w-full rounded-l"
									/>
								</div>
								<div className="col-span-2 p-2">
									<Link href="#">
										<span aria-hidden="true" className="absolute inset-0"></span>
										<p className="font-bold line-clamp-1 md:line-clamp-2 dark:text-white">
											From Duck Hunt to Riot Games, Maye Mac-Swiney’s Gaming
										</p>
									</Link>
									<div>
										<p className="line-clamp-2 font-light dark:text-white">
											Lorem ipsum dolor sit amet conse ctetur adipi sicing elit. Aliquid, excepturi
											amet? Praesentium asperiores eligendi aperiam doloremque autem odit voluptatum
											alias, rem necessitatibus deleniti natus sunt vel quasi reprehenderit
											voluptatibus quidem.
										</p>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-4 relative transition duration-500 ease-in-out hover:scale-105 shadow rounded dark:shadow-gray-700">
								<div
									className=""
									style={{
										clipPath: 'polygon(0 0,100% 0,85% 100%,0 100%)',
									}}
								>
									<img
										src="https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/1920x1080_slider-fa8d5ffe9079-1678420976314-jrZwTXtE.jpg?v=0&maxW=1400&format=webp"
										alt=""
										className="h-full w-full rounded-l"
									/>
								</div>
								<div className="col-span-2 p-2">
									<Link href="#">
										<span aria-hidden="true" className="absolute inset-0"></span>
										<p className="font-bold line-clamp-1 md:line-clamp-2 dark:text-white">
											From Duck Hunt to Riot Games, Maye Mac-Swiney’s Gaming
										</p>
									</Link>
									<div>
										<p className="line-clamp-2 font-light dark:text-white">
											Lorem ipsum dolor sit amet conse ctetur adipi sicing elit. Aliquid, excepturi
											amet? Praesentium asperiores eligendi aperiam doloremque autem odit voluptatum
											alias, rem necessitatibus deleniti natus sunt vel quasi reprehenderit
											voluptatibus quidem.
										</p>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-4 relative transition duration-500 ease-in-out hover:scale-105 shadow rounded dark:shadow-gray-700">
								<div
									className=""
									style={{
										clipPath: 'polygon(0 0,100% 0,85% 100%,0 100%)',
									}}
								>
									<img
										src="https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/copy_of_sepcho_thumb_1280x720__notext_-22886463a9cf-1663317472391-IOnOQU4X.jpeg?v=0&maxW=1400&format=webp"
										alt=""
										className="h-full w-full rounded-l"
									/>
								</div>
								<div className="col-span-2 p-2">
									<Link href="#">
										<span aria-hidden="true" className="absolute inset-0"></span>
										<p className="font-bold line-clamp-1 md:line-clamp-2 dark:text-white">
											From Duck Hunt to Riot Games, Maye Mac-Swiney’s Gaming
										</p>
									</Link>
									<div>
										<p className="line-clamp-2 font-light dark:text-white">
											Lorem ipsum dolor sit amet conse ctetur adipi sicing elit. Aliquid, excepturi
											amet? Praesentium asperiores eligendi aperiam doloremque autem odit voluptatum
											alias, rem necessitatibus deleniti natus sunt vel quasi reprehenderit
											voluptatibus quidem.
										</p>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-4 relative transition duration-500 ease-in-out hover:scale-105 shadow rounded dark:shadow-gray-700">
								<div
									className=""
									style={{
										clipPath: 'polygon(0 0,100% 0,85% 100%,0 100%)',
									}}
								>
									<img
										src="https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/copy_of_kvpex_thumb_1920x1080__notext_-f2a1eb0c96dd-1669023034755-WPjcwavK.jpg?v=0&maxW=1400&format=webp"
										alt=""
										className="h-full w-full rounded-l"
									/>
								</div>
								<div className="col-span-2 p-2">
									<Link href="#">
										<span aria-hidden="true" className="absolute inset-0"></span>
										<p className="font-bold line-clamp-1 md:line-clamp-2 dark:text-white">
											From Duck Hunt to Riot Games, Maye Mac-Swiney’s Gaming
										</p>
									</Link>
									<div>
										<p className="line-clamp-2 font-light dark:text-white">
											Lorem ipsum dolor sit amet conse ctetur adipi sicing elit. Aliquid, excepturi
											amet? Praesentium asperiores eligendi aperiam doloremque autem odit voluptatum
											alias, rem necessitatibus deleniti natus sunt vel quasi reprehenderit
											voluptatibus quidem.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="pt-6 flex justify-center">
						<Link href={'#'} className="lg:hidden">
							<div className="flex items-center gap-1 px-4 py-2 rounded shadow font-bold uppercase hover:bg-gray-100 transition duration-500 ease-in-out hover:scale-110 dark:shadow-gray-700 dark:hover:bg-gray-700 dark:text-white">
								<p>see more</p>
								<FiChevronRight size={20} />
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default News
