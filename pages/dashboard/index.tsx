/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React from 'react'
import { SEO } from '../../src/components'
import { CiGrid41, CiMoneyCheck1, CiRead, CiWavePulse1 } from 'react-icons/ci'
import { RxArrowBottomLeft, RxArrowTopRight } from 'react-icons/rx'
import { TbClick } from 'react-icons/tb'

type Props = {}

const Dashboard = (props: Props) => {
	return (
		<>
			<Head>
				<title>Bảng điều khiển | BCuns</title>
				<SEO
					title="Bảng điều khiển | BCuns"
					url="/dashboard"
					image="/images/BC.png"
					description="Bảng điều khiển | BCuns "
					keywords="Bảng điều khiển | BCuns"
				/>
			</Head>
			<main>
				<div className="px-4 sm:px-8 md:px-12 lg:px-16 py-4 md:py-6">
					<div className="flex items-center gap-4 mb-4">
						<div className="p-2 bg-red-400 rounded shadow-md shadow-red-300">
							<CiGrid41 size={20} color="white" />
						</div>
						<h2 className="text-2xl font-bold tracking-tight text-white">Dashboard</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
						<div className="relative p-6 bg-gradient-to-r from-orange-400 to-rose-400 rounded cursor-pointer transition duration-500 ease-in-out hover:scale-105">
							<div className="absolute inset-0 flex justify-end">
								<img
									className="object-cover h-full"
									src="https://www.bootstrapdash.com/demo/purple-admin-free/assets/images/dashboard/circle.svg"
									alt="background"
								/>
							</div>
							<div className="flex justify-between items-center">
								<h3 className="text-white font-bold">Lượt xem</h3>
								<CiWavePulse1 size={30} color="white" />
							</div>
							<div className="flex gap-4 items-center">
								<p className="text-white text-3xl font-bold">123.45k</p>
								<CiRead size={25} color="white" />
							</div>
							<div className="flex gap-4 items-center">
								<p className="text-white">Tăng 60%</p>
								<RxArrowTopRight size={25} color="white" />
							</div>
						</div>
						<div className="relative p-6 bg-gradient-to-r from-cyan-400 to-sky-400 rounded cursor-pointer transition duration-500 ease-in-out hover:scale-105">
							<div className="absolute inset-0 flex justify-end">
								<img
									className="object-cover h-full"
									src="https://www.bootstrapdash.com/demo/purple-admin-free/assets/images/dashboard/circle.svg"
									alt="background"
								/>
							</div>
							<div className="flex justify-between items-center">
								<h3 className="text-white font-bold">Lượt click</h3>
								<CiWavePulse1 size={30} color="white" />
							</div>
							<div className="flex gap-4 items-center">
								<p className="text-white text-3xl font-bold">234.45k</p>
								<TbClick size={25} color="white" />
							</div>
							<div className="flex gap-4 items-center">
								<p className="text-white">Giảm 10%</p>
								<RxArrowBottomLeft size={25} color="white" />
							</div>
						</div>
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
			</main>
		</>
	)
}

export default Dashboard
