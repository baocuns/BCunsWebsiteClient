/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import {
	AnimeDetails,
	AnimeEpisodes,
	Breadcrumbs,
	IframeVideoPlayer,
	SEO,
	VideoPlayer,
} from '../../../src/components'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { BiHomeSmile } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { IncreaseViewsAnimes, IncreaseViewsEpisodes } from '../../../src/lib'
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
	const session = useSession()
	const router = useRouter()

	const [episodesList, setEpisodesList] =
		useState<Array<Database['public']['Tables']['episodes']['Row']>>()
	const [anime, setAnime] = useState<Database['public']['Tables']['anime']['Row']>()

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

	useEffect(() => {
		// check logged in user
		if (!session) {
			router.push(`/auth/login?redirect=${router.asPath}`)
		} else {
			// logged - view
			IncreaseViewsAnimes(1, episodes.anime_id, supabase)
			IncreaseViewsEpisodes(1, episodes.id, supabase)
		}

		return () => {}
	}, [episodes.anime_id, episodes.id, router, session, supabase])

	return (
		<>
			<Head>
				<title>{`${episodes.title} - Tập ${episodes.episode} | BCuns`}</title>
				<SEO
					title={`${episodes.title} | BCuns`}
					url={'/'}
					image={'/'}
					description={episodes.title + '-' + episodes.episode}
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
							name: `${episodes.title} - Tập ${episodes.episode}`,
							href: `/anime/${slug(episodes.title)}-${episodes.anime_id}/episodes-${episodes.id}`,
						},
					]}
				/>
				{/* video player */}
				{/* <VideoPlayer thumbnails={anime?.poster} video={episodes?.video} /> */}
				<IframeVideoPlayer
					sources={episodes.videos}
				/>
				{/* Episodes */}
				<AnimeEpisodes episodes={episodesList} />
				{/* details */}
				<div>{anime && <AnimeDetails anime={anime} />}</div>
			</main>
		</>
	)
}

export default Episodes
