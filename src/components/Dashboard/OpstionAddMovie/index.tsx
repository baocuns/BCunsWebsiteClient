import React, { ChangeEvent, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BiRun } from 'react-icons/bi'
import Loading from '../../Loading'
import axios from 'axios'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

type Movie = {
	title: string
	episode: string
	thumbnails: string
	link: string
}

type Comic = {
	title: string
	thumbnails: string
	link: string
	lastest_chapters: [{
		id: string
		chapter: string
		update_at: string
	}]
}

type Opstion = {
	isNotExist: boolean
	isUpdate: boolean
}

type Props = {
	open: boolean
	handleCallback: () => void
	listCrawls: Array<Movie> | Array<Comic>
	listServer: Array<{ title: string }>
}

const OpstionAddMovie = (props: Props) => {
	const supabase = useSupabaseClient()

	const [isLoading, setIsLoading] = useState(false)
	const [opstion, setOpstion] = useState<Opstion>({ isNotExist: false, isUpdate: false })

	// modals: open and close
	const cancelButtonRef = useRef(null)
	const handleCloseModals = () => {
		props.handleCallback()
	}

	const handleChangeOpstion = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target
		setOpstion((prev) => ({
			...prev,
			[name]: checked,
		}))
	}

	const handleRunOpstion = async () => {
		setIsLoading(true)

		opstion.isNotExist && (await handleAddMovie())
		opstion.isUpdate && (await handleupdateEpisode())
		setIsLoading(false)
	}

	// add movie to server
	const handleAddMovie = async () => {
		let movies: Array<{
			title: string
			description: string
			thumbnails: string
		}> = []

		for (let i = 0; i < props.listCrawls.length; i++) {
			const element = props.listCrawls[i]
			if (!props.listServer.some((e) => e.title === element.title)) {
				const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/crawls/hhkungfu/details`, {
					linkMovie: element.link,
				}, {
					timeout: 20000
				})
				if (data) {
					movies.push(data.data)
				}
			}
		}
		
		const { data, error } = await supabase.from('animes').insert(movies)
	}
	// update tap moi
	const handleupdateEpisode = async () => {}

	//------------------------------------------------------------------
	const handleAddComic = async () => {
		let comics = Array<{
			title: string
			description: string
			
		}>
	}

	return (
		<Transition.Root show={props.open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-30"
				initialFocus={cancelButtonRef}
				onClose={handleCloseModals}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div
									className="overflow-hidden rounded-lg bg-white shadow-md p-4"
									id="headlessui-dialog-panel-8"
									data-headlessui-state="open"
								>
									<div className="flex justify-center p-2">
										<p className="text-lg font-bold">Bảng cài đặt khi thêm phim vào server</p>
									</div>
									{/* opstion */}
									<div className="py-4 px-6">
										<div className="flex items-center shadow rounded cursor-pointer mb-2 transition duration-500 ease-in-out hover:scale-105 hover:bg-gray-200">
											<input
												className="w-4 h-4 bg-gray-100 border-gray-300 rounded mx-2 cursor-pointer"
												type="checkbox"
												id="not-exist"
												name="isNotExist"
												onChange={(e) => handleChangeOpstion(e)}
											/>
											<label htmlFor="not-exist" className="w-full cursor-pointer">
												<p className="py-1">Chưa tồn tại trong hệ thộng</p>
											</label>
										</div>
										<div className="flex items-center shadow rounded cursor-pointer mb-2 transition duration-500 ease-in-out hover:scale-105 hover:bg-gray-200">
											<input
												className="w-4 h-4 bg-gray-100 border-gray-300 rounded mx-2 cursor-pointer"
												type="checkbox"
												id="update"
												name="isUpdate"
												onChange={(e) => handleChangeOpstion(e)}
											/>
											<label htmlFor="update" className="w-full cursor-pointer">
												<p className="py-1">Cập Nhật tập mới</p>
											</label>
										</div>
									</div>

									{/* thuc hien */}
									<div className="px-6 flex justify-end">
										<button
											onClick={handleRunOpstion}
											className="flex bg-green-500 py-1 px-2 rounded transition duration-500 ease-in-out hover:scale-110 hover:bg-green-600"
										>
											<BiRun size={25} color="white" />
											<h2 className="tracking-tight text-white ml-2">Thực hiện</h2>
										</button>
									</div>
								</div>
								<Loading open={isLoading} />
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default OpstionAddMovie
