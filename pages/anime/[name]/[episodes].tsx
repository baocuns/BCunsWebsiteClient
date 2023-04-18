/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { AnimeDetails, AnimeEpisodes, Breadcrumbs, SEO } from '../../../src/components'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { BiHomeSmile } from 'react-icons/bi'
const slug = require('slug')

type Props = {
	episodes: Database['public']['Tables']['episodes']['Row']
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(context)
	const name: any = context.params?.episodes || ''
	const split = name.split('-')

	const {
		data: episodes,
		error,
		status,
	} = await supabase
		.from('episodes')
		.select('*')
		.eq('id', split[split.length - 1])
		.single()

	return { props: { episodes } }
}

const Episodes = (props: Props) => {
	const { episodes } = props
	const supabase = useSupabaseClient<Database>()

	const [episodesList, setEpisodesList] =
		useState<Array<Database['public']['Tables']['episodes']['Row']>>()
	const [anime, setAnime] = useState<Database['public']['Tables']['anime']['Row'] | any>()

	useEffect(() => {
		supabase
			.from('episodes')
			.select('*')
			.eq('anime_id', episodes.anime_id)
			.then(({ data, error }) => {
				if (data) {
					setEpisodesList(data)
				}
			})
		// anime
		supabase
			.from('animes')
			.select('*, episodes(*)')
			.eq('id', episodes.anime_id)
			.single()
			.then(({ data, error }) => {
				if (data) {
					setAnime(data)
				}
			})
	}, [episodes.anime_id, supabase])

	return (
		<>
			<Head>
				<title>{`${episodes.title} - Tập ${episodes.description} | BCuns`}</title>
				<SEO
					title={`${episodes.title} | BCuns`}
					url={'/'}
					image={'/'}
					description={episodes.title + '-' + episodes.description}
					keywords="#"
				/>
			</Head>
			<main className="px-4 py-4 sm:px-8">
				<Breadcrumbs
					breadcrumbs={[
						{
							name: <BiHomeSmile size={25} />,
							href: '/',
						},
						{
							name: 'Anime',
							href: '/anime',
						},
						{
							name: episodes.title,
							href: `/anime/${slug(episodes.title)}-${episodes.anime_id}`,
						},
						{
							name: `${episodes.title} - Tập ${episodes.description}`,
							href: `/anime/${slug(episodes.title)}-${episodes.anime_id}/episodes-${episodes.id}`,
						},
					]}
				/>
				<div className="flex justify-center md:px-36 lg:px-52">
					<video className="h-auto object-cover rounded" controls src={episodes?.video} />
				</div>
				{/* Episodes */}
				<AnimeEpisodes episodes={episodesList} />
				{/* details */}
				<div>{anime && <AnimeDetails anime={anime} />}</div>
			</main>
		</>
	)
}

export default Episodes
