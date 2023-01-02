/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { CiRead } from 'react-icons/ci'
import { Comic } from '../../types/comic'

type Props = {
	list: Array<Comic>
}

const GridCardList:React.FC<Props> = ({list}) => {
	return (
		<div>
			<div className="bg-white dark:bg-gray-900">
				<div className="mx-auto max-w-2xl py-4 sm:py-8 sm:px-2 lg:max-w-7xl lg:px-4">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						Danh sách truyện tranh mới nhất
					</h2>

					<div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
						{list.map((element) => (
							<div key={element.id} className='p-1 shadow dark:shadow-gray-700 rounded'>
								<div className="group relative">
									<div className="h-60 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
										<img
											src={element.imageSrc}
											alt={element.imageAlt}
											className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:scale-110 duration-500 ease-in-out"
										/>
									</div>
									<div className="mt-4">
										<div>
											<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-1">
												<Link href={element.href}>
													<span aria-hidden="true" className="absolute inset-0" />
													{element.name}
												</Link>
											</h3>
										</div>
										<div className="flex justify-between">
											<div>
												<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
													{element.chapter}
												</p>
											</div>
											<div className="flex items-end">
												<p className="text-sm text-gray-900 dark:text-gray-400">{element.view}</p>
												<div className="mx-1 flex items-center">
													<CiRead size={18} />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default GridCardList