/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci'
import { classNames } from '../../../lib'

type Props = {
	images: Array<{
		title: string,
		image: string
	}>
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
			<div className="relative h-56 md:h-screen w-screen">
				{images.map((e, i) => (
					<div
						key={i}
						className={classNames('slide', active === i ? 'w-full opacity-100' : 'w-0 opacity-0')}
					>
						<img src={e.image} alt="" className="object-cover h-56 md:h-screen w-screen" />
					</div>
				))}

				{/* button */}
				<div className="absolute bottom-[20%] w-full flex justify-start gap-4 z-10">
					<div className="mx-[10%]">
						<div className="flex justify-center pb-2 md:pb-5 lg:pb-10">
							<h4 className="text-white text-base sm:text-2xl md:text-3xl lg:text-6xl font-bold">
								{images[active].title}
							</h4>
						</div>
						<Link href={images[active].title} className="flex justify-center">
							<button className="px-4 py-2 rounded bg-gradient-to-r from-pink-400 to-sky-400 hover:from-sky-400 hover:to-pink-400 hover:shadow-lg hover:shadow-sky-300">
								<p className="uppercase text-white font-bold text-base sm:text-2xl md:text-3xl lg:text-6xl">
									read now
								</p>
							</button>
						</Link>
					</div>
				</div>

				<div className="absolute bg-black/30 inset-0"></div>

				{/*  */}
				<div className="absolute bottom-[5%] w-full md:flex justify-center gap-4 hidden">
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
				<div className="absolute h-full left-0 top-0 w-1/5 md:flex justify-center items-center hidden">
					<button
						className="text-gray-400/50 hover:text-gray-200"
						onClick={() => handlePrev(active)}
					>
						<CiCircleChevLeft size={40} />
					</button>
				</div>
				<div className="absolute h-full right-0 top-0 w-1/5 md:flex justify-center items-center hidden">
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
