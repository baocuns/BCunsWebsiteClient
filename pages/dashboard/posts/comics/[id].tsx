/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { AnimeDetails, SEO } from '../../../../src/components'
import {
	CiHeart,
	CiMemoPad,
	CiRead,
	CiShare1,
	CiShare2,
	CiShoppingTag,
	CiSignpostDuo1,
	CiSignpostR1,
	CiStar,
	CiTimer,
	CiUser,
	CiViewTimeline,
} from 'react-icons/ci'
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import dayjs from 'dayjs'
import { classNames, numberFormat } from '../../../../src/lib'
import { MdOutlineRateReview } from 'react-icons/md'
import axios from 'axios'
import { AiOutlineBarChart } from 'react-icons/ai'
import { TextareaAutosize } from '@mui/material'
const slug = require('slug')

type Props = {}

type Comic = {
	title: string
	chapters: string
	thumbnails: string
	link: string
	lastest_chapters: [{
		id: Number
		chapter: Number
		updated_at: string
	}]
}

const ComicId = (props: Props) => {
	const supabase = useSupabaseClient<Database>()
	const router = useRouter()

	const { id } = router.query
	const [comic, setComic] = useState<Database['public']['Tables']['comics']['Row']>({
		id: 0,
		uid: '',
		title: '',
		like: [],
		view: 0,
		rating: 0,
		author: '',
		categories: [],
		description: '',
		thumbnails: '',
		is_publish: true,
		is_nominate: false,
		created_at: '',
		updated_at: '',
		chapters: [],
	})
	const [crawlComics, setCrawlComics] = useState<Array<Comic>>([])
	const [urlParent, setUrlParent] = useState<string>('')
	const [loadings, setLoading] = useState<Array<string>>([])

	const handleChangeUrlParent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setUrlParent(event.target.value)
	}
	const handleChangeUrlParentByMovie = (url: string) => {
		setUrlParent(url)
	}

	const handleCrawls = () => {
		// 1. crawl details episode data
		setLoading((prev) => [...prev, 'wait - compiling...'])
		setLoading((prev) => [...prev, 'event - crawl details episode data...'])

		axios
			.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/crawls/hhkungfu/episodes`,
				{
					linkMovie: urlParent,
				},
				{
					timeout: 20000,
				}
			)
			.then(async (res) => {
				setLoading((prev) => [...prev, 'event - crawl details episode data successfully!'])
				setLoading((prev) => [...prev, 'wait - check valid data...'])

				if (res.data.data) {
					setLoading((prev) => [...prev, 'event - valid data successfully!'])
					setLoading((prev) => [...prev, 'wait - create array episodes...'])

					let episodes: Array<{
						anime_id: string
						title: string
						episode: string
						videos: Array<string>
					}> = []
					setLoading((prev) => [...prev, 'event - create array episodes successfully!'])
					setLoading((prev) => [...prev, 'wait - run a loop browsing the list of episodes...'])

					for (let i = 0; i < res.data.data.length; i++) {
						const element = res.data.data[i]

						// api get videos
						// if (!anime.episodes.some((ani) => ani.episode === element?.episode)) {
						// 	const { data } = await axios.post(
						// 		`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/crawls/hhkungfu/episodes/videos`,
						// 		{
						// 			linkEpisode: element?.linkEpisode,
						// 		},
						// 		{
						// 			timeout: 20000,
						// 		}
						// 	)
						// 	if (data.data) {
						// 		episodes.push({
						// 			anime_id: anime.id,
						// 			title: anime.title,
						// 			episode: element?.episode,
						// 			videos: data.data,
						// 		})
						// 	}
						// 	setLoading((prev) => [
						// 		...prev,
						// 		`event - load episodes: ${element?.episode} successfully!`,
						// 	])
						// } else {
						// 	setLoading((prev) => [...prev, `event - load episodes: ${element?.episode} exist!`])
						// }
					}

					setLoading((prev) => [...prev, 'wait - check valid episode list...'])

					if (episodes.length === res.data.data.length || episodes.length > 0) {
						setLoading((prev) => [...prev, 'event - valid episode list successfully!'])
						setLoading((prev) => [...prev, 'wait - supabase insert episodes to movie...'])

						supabase
							.from('episodes')
							.insert(episodes)
							.then((res) => {
								!res.error &&
									setLoading((prev) => [
										...prev,
										'event - supabase insert episodes to movie successfully!',
									])
								res.error &&
									setLoading((prev) => [
										...prev,
										'event - supabase insert episodes to movie failed!',
									])
							})
					} else {
						setLoading((prev) => [...prev, 'event - valid episode list failed!'])
						setLoading((prev) => [
							...prev,
							'event - conditions do not match: episodes.length === res.data.data.length || episodes.length > 0',
						])
					}
				}
			})
	}

	useEffect(() => {
		id &&
			supabase
				.from('comics')
				.select(`*, chapters(*)`)
				.eq('id', id)
				.single()
				.then(({ data, error }) => {
					data && setComic(data)
				})
	}, [id, supabase])

	useEffect(() => {
		// crawl
		comic.title &&
			axios
				.post(
					`http://localhost/api/v1/nettruyen/search`,
					{
						keyword: comic.title,
					},
					{
						timeout: 20000,
					}
				)
				.then((res) => {
					setCrawlComics(res.data.data?.comics)
					// console.log(res.data.data);
					
				})
	}, [comic.title])

	return (
		<>
			<Head>
				<title>Animes Details | BCuns Manager</title>
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
					<div className="flex items-center gap-4">
						<div className="p-2 bg-gradient-to-r from-cyan-400 to-sky-400 rounded shadow-md shadow-sky-300">
							<CiViewTimeline size={20} color="white" />
						</div>
						<h2 className="text-2xl font-bold tracking-tight text-white">Comics Details</h2>
					</div>
					{/* details */}
					<div className="mt-10 text-white bg-black/20 backdrop-blur-sm p-4 shadow shadow-sky-500 rounded">
						<div className="mx-auto mt-6 max-w-4xl px-6 grid grid-cols-1 sm:max-w-7xl sm:grid-cols-4 sm:gap-x-8 sm:px-8">
							<div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:aspect-w-3 sm:aspect-h-4 rounded">
								<img
									src={comic.thumbnails}
									alt={'comic.title'}
									className="h-full w-full object-cover object-center rounded"
								/>
							</div>
							<div className="col-span-3">
								<div className="mt-8 sm:mt-2">
									<div className="text-2xl font-semibold">{comic.title}</div>
									<div className="flex mb-1 font-light mt-4">
										<div className="mx-2 flex items-center">
											<CiTimer size={18} />
										</div>
										<div>{dayjs(comic.updated_at).fromNow()}</div>
									</div>
									<div className="flex mb-1 font-light">
										<div className="mx-2 flex items-center">
											<CiSignpostR1 size={18} />
										</div>
										<div>{dayjs(comic.created_at).format('DD/MM/YYYY')}</div>
									</div>
									<div className="flex mb-1">
										<div className="flex font-light mr-4">
											<div className="mx-2 flex items-center">
												<CiRead size={18} />
											</div>
											<div>{numberFormat(comic.view, 1)}</div>
										</div>
										<div className="flex font-light mr-4">
											<div className="mx-2 flex items-center">
												<CiHeart size={18} />
											</div>
											<div>{numberFormat(comic.like?.length, 1)}</div>
										</div>
										<div className="flex font-light mr-4">
											<div className="mx-2 flex items-center">
												<CiSignpostDuo1 size={18} />
											</div>
											<div>{comic.chapters.length} chapter</div>
										</div>
									</div>
									<div className="flex mb-1 font-light">
										<div className="mx-2 flex items-center">
											<MdOutlineRateReview size={18} />
										</div>
										<div>
											{/* Reviews */}
											<div className="">
												<h3 className="sr-only">Reviews</h3>
												<div className="flex items-center">
													<div className="flex items-center">
														{[0, 1, 2, 3, 4].map((rating) => (
															<div key={rating} className={4 > rating ? 'text-yellow-500' : ''}>
																<CiStar aria-hidden="true" />
															</div>
														))}
													</div>
													<p className="mx-2">{5} stars</p>
													<a
														href={'reviews.href'}
														className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
													>
														{234} reviews
													</a>
												</div>
											</div>
										</div>
									</div>
									<div className="flex mb-1 font-light">
										<div className="mx-2 flex items-center">
											<CiUser size={18} />
										</div>
										<div className="text-red-600 font-medium">{comic.author}</div>
									</div>
									<div className="flex mb-1 font-light">
										<div className="mx-2 flex items-center">
											<CiShoppingTag size={18} />
										</div>
										<div>Action - Chuyển Sinh - Comedy - Live action - Manhua - Truyện Màu</div>
									</div>
									<div className="flex mb-1 font-light">
										<div className="mx-2 flex items-center">
											<CiMemoPad size={18} />
										</div>
										<div className="line-clamp-2 lg:line-clamp-4">
											<p>{comic.description}</p>
										</div>
									</div>
									<div className="flex mb-1 font-light">
										<div className="mx-2 flex items-center">
											<CiShare2 size={18} />
										</div>
										<div className="line-clamp-2 lg:line-clamp-4">
											<a
												href={`/comics/${slug(comic.title)}-${comic.id}`}
												target="_blank"
												rel="noopener noreferrer"
												className="flex gap-2 text-rose-500 font-medium border-b border-transparent hover:border-white"
											>
												<p>Link Comic: {comic.title}</p>
												<CiShare1 size={18} />
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* update */}
					<div className="flex items-center gap-4 mt-10">
						<div className="p-2 bg-gradient-to-r from-cyan-400 to-sky-400 rounded shadow-md shadow-sky-300">
							<CiTimer size={20} color="white" />
						</div>
						<div>
							<h2 className="text-2xl font-bold tracking-tight text-white">Update data</h2>
						</div>
					</div>
					<div className="mt-10 text-white bg-black/20 backdrop-blur-sm p-4 shadow shadow-sky-500 rounded">
						<div>
							<label htmlFor="link-parent">
								<p className="font-bold">Bộ truyện may mắn được thu thập dữ liệu</p>
							</label>
							<TextareaAutosize
								name="name"
								id="link-parent"
								defaultValue={urlParent}
								value={urlParent}
								onChange={(e) => handleChangeUrlParent(e)}
								className="my-2 py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-rose-500"
								placeholder="Link bộ truyện may man . . . !"
							/>
							<div className="flex justify-end">
								<button
									onClick={handleCrawls}
									className="py-1 px-2 font-bold bg-gradient-to-r from-cyan-400 to-sky-400 rounded shadow-md shadow-sky-300 transition duration-500 ease-in-out hover:scale-110"
								>
									Xác nhận thu Thập !
								</button>
							</div>

							{/* screen loading */}
							<div
								className={classNames(
									'mt-5 shadow shadow-rose-500 rounded overflow-y-auto',
									loadings.length > 0 ? 'h-48 p-4' : 'h-0'
								)}
							>
								{loadings.map((e, i) => {
									if (i === loadings.length - 1) {
										return (
											<p key={i} ref={(rel) => rel?.scrollIntoView({ behavior: 'smooth' })}>
												{e}
											</p>
										)
									} else {
										return <p key={i}>{e}</p>
									}
								})}
							</div>
						</div>
					</div>

					{/* crawl */}
					<div className="flex items-center gap-4 mt-10">
						<div className="p-2 bg-gradient-to-r from-cyan-400 to-sky-400 rounded shadow-md shadow-sky-300">
							<AiOutlineBarChart size={20} color="white" />
						</div>
						<div>
							<h2 className="text-2xl font-bold tracking-tight text-white">Comics crawl</h2>
							<p className="text-white">
								Hãy chọn bộ truyện giống như truyện của bạn để thu thập dữ liệu và cập nhật !
							</p>
						</div>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
						{crawlComics.map((e, i) => (
							<button
								key={i}
								onClick={() => handleChangeUrlParentByMovie(e.link)}
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
										{e.lastest_chapters.length > 0 && e.lastest_chapters[0].chapter + ''}
									</p>
								</div>
							</button>
						))}
					</div>
				</div>
			</main>
		</>
	)
}

export default ComicId
