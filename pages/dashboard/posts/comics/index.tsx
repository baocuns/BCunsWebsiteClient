/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { SEO } from '../../../../src/components'
import Link from 'next/link'
import { CiImageOn } from 'react-icons/ci'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

type Props = {}

const ComicsDashboard = (props: Props) => {
	const supabase = useSupabaseClient<Database>()
	const router = useRouter()

	const [comics, setComics] = useState<Array<Database['public']['Tables']['comics']['Row']>>([])

	useEffect(() => {
		supabase
			.from('comics')
			.select(`*, chapters(*)`)
			.range(0, 100)
			.then(({ data, error }) => {
				data && setComics(data)
			})
	}, [supabase])

	return (
		<>
			<Head>
				<title>Comics manager | BCuns Manager</title>
				<SEO
					title="Comics manager | BCuns Manager"
					url="/dashboard/posts"
					image="/images/BC.png"
					description="Animes manager | BCuns Manager"
					keywords="Comics manager | BCuns Manager"
				/>
			</Head>
			<main>
				<div className="px-4 sm:px-8 md:px-12 lg:px-16 py-4 md:py-6">
					<div className="flex justify-between">
						{/* posts */}
						<div className="flex items-center gap-4">
							<div className="p-2 bg-gradient-to-r from-cyan-400 to-sky-400 rounded shadow-md shadow-sky-300">
								<CiImageOn size={20} color="white" />
							</div>
							<h2 className="text-2xl font-bold tracking-tight text-white">Comics</h2>
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
						{comics.map((e, i) => (
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
										Chapter {e.chapters.length}
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

export default ComicsDashboard
