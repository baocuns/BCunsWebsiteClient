import React from 'react'
import Link from 'next/link'
import { CiRead } from 'react-icons/ci'
import { VscListSelection } from 'react-icons/vsc'
import dayjs from 'dayjs'
import { numberFormat } from '../../lib'
import { useRouter } from 'next/router'

type Props = {
	chapters: Array<Database['public']['Tables']['chapters']['Row']>
}

const ChapterList = (props: Props) => {
	const { chapters } = props
	const router = useRouter()

	return (
		<div>
			<div className="mx-auto mt-6 md:max-w-7xl md:px-8">
				<div className="flex font-medium items-center border-b py-1">
					<div className="mr-2">
						<VscListSelection size={24} color="red" />
					</div>
					<div className="text-xl">Danh sách chương</div>
				</div>
				{/* danh sach chuong */}
				<div className="md:px-4">
					{chapters.map((e, i) => (
						<Link href={`${router.asPath}/chapter/${e.id}`} key={i}>
							<div className="grid grid-cols-4 gap-2 p-2 my-2 rounded shadow hover:scale-105 cursor-pointer duration-500 ease-in-out dark:shadow-gray-700">
								<h1 className="flex items-center text-sm md:text-base col-span-2 md:col-auto">{e.title}</h1>
								<div className="font-thin flex items-center">
									<i>{dayjs(e.created_at).fromNow()}</i>
								</div>
								<div className="flex items-center">
									<div className="mr-2">{numberFormat(e.view?.length, 1)}</div>
									<div>
										<CiRead size={18} />
									</div>
								</div>
								<div className='hidden md:inline'>
									<p className="line-clamp-2">{e.description}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default ChapterList
