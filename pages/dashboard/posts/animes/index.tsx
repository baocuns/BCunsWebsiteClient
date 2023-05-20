/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { SEO } from '../../../../src/components'
import Link from 'next/link'
import { CiYoutube } from 'react-icons/ci'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

type Props = {}

const AnimesDashboard = (props: Props) => {
	const supabase = useSupabaseClient<Database>()
    const router = useRouter()

	const [animes, setAnimes] = useState<Array<Database['public']['Tables']['anime']['Row']>>([])

	useEffect(() => {
		supabase
			.from('animes')
			.select(`*, episodes(*)`)
			.range(0, 19)
			.then(({ data, error }) => {
				data && setAnimes(data)
			})
	}, [supabase])

	return (
		<>
			<Head>
				<title>Animes manager | BCuns Manager</title>
				<SEO
					title="Animes manager | BCuns Manager"
					url="/dashboard/posts"
					image="/images/BC.png"
					description="Animes manager | BCuns Manager"
					keywords="Animes manager | BCuns Manager"
				/>
			</Head>
			<main>
				<div className="px-4 sm:px-8 md:px-12 lg:px-16 py-4 md:py-6">
					<div className="flex justify-between">
						{/* posts */}
						<div className="flex items-center gap-4">
							<div className="p-2 bg-gradient-to-r from-orange-400 to-rose-400 rounded shadow-md shadow-rose-300">
								<CiYoutube size={20} color="white" />
							</div>
							<h2 className="text-2xl font-bold tracking-tight text-white">Animes</h2>
						</div>

						{/* button */}
						<div className="flex">
							<Link href={'/add'}>
								<button className="p-2 bg-green-400 rounded shadow-md shadow-green-300">
									{/* <MdPostAdd size={20} color="white" /> */}
								</button>
							</Link>
						</div>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
						{animes.map((e, i) => (
							<Link
								key={i}
								href={router.asPath + '/' + e.id}
								className="relative overflow-hidden group rounded cursor-pointer"
							>
								<img
									className="h-72 w-full object-cover rounded group-hover:scale-110 transition duration-500 ease-in-out"
									src={e.thumbnails}
									alt={e.title}
								/>
								<div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent px-6 py-6 rounded-b">
									<p className="text-white">{e.title}</p>
								</div>
								<div className="absolute top-0 w-full p-2">
									<p className="text-white bg-gradient-to-t from-black to-transparent max-w-max px-2 py-1 rounded">
										Tập {e.episodes.length}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</main>
		</>
	)
}

export default AnimesDashboard
