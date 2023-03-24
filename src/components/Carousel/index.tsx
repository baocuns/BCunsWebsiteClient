/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci'
import { classNames } from '../../lib'

type Props = {
	images: Array<string>
}

const Carousel = (props: Props) => {
	const { images } = props

	const [active, setActive] = useState(0)
	const iActive = useRef(0)

	const handleNext = (index: number) => {
		if (index === images.length - 1) {
			setActive(0)
			iActive.current = 0
		} else {
			setActive((prev) => prev + 1)
			iActive.current++
		}
	}
	const handlePrev = (index: number) => {
		if (index === 0) {
			setActive(images.length - 1)
			iActive.current = images.length - 1
		} else {
			setActive((prev) => prev - 1)
			iActive.current--
		}
	}
	const handleToImage = (index: number) => {
		setActive(index)
		iActive.current = index
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (iActive.current === images.length - 1) {
				setActive(0)
				iActive.current = 0
			} else {
				setActive((prev) => prev + 1)
				iActive.current++
			}
		}, 5000)

		return () => clearInterval(interval)
	}, [images.length])

	return (
		<>
			<div className="relative h-screen w-screen">
				{images.map((e, i) => (
					<div
						key={i}
						className={classNames('slide', active === i ? 'w-full opacity-100' : 'w-0 opacity-0')}
					>
						<img src={e} alt="" className="object-cover h-screen w-screen" />
					</div>
				))}

				{/*  */}
				<div className="absolute bottom-[5%] w-full flex justify-center gap-4">
					{images.map((e, i) => (
						<button key={i} className="py-3 group" onClick={() => handleToImage(i)}>
							<p
								className={`h-1 w-7 group-hover:bg-gray-200 ${
									active === i ? 'bg-gray-200' : 'bg-gray-400/50'
								}`}
							></p>
						</button>
					))}
				</div>
				<div className="absolute h-full left-0 top-0 w-1/5 flex justify-center items-center">
					<button
						className="text-gray-400/50 hover:text-gray-200"
						onClick={() => handlePrev(active)}
					>
						<CiCircleChevLeft size={40} />
					</button>
				</div>
				<div className="absolute h-full right-0 top-0 w-1/5 flex justify-center items-center">
					<button
						className="text-gray-400/50 hover:text-gray-200"
						onClick={() => handleNext(active)}
					>
						<CiCircleChevRight size={40} />
					</button>
				</div>
			</div>
		</>
	)
}

export default Carousel
