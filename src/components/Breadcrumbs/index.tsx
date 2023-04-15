import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { BiHomeSmile } from 'react-icons/bi'
import { BsChevronRight } from 'react-icons/bs'

type Props = {
	breadcrumbs: Array<{
		name: string | ReactElement
		href: string
	}>
}

const Breadcrumbs = (props: Props) => {
	const { breadcrumbs } = props

	// console.log('router: ', arrRouter)

	return (
		<>
			<div className="mx-auto py-4 md:max-w-7xl md:px-8 hidden md:block">
				<div className='flex gap-2 items-center dark:text-white'>
					{breadcrumbs.map((e, i) => (
						<div key={i} className='flex gap-2 items-center'>
							<Link href={e.href} className="font-semibold hover:text-red-500">
								{e.name}
							</Link>
							{i === breadcrumbs.length - 1 ? '' : <BsChevronRight />}
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default Breadcrumbs
