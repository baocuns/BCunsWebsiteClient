import Link from 'next/link'
import React from 'react'
import { VscListSelection } from 'react-icons/vsc'
import { classNames } from '../../../lib'
const slug = require('slug')

type Props = {
	episodes: Array<Database['public']['Tables']['episodes']['Row']> | undefined
}

const AnimeEpisodes = (props: Props) => {
	const { episodes } = props

	return (
		<>
			<div className="mx-auto mt-6 md:max-w-7xl md:px-8">
				<div className="flex font-medium items-center border-b py-1">
					<div className="mr-2">
						<VscListSelection size={24} color="red" />
					</div>
					<p className="text-xl">Episodes</p>
				</div> 
				{/* lg:h-48 md:h-56 sm:h-72 h-96 */}
				<div className={classNames(
					'overflow-y-auto p-2 mt-2',
					episodes?.length && episodes?.length >= 36 ? 'h-96': 'h-auto',
					`sm:${episodes?.length && episodes?.length >= 48 ? 'h-96': 'h-auto'}`,
					`md:${episodes?.length && episodes?.length >= 60 ? 'h-96': 'h-auto'}`,
					`lg:${episodes?.length && episodes?.length >= 72 ? 'h-96': 'h-auto'}`,
				)}>
					<div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4 bg-gray-100 p-2 rounded dark:bg-gray-700">
						{episodes
							?.sort((a, b) =>
								a.description > b.description ? 1 : b.description > a.description ? -1 : 0
							)
							?.map((e, i) => (
								<Link key={i} href={`/anime/${slug(e.title)}-${e.anime_id}/episodes-${e.id}`}>
									<button className="transition duration-500 ease-in-out hover:scale-125 hover:bg-red-400 bg-gray-200 text-black font-bold shadow rounded w-full py-2 dark:bg-gray-600 dark:hover:bg-green-400 dark:text-white">
										{e.description}
									</button>
								</Link>
							))}
					</div>
				</div>
			</div>
		</>
	)
}

export default AnimeEpisodes
