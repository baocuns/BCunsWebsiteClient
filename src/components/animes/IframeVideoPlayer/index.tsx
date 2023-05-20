import React, { useEffect, useState } from 'react'
import { classNames } from '../../../lib'

type Props = {
	sources: Array<string>
}

const IframeVideoPlayer = (props: Props) => {
	const { sources } = props
	const [screenWidth, setScreenWidth] = useState(0)
	const [src, setSrc] = useState('')

	const handleChangeSrc = (source: string) => {
		setSrc(source)
	}

	// on load start app
	useEffect(() => {
		sources && setSrc(sources[0])
		// set width
		setScreenWidth(window.innerWidth)

		// set event resize width
		const handleResize = () => setScreenWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [sources])
	console.log(sources)

	return (
		<div className="">
			<div className="flex justify-center py-4">
				{sources &&
					sources.map((e, i) => (
						<button
							key={i}
							className={classNames(
								'flex items-center gap-2 py-1 sm:py-2 px-2 sm:px-8 font-bold hover:scale-110 transition duration-500 ease-in-out rounded text-white hover:shadow-lg mx-1',
								e === src
									? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-l hover:shadow-red-500'
									: 'bg-gray-300'
							)}
							onClick={() => handleChangeSrc(e)}
						>
							{i === 0 ? `Mặc định` : `Server ${i}`}
						</button>
					))}
			</div>

			{/* video iframe  */}
			<div className="flex justify-center">
				<iframe
					className={classNames('w-full sm:w-3/5 rounded')}
					src={src}
					allowFullScreen={true}
					style={{
						height: screenWidth < 640 ? screenWidth / 1.78 : (screenWidth * 0.6) / 1.78,
					}}
				></iframe>
			</div>
		</div>
	)
}

export default IframeVideoPlayer
