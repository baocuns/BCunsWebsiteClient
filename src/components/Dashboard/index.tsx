import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { CiChat1, CiGrid41, CiMemoPad, CiServer, CiUser } from 'react-icons/ci'
import { classNames } from '../../lib'
import { AiOutlineBarChart } from 'react-icons/ai'

type Props = {}

const listdb = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: <CiGrid41 size={25} />,
	},
	{
		name: 'User',
		href: '/user',
		icon: <CiUser size={25} />,
	},
	{
		name: 'Posts',
		href: '/dashboard/posts',
		icon: <CiMemoPad size={25} />,
	},
	{
		name: 'Chats',
		href: '/chats',
		icon: <CiChat1 size={25} />,
	},
	{
		name: 'Storage',
		href: '/storage',
		icon: <CiServer size={25} />,
	},
	{
		name: 'Crawls',
		href: '/dashboard/crawls',
		icon: <AiOutlineBarChart size={25} />,
	},
]

const Dashboard = (props: Props) => {
	const router = useRouter()

	return (
		<div className="fixed inset-y-0 w-1/5 shadow shadow-white">
			{/* logo */}
			<div className="flex gap-2 py-3 items-center justify-center shadow shadow-white/20 bg-white/20">
				<Image src={'/images/BC.png'} alt="Cuns" width={40} height={40} className="rounded" />
				<p className="font-bold text-xl text-white">BCuns Manager</p>
			</div>
			{/* dashboard */}
			<div className="p-4 flex flex-col gap-3">
				{listdb.map((e, i) => (
					<Link
						key={i}
						href={e.href}
						className={classNames(
							'flex gap-2 rounded py-2 px-4 font-bold hover:bg-red-100 hover:text-red-500',
							router.asPath.search('/dashboard/') === 0
								? router.asPath.search(e.href) === 0 && e.href !== '/dashboard'
									? 'bg-red-50/25 text-white shadow'
									: 'text-gray-500'
								: e.href === '/dashboard'
								? 'bg-red-50/25 text-white shadow'
								: 'text-gray-500'
						)}
					>
						{e.icon}
						<span>{e.name}</span>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Dashboard
