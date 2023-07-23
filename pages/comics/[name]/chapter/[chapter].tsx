/* eslint-disable @next/next/no-img-element */
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { VscListSelection } from 'react-icons/vsc'
import { IncreaseViewsChapters, IncreaseViewsComics } from '../../../../src/lib'
import { ChapterModalList } from '../../../../src/components'
import Link from 'next/link'
const slug = require('slug')

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

	// field
	const [comic, setComic] = useState<{ id: string; title: string }>({ id: '', title: '' })
	const [photos, setPhotos] = useState<Array<Database['public']['Tables']['photos']['Row']>>()
	const [chapters, setChapters] = useState<Array<{ id: string; title: string }> | null>([
		{ id: '0', title: '' },
	])
	const [indexChapter, setIndexChapter] = useState(0)
	const [isShowChapters, setIsShowChapter] = useState<boolean>(false)

	// version chua hoan thanh
	useEffect(() => {
		// check logged in user
		if (!session) {
			router.push(`/auth/login?redirect=${router.asPath}`)
		} else {
			// logged - view
			IncreaseViewsComics(1, chapter.comic_id, supabase)
			IncreaseViewsChapters(1, chapter.id, supabase)
		}

		return () => {}
	}, [chapter.comic_id, chapter.id, router, session, supabase])

	// comic
	useEffect(() => {
		supabase
			.from('comics')
			.select('id,title')
			.eq('id', chapter.comic_id)
			.single()
			.then(({ data, error }) => {
				if (data) {
					setComic(data)
				}
			})
	}, [chapter.comic_id, supabase])

	useEffect(() => {
		supabase
			.from('photos')
			.select()
			.eq('chapter_id', chapter.id)
			.then(({ data, error }) => {
				if (data) {
					const list = data.sort(function (a, b) {
						var numA = extractPageNumber(a.title)
						var numB = extractPageNumber(b.title)

						// Nếu cả hai title đều có số trang, sắp xếp tăng dần theo số trang
						if (numA !== null && numB !== null) {
							return numA - numB
						}

						// Nếu chỉ có a có số trang, đặt a trước b
						if (numA !== null) {
							return -1
						}

						// Nếu chỉ có b có số trang, đặt b trước a
						if (numB !== null) {
							return 1
						}

						// Nếu cả hai đều không có số trang, sắp xếp tăng dần theo title
						return a.title.localeCompare(b.title)
					})

					setPhotos(list)
				}
			})

		return () => {}
	}, [chapter.id, supabase])

	useEffect(() => {
		supabase
			.from('chapters')
			.select('id, title')
			.eq('comic_id', chapter.comic_id)
			.then(({ data, error }) => {
				if (data) {
					const list = data.sort(function (a, b) {
						var numA = extractNumber(a.title)
						var numB = extractNumber(b.title)

						// Nếu cả hai đều có số, thì sắp xếp giảm dần theo số
						if (numB !== null && numA !== null) {
							return numA - numB
						}

						// Nếu a có số và b không có số, đặt a trước b
						if (numB !== null) {
							return -1
						}

						// Nếu a không có số và b có số, đặt b trước a
						if (numA !== null) {
							return 1
						}

						// Nếu cả hai đều không có số, sắp xếp tăng dần theo title
						return b.title.localeCompare(a.title)
					})
					setChapters(list)
				}
			})
	}, [chapter.comic_id, supabase])

	useEffect(() => {
		const parts = router.asPath.split('/chapter/')
		const chapterNumber: string = parts.pop() + ''
		let foundIndex = -1
		chapters?.map((e, i) => {
			if (parseInt(e.id) === parseInt(chapterNumber)) {
				foundIndex = i
				return
			}
		})
		setIndexChapter(foundIndex)
	}, [chapters, router.asPath])

	// func
	const handleShowChapters = () => {
		setIsShowChapter(!isShowChapters)
	}

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
				{/* next, prev button */}
				<div className="flex justify-center my-2 gap-4">
					<Link
						href={`/comics/${slug(comic.title)}-${comic.id}/chapter/${
							chapters && indexChapter > 0 ? chapters[indexChapter - 1].id : chapter.id
						}`}
						className="shadow p-1 rounded"
					>
						<BsChevronLeft size={24} color="red" />
					</Link>
					<button onClick={handleShowChapters} className="shadow p-1 rounded">
						<VscListSelection size={24} color="red" />
					</button>
					<Link
						href={`/comics/${slug(comic.title)}-${comic.id}/chapter/${
							chapters && indexChapter < chapters.length - 1
								? chapters[indexChapter + 1].id
								: chapter.id
						}`}
						className="shadow p-1 rounded"
					>
						<BsChevronRight size={24} color="red" />
					</Link>
				</div>
				{/* photo list */}
				<div className="mx-auto max-w-xl py-4 sm:px-2 lg:max-w-3xl lg:px-4">
					{photos?.map((e, i) => (
						<div key={i} className="flex justify-center">
							<img src={e.url} alt={e.title} />
						</div>
					))}
				</div>

				{/* next, prev button */}
				<div className="flex justify-center my-2 gap-4">
					<Link
						href={`/comics/${slug(comic.title)}-${comic.id}/chapter/${
							chapters && indexChapter > 0 ? chapters[indexChapter - 1].id : chapter.id
						}`}
						className="shadow p-1 rounded"
					>
						<BsChevronLeft size={24} color="red" />
					</Link>
					<Link href={'/'} className="shadow p-1 rounded">
						<VscListSelection size={24} color="red" />
					</Link>
					<Link
						href={`/comics/${slug(comic.title)}-${comic.id}/chapter/${
							chapters && indexChapter < chapters.length - 1
								? chapters[indexChapter + 1].id
								: chapter.id
						}`}
						className="shadow p-1 rounded"
					>
						<BsChevronRight size={24} color="red" />
					</Link>
				</div>

				{/* modal chapters */}
				<ChapterModalList indexChapter={indexChapter} comic={comic} chapters={chapters} open={isShowChapters} handleCallback={handleShowChapters} />
			</main>
		</>
	)
}

// Hàm extractPageNumber() để trích xuất số trang từ title
function extractPageNumber(title: string) {
	var match = title.match(/Trang (\d+)/i)
	return match ? parseInt(match[1]) : null
}

// Định nghĩa hàm extractNumber() để trích xuất số từ title
function extractNumber(title: string) {
	var match = title.match(/\d+/) // Tìm các chữ số trong chuỗi
	return match ? parseInt(match[0]) : null // Trả về số hoặc null nếu không tìm thấy
}

export default Chapter
