/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { MdOutlineRateReview } from 'react-icons/md'
import {
	CiHeart,
	CiMedicalCross,
	CiMemoPad,
	CiRead,
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

type Props = {
	comic: Database['public']['Tables']['comics']['Row']
}

const DetailsComic = (props: Props) => {
	const { comic } = props

	return (
		<div>
			<div className="mx-auto mt-6 max-w-4xl px-6 grid grid-cols-1 sm:max-w-7xl sm:grid-cols-4 sm:gap-x-8 sm:px-8">
				<div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:aspect-w-3 sm:aspect-h-4 rounded">
					<img
						src={comic.thumbnails}
						alt={comic.title}
						className="h-full w-full object-cover object-center rounded"
					/>
				</div>
				<div className="col-span-3">
					<div className="mt-8 sm:mt-2">
						<h1 className="text-2xl font-semibold">{comic.title}</h1>
						<div className="flex font-light mt-4">
							<div className="mx-2 flex items-center">
								<CiTimer size={18} />
							</div>
							<div>{dayjs(comic.updated_at).fromNow()}</div>
						</div>
						<div className="flex font-light">
							<div className="mx-2 flex items-center">
								<CiSignpostR1 size={18} />
							</div>
							<div>{dayjs(comic.created_at).format('DD/MM/YYYY')}</div>
						</div>
						<div className="flex">
							<div className="flex font-light mr-4">
								<div className="mx-2 flex items-center">
									<CiRead size={18} />
								</div>
								<div>{numberFormat(comic.view, 1)}</div>
							</div>
							<div className="flex font-light mr-4">
								<div className="mx-2 flex items-center">
									<CiHeart size={18} />
								</div>
								<div>{numberFormat(comic.like.length, 1)}</div>
							</div>
							<div className="flex font-light mr-4">
								<div className="mx-2 flex items-center">
									<CiSignpostDuo1 size={18} />
								</div>
								<div>{comic.chapters.length} chapter</div>
							</div>
						</div>
						<div className="flex font-light">
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
										<p className="mx-2">{comic.rating} stars</p>
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
						<div className="flex font-light">
							<div className="mx-2 flex items-center">
								<CiUser size={18} />
							</div>
							<div className="text-red-600 font-medium">{comic.author}</div>
						</div>
						<div className="flex font-light">
							<div className="mx-2 flex items-center">
								<CiShoppingTag size={18} />
							</div>
							<div>Action - Chuyển Sinh - Comedy - Live action - Manhua - Truyện Màu</div>
						</div>
						<div className="flex font-light">
							<div className="mx-2 flex items-center">
								<CiMemoPad size={18} />
							</div>
							<div className="line-clamp-2">
								<p>{comic.description}</p>
								<p>Xem Thêm</p>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row font-normal mt-4 justify-center sm:justify-start">
							<div className="m-2">
								<Link href={'#'}>
									<div className="p-2 bg-green-500 hover:bg-green-600 hover:scale-110 duration-300 ease-in-out rounded text-white">
										Đọc Ngay
									</div>
								</Link>
							</div>
							<div className="m-2">
								<Link href={'#'}>
									<div className="p-2 bg-red-500 hover:bg-red-600 hover:scale-110 duration-300 ease-in-out rounded text-white">
										Chương Mới Nhất
									</div>
								</Link>
							</div>
							<div className="m-2">
								<Link href={'#'}>
									<div className="p-2 bg-transparent hover:scale-110 duration-300 ease-in-out rounded text-black dark:text-gray-300 flex items-center border border-red-500">
										<div className="mr-1">
											<CiMedicalCross size={18} />
										</div>
										<div>Yêu Thích</div>
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

export default DetailsComic
