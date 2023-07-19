/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { ControlledAccordions, Loading, OpstionAddMovie, SEO } from '../../../../src/components'
import { AiOutlineBarChart } from 'react-icons/ai'
import { TextareaAutosize } from '@mui/material'
import axios from 'axios'
import { MdPostAdd } from 'react-icons/md'
import { CiBarcode, CiGrid2H, CiGrid41 } from 'react-icons/ci'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'

type Props = {}

type Movie = {
	title: string
	episode: string
	thumbnails: string
	link: string
}
type MovieServer = {
	id: string
	title: string
	episodes: Array<{
		episode: string
	}>
}

const AnimesCrawls = (props: Props) => {
	const supabase = useSupabaseClient()

	const [urlParent, setUrlParent] = useState<string>('')
	const [dataCrawls, setDataCrawls] = useState<Array<Movie>>([])
	const [nextPage, setNextPage] = useState<string>('')
	const [dataServer, setDataServer] = useState<Array<MovieServer> | any>([])
	const [isModalAddMovie, setIsModalAddMovie] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errorAfter, setErrorAfter] = useState<string>('')

	const handleChangeUrlParent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setUrlParent(event.target.value)
	}
	const handleChangeUrlParentByOpstion = (url: string) => {
		setUrlParent(url)
		!url && setErrorAfter('Không có next page bạn ơi !!')
	}

	const handleCrawls = () => {
		if (urlParent) {
			setIsLoading(true)
			axios
				.post(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/crawls/hhkungfu`, {
					linkPage: urlParent,
				}, {
					timeout: 20000
				})
				.then((res) => {
					setIsLoading(false)
					setDataCrawls(res.data.data.listLinkMovie)
					setNextPage(res.data.data.nextPage)
				})

			// load data server
			supabase
				.from('animes')
				.select('id,title, episodes(episode)')
				.then(({ data, error }) => {
					if (data) {
						setDataServer(data)
					}
				})
		} else {
			setErrorAfter('URL Lỗi rồi bạn ơi, bảo không nghe ???')
		}
	}

	const handleOpenModalAddMovie = () => {
		setIsModalAddMovie(!isModalAddMovie)
	}

	useEffect(() => {
		urlParent && setErrorAfter('')
	}, [urlParent])
	// console.log('Taap'.replace(/^\D+/g, ""));

	return (
		<>
			<Head>
				<title>Thu Thập Dữ Liệu animes | BCuns</title>
				<SEO
					title="Thu Thập Dữ Liệu | BCuns"
					url="/dashboard/crawls"
					image="/images/BC.png"
					description="Thu Thập Dữ Liệu | BCuns"
					keywords="Thu Thập Dữ Liệu | BCuns"
				/>
			</Head>
			<main>
				<div className="px-4 sm:px-8 md:px-12 lg:px-16 py-4 md:py-6">
					<div className="flex items-center gap-4 mb-4">
						<div className="p-2 bg-teal-400 rounded shadow-md shadow-teal-300">
							<AiOutlineBarChart size={20} color="white" />
						</div>
						<h2 className="text-2xl font-bold tracking-tight text-white">Crawls Data animes</h2>
					</div>
					{/* crawls */}
					<div className="text-white mt-10 bg-black/10 p-4 shadow shadow-teal-400 rounded">
						<div>
							<label htmlFor="link-parent">
								<p className="font-bold">Website may mắn được thu thập dữ liệu</p>
							</label>
							<TextareaAutosize
								name="name"
								id="link-parent"
								defaultValue={urlParent}
								value={urlParent}
								onChange={(e) => handleChangeUrlParent(e)}
								className="my-2 py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-teal-500"
								placeholder="Link website may man . . . !"
							/>

							{/* error */}
							{errorAfter && (
								<div className="flex gap-2 items-center mb-5 border-b pb-1">
									<CiBarcode size={20} color='red' />
									<p className="">{errorAfter}</p>
								</div>
							)}
						</div>

						{/* list server */}
						<div className="mb-10">
							<ControlledAccordions
								icon={'https://hhhkungfu.tv/wp-content/uploads/2021/12/1-copy.png'}
								title="Hhkungfu"
								handleCallback={handleChangeUrlParentByOpstion}
								childs={[
									{
										title: 'Last Movie',
										url: 'https://hhhkungfu.tv/latest-movie',
									},
									{
										title: 'Next Page',
										url: nextPage,
									},
								]}
							/>
						</div>

						{/* submit */}
						<div>
							<button
								onClick={handleCrawls}
								className="py-1 px-2 font-bold bg-teal-400 rounded shadow-md shadow-teal-300 transition duration-500 ease-in-out hover:scale-110"
							>
								Thu Thập !
							</button>
						</div>
					</div>
					{/* data */}
					<div className="flex justify-between mt-10">
						{/* posts */}
						<div className="flex items-center gap-4">
							<div className="p-2 bg-red-400 rounded shadow-md shadow-red-300">
								<AiOutlineBarChart size={20} color="white" />
							</div>
							<h2 className="text-2xl font-bold tracking-tight text-white">Data</h2>
						</div>

						{/* button */}
						<div className="flex">
							<button className="p-2 bg-green-400 rounded-l">
								<CiGrid41 size={20} color="white" />
							</button>
							<button className="p-2 bg-gray-300 rounded-r">
								<CiGrid2H size={20} color="white" />
							</button>

							{/* add movie */}
							<button
								onClick={handleOpenModalAddMovie}
								className="p-2 ml-4 bg-green-400 rounded shadow-md shadow-green-300"
							>
								<MdPostAdd size={20} color="white" />
							</button>
						</div>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
						{dataCrawls.map((e, i) => {
							const filter = dataServer.filter((esup: { title: string }) => esup.title === e.title)

							return (
								<Link
									key={i}
									href={filter.length > 0 ? `/dashboard/posts/animes/${filter[0].id}` : '#'}
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
											{e.episode}
										</p>
										{dataServer.some((esup: { title: string }) => esup.title === e.title) ? (
											<p className="text-white bg-gradient-to-t from-red-500 to-transparent max-w-max px-2 py-1 rounded">
												exist
											</p>
										) : (
											<p className="text-white bg-gradient-to-t from-green-500 to-transparent max-w-max px-2 py-1 rounded">
												not exist
											</p>
										)}
										{dataServer.some(
											(esup: MovieServer) =>
												esup.title === e.title &&
												esup.episodes.length <
													parseInt(e.episode.replace(/^\D+/g, '') && e.episode.replace(/^\D+/g, ''))
										) && (
											<p className="text-white bg-gradient-to-t from-sky-500 to-transparent max-w-max px-2 py-1 rounded">
												update
											</p>
										)}
									</div>
								</Link>
							)
						})}
					</div>
				</div>
				<OpstionAddMovie
					open={isModalAddMovie}
					handleCallback={handleOpenModalAddMovie}
					listCrawls={dataCrawls}
					listServer={dataServer}
				/>
				<Loading open={isLoading} />
			</main>
		</>
	)
}

export default AnimesCrawls
