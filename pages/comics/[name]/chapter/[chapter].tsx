/* eslint-disable @next/next/no-img-element */
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { VscListSelection } from 'react-icons/vsc'

type Props = {
	data: Database['public']['Tables']['chapters']['Row']
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(context)

	const chapter = context.params?.chapter

	const { data, error, status } = await supabase
		.from('chapters')
		.select()
		.eq('id', chapter)
		.single()

	return { props: { data } }
}

//**chapter id ??? */

const Chapter = (props: Props) => {
	const { data: chapter } = props
	const router = useRouter()
	const session = useSession()
	const supabase = useSupabaseClient<Database>()

	//
	const [photos, setPhotos] = useState<Array<Database['public']['Tables']['photos']['Row']>>()

	// version chua hoan thanh
	useEffect(() => {
		// check logged in user
		if (!session) {
			router.push(`/auth/login?redirect=${router.asPath}`)
		} else {
			// logged - view
			if (chapter.view && !chapter.view.some((id) => id === session.user.id)) {
				chapter.view.push(session.user.id)
				// check version
				supabase
					.from('chapters')
					.update({ view: chapter.view })
					.eq('id', chapter.id)
					.then((res) => {
						console.log('res: ', res)
					})
			}
			if (!chapter.view) {
				supabase
					.from('chapters')
					.update({ view: [session.user.id] })
					.eq('id', chapter.id)
					.then((res) => {
						console.log('res: ', res)
					})
			}
		}

		return () => {}
	}, [chapter.id, chapter.view, router, session, supabase])

	useEffect(() => {
		supabase
			.from('photos')
			.select()
			.eq('chapter_id', chapter.id)
			.then(({ data, error }) => {
				if (data) {
					setPhotos(data)
				}
			})

		return () => {}
	}, [chapter.id, supabase])

	return (
		<>
			<Head>
				<title>{chapter.title} | BCuns - Truyện Tranh</title>
				<meta name="description" content={chapter.description} />
				<meta property="og:title" content={chapter.title} />
				<meta property="og:site_name" content="BCuns" />
				<meta property="og:url" content={`${router.asPath}`} />
				<meta property="og:type" content="article" />
				{/* <meta property="og:image" content={photos && photos[0].url} /> */}
				<meta property="og:description" content={chapter.description} />
				<meta itemProp="name" content={chapter.title} />
				<meta itemProp="description" content={chapter.description} />
				{/* <meta itemProp="image" content={photos && photos[0].url} /> */}
				<meta name="copyright" content="Copyright © 2023 Truyện tranh BCuns" />
				<meta name="Author" content="Truyện tranh BCuns" />
				{/* <meta name="thumbnail" content={photos && photos[0].url} /> */}
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main className="py-4 sm:px-8">
				<div className="flex justify-center my-2">
					<div className="flex justify-between">
						<div>
							<button className="p-1 mx-2 rounded shadow">
								<BsChevronLeft size={24} color="red" />
							</button>
						</div>
						<div>
							<button className="p-1 mx-2 rounded shadow">
								<VscListSelection size={24} color="red" />
							</button>
						</div>
						<div>
							<button className="p-1 mx-2 rounded shadow">
								<BsChevronRight size={24} color="red" />
							</button>
						</div>
					</div>
				</div>
				<div className="mx-auto max-w-xl py-4 sm:px-2 lg:max-w-3xl lg:px-4">
					{photos?.map((e, i) => (
						<div key={i} className="flex justify-center">
							<img src={e.url} alt={e.title} />
						</div>
					))}
				</div>
			</main>
		</>
	)
}

export default Chapter
