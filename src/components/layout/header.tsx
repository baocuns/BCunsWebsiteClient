import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { CiBellOn, CiChat2, CiGrid41, CiLogout, CiSearch } from 'react-icons/ci'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

type Props = {}

const Headers = (props: Props) => {
	const { theme, setTheme } = useTheme()
	const [isScrollDown, setIsScrollDown] = useState(false)
	const [valueScy, setValueScy] = useState(0)

	// const handleScroll = () => {
	// 	if (window.scrollY > valueScy) {
	// 		setIsScrollDown(true)
	// 	} else {
	// 		setIsScrollDown(false)
	// 	}
	// 	console.log('valueScy: ', valueScy)
	// 	console.log('window.scrollY: ', window.scrollY)

	// 	setValueScy(5)
	// }

	// useEffect(() => {
	// 	window.addEventListener('scroll', () => handleScroll())
	// 	return window.removeEventListener('scroll', () => handleScroll())
	// }, [])

	return (
		<div className='w-full h-12'>
			<div className="flex fixed h-12 w-full bg-white dark:bg-gray-800 z-10 content-center px-4 sm:px-8">
				<div className="flex w-1/6 items-center">
					<button type="button" className="hover:text-green-500">
						<CiGrid41 size={24} />
					</button>
				</div>

				{/* notification */}
				<div className="flex w-5/6 justify-end">
					<div className="flex items-center">
						<input
							type="search"
							name="search"
							id="search"
							className="block w-full rounded-full outline-none px-3 text-sm py-1 border border-gray-300 focus:border-green-600 dark:bg-gray-800"
							placeholder='search'
						/>
						<button type="button" className="hover:text-green-500 p-1">
							<CiSearch size={24} />
						</button>
					</div>
					<button type="button" className="hover:text-green-500 p-1 mx-1">
						<CiBellOn size={24} />
					</button>
					<button type="button" className="hover:text-green-500 p-1 mx-1">
						<CiChat2 size={24} />
					</button>
					<button type="button" className="hover:text-green-500 p-1 mx-1">
						<CiLogout size={24} />
					</button>
					<button
						type="button"
						className="hover:text-green-500 p-1 mx-1"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					>
						{theme === 'dark' ? <MdDarkMode size={24} /> : <MdLightMode size={24} /> }
					</button>
				</div>
			</div>
		</div>
	)
}

export default Headers
