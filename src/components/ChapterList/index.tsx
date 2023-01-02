import React from 'react'
import Link from 'next/link'
import { CiCircleList, CiRead } from 'react-icons/ci'

type Props = {}

const ChapterList = (props: Props) => {
	return (
		<div>
			<div className="mx-auto mt-6 max-w-4xl px-6 sm:max-w-7xl sm:px-8">
				<div className="flex font-medium items-center border-b py-1">
					<div className="mr-2">
						<CiCircleList size={18} />
					</div>
					<div className='text-xl'>Danh sách chương</div>
				</div>
				{/* danh sach chuong */}
				<div className="px-4">
					<Link href={'#'}>
						<div className="grid grid-cols-3 gap-2 p-2 my-2 rounded shadow hover:scale-105 cursor-pointer duration-500 ease-in-out">
							<div className=''>Chương 1</div>
							<div className="font-thin">
								<i>23 giờ trước</i>
							</div>
							<div className="flex items-center">
								<div className="mr-2">21k</div>
								<div>
									<CiRead size={18} />
								</div>
							</div>
						</div>
					</Link>
					<Link href={'#'}>
						<div className="grid grid-cols-3 gap-2 p-2 my-2 rounded shadow hover:scale-105 cursor-pointer duration-500 ease-in-out">
							<div>Chương 1</div>
							<div className="font-thin">
								<i>23 giờ trước</i>
							</div>
							<div className="flex items-center">
								<div className="mr-2">21k</div>
								<div>
									<CiRead size={18} />
								</div>
							</div>
						</div>
					</Link>
					<Link href={'#'}>
						<div className="grid grid-cols-3 gap-2 p-2 my-2 rounded shadow hover:scale-105 cursor-pointer duration-500 ease-in-out">
							<div>Chương 1</div>
							<div className="font-thin">
								<i>23 giờ trước</i>
							</div>
							<div className="flex items-center">
								<div className="mr-2">21k</div>
								<div>
									<CiRead size={18} />
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ChapterList
