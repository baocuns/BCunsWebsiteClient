import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CiTimer } from 'react-icons/ci'
import {
	FaCompress,
	FaExpand,
	FaPause,
	FaPlay,
	FaVolumeDown,
	FaVolumeMute,
	FaVolumeUp,
} from 'react-icons/fa'
import { IoSettingsSharp } from 'react-icons/io5'

type Props = {
	thumbnails: string | undefined
	video: string
}

const VideoPlayer = (props: Props) => {
	const { thumbnails, video } = props

	const videoRef = useRef<HTMLVideoElement | null | any>()
	const divRef = useRef<HTMLDivElement | null | any>()
	const [isPlay, setIsPlay] = useState<boolean>(false)
	const [videoTime, setVideoTime] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)
	const [isChangeTime, setIsChangeTime] = useState(false)
	const [isProgressBar, setIsProgressBar] = useState(true)
	const [timeBuffered, setTimeBuffered] = useState(0)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [volume, setVolume] = useState(0)
	const [localMouse, setLocalMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

	//---------------------func
	const handleOnChangePlaybackRate = (rate: number) => {
		videoRef.current.playbackRate = rate
	}

	const handleFullScreen = () => {
		divRef.current.requestFullscreen()
		setIsFullScreen(true)
	}
	const handleExitFullScreen = () => {
		document.exitFullscreen()
		setIsFullScreen(false)
	}

	const handleOnChangeCurrentTime = (event: ChangeEvent<HTMLInputElement>) => {
		setIsChangeTime(true)
		setIsPlay(false)
		setCurrentTime(parseInt(event.target.value))
	}

	const handleOnChangeVolume = (event: ChangeEvent<HTMLInputElement>) => {
		setVolume(parseFloat(event.target.value))
		videoRef.current.volume = parseFloat(event.target.value)
	}

	//get max time
	const handleOnLoaded = () => {
		videoRef.current && setVideoTime(videoRef.current.duration)
		videoRef.current && setVolume(videoRef.current.volume)
	}
	const handleOnPress = () => {
		if (videoRef.current?.buffered?.length > 0) {
			setTimeBuffered(videoRef.current.buffered.end(0))
		}
	}

	const handleOnMouse = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setLocalMouse({
			x: event.clientX,
			y: event.clientY,
		})
	}

	//---------------------event
	// event change time
	useEffect(() => {
		var timer: string | number | NodeJS.Timeout | undefined = 0
		if (isChangeTime) {
			timer = setTimeout(() => {
				videoRef.current.currentTime = currentTime
				setIsChangeTime(false)
				setIsPlay(true)
			}, 1000)
		}

		return () => {
			clearTimeout(timer)
		}
	}, [currentTime, isChangeTime])

	// event play video
	useEffect(() => {
		isPlay ? videoRef.current.play() : videoRef.current.pause()
	}, [isPlay])

	//set trạng thái ẩn của progress bar
	useEffect(() => {
		var timer: string | number | NodeJS.Timeout | undefined = 0
		if (isFullScreen) {
			setIsProgressBar(true)
			timer = setTimeout(() => {
				setIsProgressBar(false)
			}, 3000)
		} else {
			setIsProgressBar(true)
		}

		return () => {
			clearTimeout(timer)
		}
	}, [isFullScreen, localMouse])

	// get time current
	useEffect(() => {
		const interval = setInterval(() => {
			isPlay ? setCurrentTime(videoRef.current?.currentTime) : clearInterval(interval)
		}, 1000)
		return () => clearInterval(interval)
	}, [isPlay])

	//
	useEffect(() => {
		videoRef.current && setVideoTime(videoRef.current.duration)
		videoRef.current && setVolume(videoRef.current.volume)
	}, [])

	return (
		<>
			<div
				ref={divRef}
				onMouseMove={(e) => handleOnMouse(e)}
				className={`flex relative justify-center md:mx-36 lg:mx-52 ${
					isProgressBar ? '' : 'cursor-none'
				}`}
			>
				<div className="absolute inset-0 z-10 group">
					<div
						onClick={() => setIsPlay(!isPlay)}
						className="absolute inset-0 z-10 flex justify-center items-center"
					>
						<span
							className={`relative transition duration-500 ease-in-out hover:scale-150 z-50 cursor-pointer ${
								isPlay ? 'hidden' : 'flex'
							}`}
						>
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
							<span className="relative inline-flex">
								<FaPlay size={40} color="white" />
							</span>
						</span>
					</div>
					<div
						className={`absolute bottom-0 py-6 w-full bg-gradient-to-t from-black to-transparent px-6 z-50 rounded opacity-0 transition duration-500 ease-in-out ${
							isFullScreen ? (isProgressBar ? 'opacity-100' : '') : 'group-hover:opacity-100'
						}`}
					>
						<div className="relative w-full flex items-center mb-4 group/time">
							<input
								className="anime_progress w-full h-1.5 rounded-full cursor-pointer bg-transparent outline-none appearance-none"
								type="range"
								step="1"
								min="0"
								max={videoTime}
								value={currentTime}
								onChange={(e) => handleOnChangeCurrentTime(e)}
							/>
							<div
								className="absolute h-1.5 -z-10 bg-green-500 rounded-full group-hover/time:scale-y-150"
								style={{
									width: `${(currentTime / videoTime) * 100}%`,
								}}
							></div>
							<div
								className="absolute h-1.5 -z-20 bg-gray-400/90 rounded-full"
								style={{
									width: `${(timeBuffered / videoTime) * 100}%`,
								}}
							></div>
							<div className="absolute h-1.5 w-full -z-30 bg-gray-600/90 rounded-full"></div>
						</div>
						<div className="flex justify-between">
							<div className="flex gap-6">
								{/* play/pause */}
								<button
									onClick={() => setIsPlay(!isPlay)}
									className="cursor-pointer text-white hover:text-green-500"
								>
									{isPlay ? <FaPause size={20} /> : <FaPlay size={20} />}
								</button>
								{/* volume */}
								<div className="relative flex justify-center group/volume">
									<div className="-rotate-90 absolute group-hover/volume:flex hidden items-center -top-14 pl-6">
										<div className="py-1 px-2 bg-white/70 rounded-full flex">
											<input
												className="w-20 volume"
												type="range"
												name="volume"
												id="volume"
												step={0.1}
												min={0}
												max={1}
												value={volume}
												onChange={(e) => handleOnChangeVolume(e)}
											/>
										</div>
									</div>

									<button className="cursor-pointer text-white hover:text-green-500">
										{volume > 0.5 ? (
											<FaVolumeUp size={20} />
										) : volume > 0 ? (
											<FaVolumeDown size={20} />
										) : (
											<FaVolumeMute size={20} />
										)}
									</button>
								</div>
								{/* time line */}
								<p className="text-white">
									{Math.floor(currentTime / 60) +
										':' +
										('0' + Math.floor(currentTime % 60)).slice(-2)}{' '}
									/{' '}
									{Math.floor(videoTime / 60) + ':' + ('0' + Math.floor(videoTime % 60)).slice(-2)}
								</p>
							</div>
							<div className="flex gap-6">
								{/* setting */}
								<div className="relative flex items-center group/setting">
									<div className="absolute group-hover/setting:block hidden bottom-0 right-0 pb-8">
										<div className="bg-black/70 rounded p-3">
											<div className="flex gap-4 text-white whitespace-nowrap border-b pb-1">
												<CiTimer size={20} />
												<p>Tốc độ phát</p>
											</div>
											<div>
												{[2, 1.5, 1.25, 1, 0.75, 0.5].map((e, i) => (
													<p
														onClick={() => handleOnChangePlaybackRate(e)}
														key={i}
														className={`font-medium hover:text-green-500 cursor-pointer py-1 whitespace-nowrap ${videoRef.current && e === videoRef.current.playbackRate ? 'text-green-500': 'text-white'}`}
													>
														{e}x
													</p>
												))}
											</div>
										</div>
									</div>
									<label htmlFor="setting">
										<div className="cursor-pointer text-white hover:text-green-500">
											<IoSettingsSharp size={20} />
										</div>
									</label>
								</div>
								{/* phong to / thu nho */}
								{isFullScreen ? (
									<button
										onClick={handleExitFullScreen}
										className="cursor-pointer text-white hover:text-green-500"
									>
										<FaCompress size={20} />
									</button>
								) : (
									<button
										onClick={handleFullScreen}
										className="cursor-pointer text-white hover:text-green-500"
									>
										<FaExpand size={20} />
									</button>
								)}
							</div>
						</div>
					</div>
				</div>

				<video
					onLoadedData={handleOnLoaded}
					onProgress={() => handleOnPress()}
					className="h-auto object-cover rounded"
					ref={videoRef}
					src={video}
					poster={thumbnails}
				></video>
			</div>
		</>
	)
}

export default VideoPlayer
