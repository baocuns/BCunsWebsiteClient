import React, { useState } from 'react'
import Link from 'next/link'
import { CiRead } from 'react-icons/ci'
import { VscListSelection } from 'react-icons/vsc'
import dayjs from 'dayjs'
import { classNames, numberFormat } from '../../../lib'
import { useRouter } from 'next/router'

type Props = {
	chapters: Array<Database['public']['Tables']['chapters']['List']>
}

const ChapterList = (props: Props) => {
	const [isIndexList, setIndexList] = useState(0)

	const chapters = props.chapters.sort(function (a, b) {
		var numA = extractNumber(a.title)
		var numB = extractNumber(b.title)

		// Nếu cả hai đều có số, thì sắp xếp giảm dần theo số
		if (numA !== null && numB !== null) {
			return numB - numA
		}

		// Nếu a có số và b không có số, đặt a trước b
		if (numA !== null) {
			return -1
		}

		// Nếu a không có số và b có số, đặt b trước a
		if (numB !== null) {
			return 1
		}

		// Nếu cả hai đều không có số, sắp xếp tăng dần theo title
		return a.title.localeCompare(b.title)
	})
	const chunkedComics = chunkArray(chapters, 50)

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
				<div className="md:px-4 py-2">
					<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 p-2 rounded bg-gray-50 dark:bg-gray-700">
						{chunkedComics.map((e, i) => (
							<button
								key={i}
								onClick={() => setIndexList(i)}
								className={classNames(
									'transition duration-500 ease-in-out hover:scale-125 hover:bg-red-300 text-gray-800 font-semibold shadow rounded w-full py-2 dark:hover:bg-green-400 dark:text-white',
									isIndexList === i
										? 'bg-red-200 dark:bg-green-200'
										: 'bg-white dark:bg-gray-600'
								)}
							>
								{extractNumber(e[0].title)} : {extractNumber(e[e.length - 1].title)}
							</button>
						))}
					</div>
					{/* List */}
					{chunkedComics[isIndexList].map((e, i) => (
						<Link href={`${router.asPath}/chapter/${e.id}`} key={i}>
							<div className="grid grid-cols-4 gap-2 p-2 my-2 rounded shadow hover:scale-105 cursor-pointer duration-500 ease-in-out dark:shadow-gray-700">
								<h1 className="flex items-center text-sm md:text-base col-span-2 md:col-auto">
									{e.title}
								</h1>
								<div className="font-thin flex items-center">
									<i>{dayjs(e.created_at).fromNow()}</i>
								</div>
								<div className="flex items-center">
									<div className="mr-2">{numberFormat(e.view, 1)}</div>
									<div>
										<CiRead size={18} />
									</div>
								</div>
								<div className="hidden md:inline">
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

// Định nghĩa hàm extractNumber() để trích xuất số từ title
function extractNumber(title: string) {
	var match = title.match(/\d+/) // Tìm các chữ số trong chuỗi
	return match ? parseInt(match[0]) : null // Trả về số hoặc null nếu không tìm thấy
}

// Tạo mảng con
function chunkArray(
	array: Array<Database['public']['Tables']['chapters']['List']>,
	chunkSize: number
) {
	var result = []
	for (var i = 0; i < array.length; i += chunkSize) {
		result.push(array.slice(i, i + chunkSize))
	}
	return result
}

export default ChapterList
