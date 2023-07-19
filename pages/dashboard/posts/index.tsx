/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { SEO } from '../../../src/components'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { numberFormat } from '../../../src/lib'
import { CiImageOn, CiMemoPad, CiMoneyCheck1, CiRead, CiWavePulse1, CiYoutube } from 'react-icons/ci'
// import QuickViews from '../../../src/components/Products/Quickviews'
import { MdPostAdd } from 'react-icons/md'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RxArrowBottomLeft, RxArrowTopRight } from 'react-icons/rx'
import { TbClick } from 'react-icons/tb'
const slug = require('slug')

type Props = {}

const Posts = (props: Props) => {
	const router = useRouter()
	const supabase = useSupabaseClient<Database>()

	const [products, setProduct] = useState<Array<
		Database['public']['Tables']['products']['Row']
	> | null>()

	useEffect(() => {
		supabase
			.from('products')
			.select('*')
			.order('views', { ascending: false })
			.range(0, 12)
			.then(({ data, error }) => {
				data && setProduct(data)
			})
	}, [supabase])

	// open modal
	const [quickviews, setQuickviews] = useState<
		Database['public']['Tables']['products']['Row'] | null
	>()
	const [isQuickviews, setIsQuickviews] = useState(false)
	const handleQuickviews = (index: number) => {
		setIsQuickviews(!isQuickviews)
		products && setQuickviews(products[index])
	}

	return (
		<>
			<Head>
				<title>Bài viết | BCuns Manager</title>
				<SEO
					title="Bài viết | BCuns Manager"
					url="/dashboard/posts"
					image="/images/BC.png"
					description="Bài viết | BCuns Manager"
					keywords="Bài viết | BCuns Manager"
				/>
			</Head>
			<main>
				{/* list */}
				<div className="px-4 sm:px-8 md:px-12 lg:px-16 py-4 md:py-6">
					<div className="flex justify-between">
						{/* posts */}
						<div className="flex items-center gap-4">
							<div className="p-2 bg-red-400 rounded shadow-md shadow-red-300">
								<CiMemoPad size={20} color="white" />
							</div>
							<h2 className="text-2xl font-bold tracking-tight text-white">Posts</h2>
						</div>

						{/* button */}
						<div className="flex">
							<Link href={router.asPath + '/add'}>
								<button className="p-2 bg-green-400 rounded shadow-md shadow-green-300">
									<MdPostAdd size={20} color="white" />
								</button>
							</Link>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 mt-10">
						<Link href={router.asPath + '/animes'} className="relative p-6 bg-gradient-to-r from-orange-400 to-rose-400 rounded cursor-pointer transition duration-500 ease-in-out hover:scale-105">
							<div className="absolute inset-0 flex justify-end">
								<img
									className="object-cover h-full"
									src="https://www.bootstrapdash.com/demo/purple-admin-free/assets/images/dashboard/circle.svg"
									alt="background"
								/>
							</div>
							<div className="flex justify-between items-center">
								<h3 className="text-white font-bold">Animes</h3>
								<CiYoutube size={30} color="white" />
							</div>
							<div className="flex gap-4 items-center">
								<p className="text-white text-3xl font-bold">123.45k</p>
								<CiRead size={25} color="white" />
							</div>
							<div className="flex gap-4 items-center">
								<p className="text-white">Tăng 60%</p>
								<RxArrowTopRight size={25} color="white" />
							</div>
						</Link>
						<Link href={router.asPath + '/comics'} className="relative p-6 bg-gradient-to-r from-cyan-400 to-sky-400 rounded cursor-pointer transition duration-500 ease-in-out hover:scale-105">
							<div className="absolute inset-0 flex justify-end">
								<img
									className="object-cover h-full"
									src="https://www.bootstrapdash.com/demo/purple-admin-free/assets/images/dashboard/circle.svg"
									alt="background"
								/>
							</div>
							<div className="flex justify-between items-center">
								<h3 className="text-white font-bold">Comics</h3>
								<CiImageOn size={30} color="white" />
							</div>
							<div className="flex gap-4 items-center">
								<p className="text-white text-3xl font-bold">234.45k</p>
								<TbClick size={25} color="white" />
							</div>
							<div className="flex gap-4 items-center">
								<p className="text-white">Giảm 10%</p>
								<RxArrowBottomLeft size={25} color="white" />
							</div>
						</Link>
						<div className="relative p-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded cursor-pointer transition duration-500 ease-in-out hover:scale-105">
							<div className="absolute inset-0 flex justify-end">
								<img
									className="object-cover h-full"
									src="https://www.bootstrapdash.com/demo/purple-admin-free/assets/images/dashboard/circle.svg"
									alt="background"
								/>
							</div>
							<div className="flex justify-between items-center">
								<h3 className="text-white font-bold">Lượt mua</h3>
								<CiWavePulse1 size={30} color="white" />
							</div>
							<div className="flex gap-4 items-center">
								<p className="text-white text-3xl font-bold">45k</p>
								<CiMoneyCheck1 size={25} color="white" />
							</div>
							<div className="flex gap-4 items-center">
								<p className="text-white">Tăng 10%</p>
								<RxArrowTopRight size={25} color="white" />
							</div>
						</div>
					</div>
				</div>
				{/* modal */}
				{/* <QuickViews product={quickviews} open={isQuickviews} handleCallback={handleQuickviews} /> */}
			</main>
		</>
	)
}

export default Posts
