/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { MdOutlineRateReview } from 'react-icons/md'
import {
	CiHeart,
	CiMedicalCross,
	CiMemoPad,
	CiPlay1,
	CiRead,
	CiRepeat,
	CiSaveUp2,
	CiShoppingTag,
	CiSignpostDuo1,
	CiSignpostR1,
	CiStar,
	CiTimer,
	CiUser,
} from 'react-icons/ci'
import Link from 'next/link'
import dayjs from 'dayjs'
import { numberFormat } from '../../../lib'
const slug = require('slug')

type Props = {
	anime: Database['public']['Tables']['anime']['Row']
}

const AnimeDetails = (props: Props) => {
	const { anime } = props
	anime.episodes?.sort((a, b) => (a.episode > b.episode ? 1 : b.episode > a.episode ? -1 : 0))

	return (
		<div>
			<div className="mx-auto mt-6 max-w-4xl px-6 grid grid-cols-1 sm:max-w-7xl sm:grid-cols-4 sm:gap-x-8 sm:px-8">
				<div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:aspect-w-3 sm:aspect-h-4 rounded">
					<img
						src={anime.thumbnails}
						alt={'comic.title'}
						className="h-full w-full object-cover object-center rounded"
					/>
				</div>
				<div className="col-span-3">
					<div className="mt-8 sm:mt-2">
						<div className="text-2xl font-semibold">{anime.title}</div>
						<div className="flex mb-1 font-light mt-4">
							<div className="mx-2 flex items-center">
								<CiTimer size={18} />
							</div>
							<div>{dayjs(anime.updated_at).fromNow()}</div>
						</div>
						<div className="flex mb-1 font-light">
							<div className="mx-2 flex items-center">
								<CiSignpostR1 size={18} />
							</div>
							<div>{dayjs(anime.created_at).format('DD/MM/YYYY')}</div>
						</div>
						<div className="flex mb-1">
							<div className="flex font-light mr-4">
								<div className="mx-2 flex items-center">
									<CiRead size={18} />
								</div>
								<div>{numberFormat(anime.view, 1)}</div>
							</div>
							<div className="flex font-light mr-4">
								<div className="mx-2 flex items-center">
									<CiHeart size={18} />
								</div>
								<div>{numberFormat(anime.like?.length, 1)}</div>
							</div>
							<div className="flex font-light mr-4">
								<div className="mx-2 flex items-center">
									<CiSignpostDuo1 size={18} />
								</div>
								<div>{anime.episodes.length} episodes</div>
							</div>
						</div>
						<div className="flex mb-1 font-light">
							<div className="mx-2 flex items-center">
								<MdOutlineRateReview size={18} />
							</div>
							<div>
								{/* Reviews */}
								<div className="">
									<h3 className="sr-only">Reviews</h3>
									<div className="flex items-center">
										<div className="flex items-center">
											{[0, 1, 2, 3, 4].map((rating) => (
												<div key={rating} className={4 > rating ? 'text-yellow-500' : ''}>
													<CiStar aria-hidden="true" />
												</div>
											))}
										</div>
										<p className="mx-2">{5} stars</p>
										<a
											href={'reviews.href'}
											className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
										>
											{234} reviews
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="flex mb-1 font-light">
							<div className="mx-2 flex items-center">
								<CiUser size={18} />
							</div>
							<div className="text-red-600 font-medium">{anime.author}</div>
						</div>
						<div className="flex mb-1 font-light">
							<div className="mx-2 flex items-center">
								<CiShoppingTag size={18} />
							</div>
							<div>Action - Chuyển Sinh - Comedy - Live action - Manhua - Truyện Màu</div>
						</div>
						<div className="flex mb-1 font-light">
							<div className="mx-2 flex items-center">
								<CiMemoPad size={18} />
							</div>
							<div className="line-clamp-2 lg:line-clamp-4">
								<p>{anime.description}</p>
								{/* <p>Xem Thêm</p> */}
							</div>
						</div>
						<div className="flex flex-col sm:flex-row font-normal mt-4 justify-center sm:justify-start">
							<div className="m-2">
								<Link
									href={
										anime.episodes.length > 0
											? `/anime/${slug(anime.episodes[0].title)}-${anime.id}/episodes-${
													anime.episodes[0].id
											  }`
											: `/anime/${slug(anime.title)}-${anime.id}`
									}
								>
									<div className="flex items-center gap-2 py-2 px-8 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-l hover:scale-110 transition duration-500 ease-in-out rounded text-white hover:shadow-lg hover:shadow-red-500">
										<CiPlay1 />
										Watch now
									</div>
								</Link>
							</div>
							<div className="m-2">
								<Link
									href={
										anime.episodes.length > 0
											? `/anime/${slug(anime.episodes[0].title)}-${anime.id}/episodes-${
													anime.episodes[anime.episodes.length - 1].id
											  }`
											: `/anime/${slug(anime.title)}-${anime.id}`
									}
								>
									<div className="flex items-center gap-2 py-2 px-8 font-bold bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 hover:bg-gradient-to-l hover:scale-110 transition duration-500 ease-in-out rounded text-white hover:shadow-lg hover:shadow-red-500">
										<CiSaveUp2 />
										Latest episode
									</div>
								</Link>
							</div>
							<div className="m-2">
								<Link href={'#'}>
									<div className="py-2 px-8 font-bold bg-transparent hover:scale-110  transition duration-500 ease-in-out rounded text-black dark:text-gray-300 flex items-center border border-red-500">
										<div className="mr-1">
											<CiMedicalCross size={18} />
										</div>
										<div>Favourite</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AnimeDetails
