/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

type Props = {}

const Comics = (props: Props) => {
	return (
		<>
			<div className="px-4 sm:px-8 md:px-12 lg:px-16 py-4 md:py-10">
				<div className="flex justify-between pb-3 md:pb-6">
					<h2 className="text-3xl lg:text-5xl font-bold dark:text-white">Comics</h2>
					<Link href={'/comics'} className="hidden md:block">
						<div className="flex items-center gap-1 px-4 py-2 rounded shadow font-bold uppercase hover:bg-gray-100 transition duration-500 ease-in-out hover:scale-110 dark:shadow-gray-700 dark:hover:bg-gray-700 dark:text-white">
							<p>see more</p>
							<FiChevronRight size={20} />
						</div>
					</Link>
				</div>
				<div className="py-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="relative transition duration-500 ease-in-out hover:scale-105">
							<div className="w-full h-full">
								<img
									src="https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/thumb_1920x1080__notext_-74b733a15710-1677820176303-e0UF4omJ.jpg?v=0&maxW=1400&format=webp"
									alt=""
									className="h-full w-full rounded"
								/>
							</div>
							<Link href="#">
								<span aria-hidden="true" className="absolute inset-0"></span>
								<div className="absolute bottom-0 w-full bg-black/50 px-6 py-5 rounded-b">
									<p className="text-white font-bold text-sm md:text-lg">
										Prime Gaming and Riot Games Run it Back
									</p>
								</div>
							</Link>
						</div>
						<div className="relative transition duration-500 ease-in-out hover:scale-105">
							<div className="w-full h-full">
								<img
									src="https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/copy_of_kvpex_thumb_1920x1080__notext_-f2a1eb0c96dd-1669023034755-WPjcwavK.jpg?v=0&maxW=1400&format=webp"
									alt=""
									className="h-full w-full rounded"
								/>
							</div>
							<Link href="#">
								<span aria-hidden="true" className="absolute inset-0"></span>
								<div className="absolute bottom-0 w-full bg-black/50 px-6 py-5 rounded-b">
									<p className="text-white font-bold text-sm md:text-lg">
										Prime Gaming and Riot Games Run it Back
									</p>
								</div>
							</Link>
						</div>
						<div className="relative transition duration-500 ease-in-out hover:scale-105">
							<div className="w-full h-full">
								<img
									src="https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/copy_of_sepcho_thumb_1280x720__notext_-22886463a9cf-1663317472391-IOnOQU4X.jpeg?v=0&maxW=1400&format=webp"
									alt=""
									className="h-full w-full rounded"
								/>
							</div>
							<Link href="#">
								<span aria-hidden="true" className="absolute inset-0"></span>
								<div className="absolute bottom-0 w-full bg-black/50 px-6 py-5 rounded-b">
									<p className="text-white font-bold text-sm md:text-lg">
										Prime Gaming and Riot Games Run it Back
									</p>
								</div>
							</Link>
						</div>
						<div className="relative transition duration-500 ease-in-out hover:scale-105">
							<div className="w-full h-full">
								<img
									src="https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/1920x1080_slider-fa8d5ffe9079-1678420976314-jrZwTXtE.jpg?v=0&maxW=1400&format=webp"
									alt=""
									className="h-full w-full rounded"
								/>
							</div>
							<Link href="#">
								<span aria-hidden="true" className="absolute inset-0"></span>
								<div className="absolute bottom-0 w-full bg-black/50 px-6 py-5 rounded-b">
									<p className="text-white font-bold text-sm md:text-lg">
										Prime Gaming and Riot Games Run it Back
									</p>
								</div>
							</Link>
						</div>
						<div className="relative transition duration-500 ease-in-out hover:scale-105">
							<div className="w-full h-full">
								<img
									src="https://www.riotgames.com/darkroom/1000/3b21bc61fe30b901349787ba324e2c87:9bdbaf591220f12dc56bcc2395f3dd02/riotpr-mar2023-social-twitch-1920x1080-03-17-2023.png"
									alt=""
									className="h-full w-full rounded"
								/>
							</div>
							<Link href="#">
								<span aria-hidden="true" className="absolute inset-0"></span>
								<div className="absolute bottom-0 w-full bg-black/50 px-6 py-5 rounded-b">
									<p className="text-white font-bold text-sm md:text-lg">
										Prime Gaming and Riot Games Run it Back
									</p>
								</div>
							</Link>
						</div>
						<div className="relative transition duration-500 ease-in-out hover:scale-105">
							<div className="w-full h-full">
								<img
									src="https://popsimg.akamaized.net/api/v2/containers/file2/cms_assets/kl2023_thumb_1920x1080__notext_-d5822577b9ea-1678181211902-7CHfDw6A.jpg?v=0&maxW=1400&format=webp"
									alt=""
									className="h-full w-full rounded"
								/>
							</div>
							<Link href="#">
								<span aria-hidden="true" className="absolute inset-0"></span>
								<div className="absolute bottom-0 w-full bg-black/50 px-6 py-5 rounded-b">
									<p className="text-white font-bold text-sm md:text-lg">
										Prime Gaming and Riot Games Run it Back
									</p>
								</div>
							</Link>
						</div>
					</div>

					<div className="pt-6 flex justify-center">
						<Link href={'/comics'} className="md:hidden">
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

export default Comics
