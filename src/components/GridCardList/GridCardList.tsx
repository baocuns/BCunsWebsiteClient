/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { CiHeart, CiRead, CiStickyNote } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { numberFormat } from '../../lib'
import { API } from '../../redux/slices/apiSlice'
import Rate from './Rate'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const slug = require('slug')

type Props = {
	list: Array<Database['public']['Tables']['comics']['Row']> | null | undefined
}

const GridCardList: React.FC<Props> = ({ list }) => {
	return (
		<>
			<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
				<div className="mx-auto max-w-2xl py-4 sm:px-2 lg:max-w-7xl lg:px-4">
					<div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8">
						{list &&
							list.map((element) => (
								<div key={element.id} className="shadow dark:shadow-gray-700 rounded">
									<div className="group relative">
										<Rate link="/comics/ratings/truyen-tranh" rate={element.rating} />
										<div className="h-60 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-72 xl:h-64">
											<img
												src={element.thumbnails}
												alt={element.title}
												className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:scale-110 duration-500 ease-in-out"
											/>
										</div>
										<div className="mt-3 px-2 mb-2">
											<div className="flex">
												<span className="text-xs">{dayjs(element.updated_at).fromNow()}</span>
											</div>
											<div>
												<h3 className="text-sm font-medium line-clamp-1">
													<Link href={`/comics/${slug(element.title)}-${element.id}`}>
														<span aria-hidden="true" className="absolute inset-0" />
														{element.title}
													</Link>
												</h3>
											</div>
											<div className="flex justify-between mt-1">
												<div className="flex items-center">
													<CiStickyNote size={18} />
													<p className="text-sm font-light ml-1">{element.chapters.length}</p>
												</div>
												<div className="flex items-center">
													<CiHeart size={18} />
													<p className="text-sm font-light ml-1">
														{numberFormat(element.like.length, 1)}
													</p>
												</div>
												<div className="flex items-end">
													<p className="text-sm font-light">{numberFormat(element.view, 1)}</p>
													<div className="mx-1 flex items-center">
														<CiRead size={18} />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						{!list &&
							[0, 1, 2, 3, 4, 5].map((e, i) => (
								<div key={i} className="shadow dark:shadow-gray-700 rounded">
									<div className="group relative animate-pulse">
										<div className="h-60 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-72 xl:h-64"></div>
										<div className="mt-4 px-2">
											<div className="bg-gray-200 h-4 rounded"></div>
											<div className="grid grid-cols-2 gap-2 my-2">
												<div className="bg-gray-200 h-4 rounded"></div>
												<div className="bg-gray-200 h-4 rounded"></div>
											</div>
										</div>
										<div className="absolute h-5 w-12 top-[10%] right-0 bg-white"></div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	)
}

export default GridCardList
