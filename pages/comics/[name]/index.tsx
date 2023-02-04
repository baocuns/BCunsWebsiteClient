/* eslint-disable @next/next/no-img-element */
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { ChapterList, DetailsComic } from '../../../src/components'

type Props = {
	data: Database['public']['Tables']['comics']['Row']
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(context)
	const name: any = context.params?.name || ''
	const split = name.split('-')

	const { data, error, status } = await supabase
		.from('comics')
		.select('*, chapters(*)')
		.eq('id', split[split.length - 1])
		.single()

	return { props: { data } }
}

const Comic = (props: Props) => {
	const { data } = props
	const router = useRouter()

	return (
		<>
			<Head>
				<title>{data.title} | BCuns - Truyện Tranh</title>
				<meta name="description" content={data.description} />
				<meta property="og:title" content={data.title} />
				<meta property="og:site_name" content="BCuns" />
				<meta property="og:url" content={router.asPath} />
				<meta property="og:type" content="article" />
				<meta property="og:image" content={data.thumbnails} />
				<meta property="og:description" content={data.description} />
				<meta itemProp="name" content={data.title} />
				<meta itemProp="description" content={data.description} />
				<meta itemProp="image" content={data.thumbnails} />
				<meta name="copyright" content="Copyright © 2023 Truyện tranh BCuns" />
				<meta name="Author" content="Truyện tranh BCuns" />
				<meta name="thumbnail" content={data.thumbnails} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main className="px-4 py-4 sm:px-8">
				<div>
					<DetailsComic comic={data} />
				</div>
				<div>
					<ChapterList chapters={data.chapters} />
				</div>
			</main>
		</>
	)
}

export default Comic
