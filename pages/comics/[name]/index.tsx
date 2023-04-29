/* eslint-disable @next/next/no-img-element */
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ChapterList, DetailsComic, SEO } from '../../../src/components'
import { IncreaseViewsComics } from '../../../src/lib'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

type Props = {
	data: Database['public']['Tables']['comics']['Row']
	url: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// Create authenticated Supabase Client
	const url = context.req.url
	const supabase = createServerSupabaseClient(context)
	const name: any = context.params?.name || ''
	const split = name.split('-')

	const { data, error, status } = await supabase
		.from('comics')
		.select('*, chapters(*)')
		.eq('id', split[split.length - 1])
		.single()

	return { props: { data, url } }
}

const Comic = (props: Props) => {
	const { data, url } = props
	const router = useRouter()
	const supabase = useSupabaseClient<Database>()

	useEffect(() => {
		IncreaseViewsComics(1, 12, supabase)
	} ,[supabase])

	return (
		<>
			<Head>
				<title>{`${data.title} | BCuns - Truyện Tranh Online`}</title>
				<SEO
					title={`${data.title} | BCuns - Truyện Tranh Online`}
					url={url}
					image="/images/BC.png"
					description={data.description}
					keywords="đọc truyện tranh, truyện tranh online, trang web truyện tranh, tác phẩm truyện tranh, đọc truyện miễn phí, cộng đồng truyện tranh, manga, manhua, manhwa"
				/>
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
