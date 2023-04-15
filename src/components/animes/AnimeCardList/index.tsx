/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
const slug = require('slug')

type Props = {
	list: Array<Database['public']['Tables']['anime']['Row']> | null | undefined
}

const AnimeCardList = (props: Props) => {
	const { list } = props
	return (
		<>
			<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
				<div className="mx-auto max-w-2xl py-4 sm:px-2 lg:max-w-7xl lg:px-4">
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
						{list?.map((anime, i) => (
							<div key={i} className="relative group overflow-hidden rounded cursor-pointer">
								<img
									src={anime.thumbnails}
									alt={anime.title}
									className="object-cover h-60 sm:h-64 md:h-72 lg:h-80 w-full rounded transition duration-500 ease-in-out group-hover:scale-110"
								/>
								<div className="absolute top-0 p-1 rounded m-2 text-white bg-gradient-to-r from-[#fa49e7] to-[#6ef8fe] group-hover:from-[#6ef8fe] group-hover:to-[#fa49e7] transition-colors duration-500 ease-in-out">
									<p>Tập {anime.episodes.length}</p>
								</div>
								<Link href={`/anime/${slug(anime.title)}-${anime.id}`}>
									<span aria-hidden="true" className="absolute inset-0" />
									<div className="absolute px-4 bottom-0 inset-x-0 pb-2 pt-6 text-white bg-gradient-to-t from-black from-10% to-transparent">
										<p>{anime.title}</p>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default AnimeCardList
