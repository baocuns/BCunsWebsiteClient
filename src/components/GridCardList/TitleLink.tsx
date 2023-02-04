import Link from 'next/link'
import React from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { VscListSelection } from 'react-icons/vsc'

type Props = {
	title: string
	link: string
	icon?: React.ReactNode | null
    className?: string
}

const TitleLink = (props: Props) => {
	const { title, link, icon, className } = props
	return (
		<>
			<div className={`mx-auto max-w-2xl py-4 sm:px-2 lg:max-w-7xl lg:px-4 ${className}`}>
				<div className="flex items-center border-b pb-1">
					{icon ? icon : <VscListSelection size={24} color="red" />}
					<Link
						href={link}
						className={
							'flex items-center hover:text-red-500 dark:hover:text-red-500 text-black dark:text-white'
						}
					>
						<h1 className="sm:text-xl font-medium mx-2">{title}</h1>
						<BsChevronRight size={20} />
					</Link>
				</div>
			</div>
		</>
	)
}

export default TitleLink
