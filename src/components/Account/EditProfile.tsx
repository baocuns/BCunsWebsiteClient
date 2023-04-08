/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CiEdit } from 'react-icons/ci'
import { BsCheck2, BsX } from 'react-icons/bs'
import TextareaAutosize from 'react-textarea-autosize'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { storageClient } from '../../config/supabase'
import { useDispatch } from 'react-redux'
import { callApiStart, callApiSuccess } from '../../redux/slices/apiSlice'
import { useRouter } from 'next/router'

type Profiles = Database['public']['Tables']['profiles']['Row']

type Props = {
	open: boolean
	handleCallback: () => void
	profile: Profiles
}

const routerID = ['auth', 'comics', 'Emm']

const EditProfile = (props: Props) => {
	const router = useRouter()
	const dispatch = useDispatch()
	const supabase = useSupabaseClient<Database>()

	const [avatarUrl, setAvatarUrl] = useState<string>()
	const [profile, setProfile] = useState<Profiles>(props.profile)
	const [profileOld, setProfileOld] = useState<Profiles>(props.profile)
	const [isBcunsId, setIsBcunsId] = useState<boolean>(true)
	const [isLoad, setIsLoad] = useState<boolean>(false)

	const handleProfileChange = (
		event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>
	) => {
		const name: string = event.target.name
		const value: string = event.target.value
		setProfile((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	// modals: open and close
	const cancelButtonRef = useRef(null)
	const handleCloseModals = () => {
		props.handleCallback()
	}

	// select photo
	const [file, setFile] = useState<File>()
	const handleSelectPhoto = (files: FileList | null) => {
		if (files) {
			setFile(files[0])

			const url: string = URL.createObjectURL(files[0])
			setAvatarUrl(url)
		}
	}

	// ------------------------ Submit update profile
	const handleSubmitUpdateProfile = () => {
		dispatch(callApiStart())
		if (isBcunsId) {
			if (file) {
				storageClient
					.from('profiles')
					.upload(`${profile.uid}/avatar`, file, {
						upsert: true,
					})
					.then(({ data, error }) => {
						if (data) {
							const pf = {
								...profile,
								['updated_at']: new Date().toISOString(),
							}
							supabase
								.from('profiles')
								.update(pf)
								.eq('id', pf.id)
								.then((res) => {
									// console.log('res: if', res)
									dispatch(callApiSuccess(res))
									handleCloseModals()
									router.push(`/${pf.bcuns_id}`)
								})
						}
					})
			} else {
				const pf = {
					...profile,
					['updated_at']: new Date().toISOString(),
				}
				supabase
					.from('profiles')
					.update(pf)
					.eq('id', pf.id)
					.then((res) => {
						// console.log('res: ', res)
						dispatch(callApiSuccess(res))
						handleCloseModals()
						router.push(`/${pf.bcuns_id}`)
					})
			}
		} else {

		}
	}

	// check bcuns id on change
	useEffect(() => {
		var timer: string | number | NodeJS.Timeout | undefined = 0
		if (profile.bcuns_id !== profileOld.bcuns_id) {
			setIsLoad(true)
			if (routerID.some((e) => e === profile.bcuns_id) || profile.bcuns_id.length < 5) {
				setIsBcunsId(false)
				setIsLoad(false)
			} else {
				timer = setTimeout(() => {
					supabase
						.from('profiles')
						.select()
						.eq('bcuns_id', profile.bcuns_id)
						.single()
						.then(({ data, error }) => {
							if (error) {
								setIsBcunsId(true)
							}
							if (data) {
								setIsBcunsId(false)
							}
							setIsLoad(false)
						})
				}, 1000)
			}
		}

		return () => {
			clearTimeout(timer)
		}
	}, [profile.bcuns_id, profileOld.bcuns_id, supabase])

	return (
		<Transition.Root show={props.open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-50"
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
								<div className="bg-white px-4 pt-5 pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10 text-green-500">
											<CiEdit size={24} />
										</div>
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
											<Dialog.Title as="h3" className="text-lg font-bold leading-6 text-black">
												Chỉnh sửa hồ sơ
											</Dialog.Title>
											<div className="py-1">
												<p className="text-sm font-thin text-black">
													Bạn có chắc chắn muốn chỉnh sửa tài khoản của mình không? Tất cả dữ liệu
													của bạn sẽ được cập nhật. Hành động này không thể được hoàn tác.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="px-4 pb-4">
									{/* avatar */}
									<div className="py-2">
										<div className="font-medium border-b mb-4 text-black">Ảnh hồ sơ</div>
										<div className="flex justify-center">
											<div className="group relative max-w-max cursor-pointer">
												<img
													src={file ? avatarUrl : profile.avatar_url}
													alt={profile.full_name}
													className="shadow h-44 w-32 group-hover:shadow-xl rounded"
												/>
												<div className="absolute -bottom-2 -right-2 bg-white shadow p-1 rounded text-black">
													<CiEdit size={24} />
												</div>
												<div>
													<label
														htmlFor="photos"
														className="absolute inset-0 cursor-pointer"
													></label>
													<input
														type="file"
														name="photos"
														id="photos"
														className="hidden"
														onChange={(e) => handleSelectPhoto(e.target.files)}
													/>
												</div>
												<div className="group-hover:flex justify-center hidden absolute -top-9 text-white w-full">
													<p className="bg-gray-600/75 py-1 px-2 rounded">Chọn hình</p>
												</div>
											</div>
										</div>
									</div>
									{/* bcuns id */}
									<div className="py-2">
										<div className="font-medium border-b mb-2 text-black">BCuns ID</div>
										<div className="flex justify-center items-center">
											<p className="text-lg text-black font-medium">@</p>
											<TextareaAutosize
												name="bcuns_id"
												defaultValue={profile.bcuns_id}
												onChange={(e) => handleProfileChange(e)}
												className="font-normal tracking-tight focus:outline-0 resize-none max-w-max bg-white text-black"
												placeholder="BCuns ID"
											/>
											<div className="flex items-center">
												{isLoad && (
													<svg
														className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-500"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
													>
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"
														></circle>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
														></path>
													</svg>
												)}
												{isBcunsId ? (
													<BsCheck2 size={24} color={'green'} />
												) : (
													<BsX size={28} color={'red'} />
												)}
											</div>
										</div>
										<div className="px-6 py-2">
											<div
												className={`text-xs pb-2 italic ${
													isBcunsId ? 'text-black' : 'text-red-600'
												}`}
											>
												www.baocuns.com/{profile.bcuns_id}
											</div>
											<div className="text-xs text-black italic">
												BCuns ID là chuỗi có 5 ký tự trở lên, chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu chấm. Khi thay đổi BCuns ID, liên kết hồ sơ của bạn cũng sẽ thay đổi. Hệ thông khuyết
												khích nên đặt BCuns ID đơn giản, ngắn gọn dễ nhớ.
											</div>
										</div>
									</div>
									{/* full name */}
									<div className="py-2">
										<div className="font-medium border-b mb-2 text-black">Họ Tên</div>
										<div className="px-8 sm:px-16">
											<TextareaAutosize
												name="full_name"
												defaultValue={profile.full_name}
												onChange={(e) => handleProfileChange(e)}
												className="w-4/5 font-normal tracking-tight focus:outline-0 resize-none text-black bg-white"
												placeholder="Họ tên"
											/>
											<div className="font-light text-black text-sm italic">
												{profile.full_name?.length}/30
											</div>
										</div>
										<div className="px-6 py-2">
											<div className="text-xs text-black italic">
												Bạn chỉ có thể thay đổi biệt danh 7 ngày một lần.
											</div>
										</div>
									</div>
									{/* story */}
									<div className="py-2">
										<div className="font-medium border-b mb-2 text-black">Tiểu sử</div>
										<div className="px-8 sm:px-16">
											<TextareaAutosize
												name="story"
												defaultValue={profile.story}
												onChange={(e) => handleProfileChange(e)}
												className="w-full font-normal tracking-tight focus:outline-0 resize-none text-black bg-white"
												placeholder="Tiểu sử..."
											/>
											<div className="font-light text-black text-sm italic">
												{profile.story?.length}/80
											</div>
										</div>
									</div>
									{/* public */}
									<div className="py-2">
										<div className="font-medium border-b mb-2 text-black bg-white">Cộng đồng</div>
										<div className="px-8 sm:px-16">
											<select
												name="is_public"
												className="border w-full p-1 rounded bg-white text-black"
												onChange={(e) => handleProfileChange(e)}
												defaultValue={profile.is_public}
											>
												<option value={0} className="bg-white text-black">
													Công khai
												</option>
												<option value={1} className="bg-white text-black">
													Chỉ mình tôi
												</option>
											</select>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<button
										type="button"
										className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
										onClick={handleSubmitUpdateProfile}
									>
										Cập Nhật
									</button>
									<button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
										onClick={handleCloseModals}
										ref={cancelButtonRef}
									>
										Hủy Bỏ
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default EditProfile
