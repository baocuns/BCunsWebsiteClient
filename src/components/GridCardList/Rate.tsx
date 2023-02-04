import Link from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { classNames } from '../../lib'

type Props = {
	link: string
	rate: number
}

const Rate = (props: Props) => {
	const { link, rate } = props
	return (
		<>
			<Link
				href={link}
				className="flex items-center absolute px-1 bg-black/50 top-[10%] right-0 z-10 rounded-l"
			>
				<p
					className={classNames(
						'font-medium mx-1',
						rate >= 5 && 'text-amber-500 text-5xl',
						rate < 5 && rate >= 4 && 'text-rose-500 text-4xl',
						rate < 4 && rate >= 3 && 'text-green-500 text-2xl',
						rate < 3 && rate >= 2 && 'text-teal-500 text-xl',
						rate < 2 && rate >= 1 && 'text-sky-500 text-lg',
						rate < 1 && 'text-white text-base'
					)}
				>
					{rate}
				</p>
				<div className="text-amber-300 mx-1">
					<FaStar size={16} />
				</div>
			</Link>
		</>
	)
}

export default Rate
