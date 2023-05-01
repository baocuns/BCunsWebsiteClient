import Head from 'next/head'
import React, { useEffect } from 'react'
import { AnimeDetails, AnimeEpisodes, Breadcrumbs, SEO } from '../../../src/components'
import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { BiHomeSmile } from 'react-icons/bi'
import { IncreaseViewsAnimes } from '../../../src/lib'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
const slug = require('slug')

type Props = {
	anime: Database['public']['Tables']['anime']['Row']
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(context)
	const name: any = context.params?.name || ''
	const split = name.split('-')

	const {
		data: anime,
		error,
		status,
	} = await supabase
		.from('animes')
		.select('*, episodes(*)')
		.eq('id', split[split.length - 1])
		.single()

	return { props: { anime } }
}

const Anime = (props: Props) => {
	const { anime } = props
	const supabase = useSupabaseClient<Database>()

	//fix config
	useEffect(() => {
		IncreaseViewsAnimes(1, anime.id, supabase)
	}, [anime.id, supabase])

	return (
		<>
			<Head>
				<title>{`${anime.title} | BCuns`}</title>
				<SEO
					title={`${anime.title} | BCuns`}
					url={'/'}
					image={anime.thumbnails}
					description={anime.description}
					keywords={`${anime.title} - BCuns`}
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
							name: anime.title,
							href: `/anime/${slug(anime.title)}-${anime.id}`,
						},
					]}
				/>
				<AnimeDetails anime={anime} />
				<AnimeEpisodes episodes={anime.episodes} />
			</main>
		</>
	)
}

export default Anime
