/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CiEdit } from 'react-icons/ci'
import { BsCheck2, BsX } from 'react-icons/bs'
import TextareaAutosize from 'react-textarea-autosize'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import axios from 'axios'

type Profiles = Database['public']['Tables']['profiles']['Row']

type Props = {
	open: boolean
	handleCallback: () => void
	profile: Profiles
}

const EditProfile = (props: Props) => {
	const supabase = useSupabaseClient<Database>()

	const [profile, setProfile] = useState<Profiles>(props.profile)
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

	// modals
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

			setProfile((prev) => ({
				...prev,
				['avatar_url']: url,
			}))
		}
	}

	//upload photo
	const handleUploadPhoto = async () => {
		if (file) {
			// const formData = new FormData()
			// formData.append('file', file)
			// formData.append('upload_preset', 'profiles')
			// const data = await axios.post('https://api.cloudinary.com/v1_1/dykcbmulk/image/upload', formData)

			const { data, error } = await supabase.storage
				.from('profiles')
				.upload(`avatars/${profile.bcuns_id}`, file) //.${file.name.split('.')[1]}
				// .remove(['avatars/baocuns.jpg'])
				// .update('avatars/baocuns.jpg', file)

			console.log('data: ', data)
		} else {
			alert('seelect photo')
		}
	}

	return (
		<Transition.Root show={props.open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
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
									<div className="py-2">
										<div className="font-medium border-b mb-4 text-black">Ảnh hồ sơ</div>
										<div className="flex justify-center">
											<div className="group relative max-w-max cursor-pointer">
												<img
													src={profile.avatar_url}
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
										<button
											type="button"
											className="bg-gray-200 mx-4 p-2"
											onClick={handleUploadPhoto}
										>
											Upload
										</button>
									</div>
									<div className="py-2">
										<div className="font-medium border-b mb-2 text-black">BCuns ID</div>
										<div className="flex justify-center">
											<p className="text-lg text-black font-medium">@</p>
											<TextareaAutosize
												name="bcuns_id"
												defaultValue={profile.bcuns_id}
												onChange={(e) => handleProfileChange(e)}
												className="font-normal tracking-tight focus:outline-0 resize-none max-w-max bg-white text-black"
												placeholder="BCuns ID"
											/>
											<div className="flex items-center">
												<BsCheck2 size={24} color={'green'} />
												<BsX size={28} color={'red'} />
											</div>
										</div>
										<div className="px-6 py-2">
											<div className="text-xs pb-2 text-black italic">www.baocuns.com/baocuns</div>
											<div className="text-xs text-black italic">
												BCuns ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu chấm. Khi
												thay đổi BCuns ID, liên kết hồ sơ của bạn cũng sẽ thay đổi. Hệ thông khuyết
												khích nên đặt BCuns ID đơn giản, ngắn gọn dễ nhớ.
											</div>
										</div>
									</div>
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
										onClick={handleCloseModals}
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

{
	/* <div className="form-widget">
			<div>
				<label htmlFor="email">Email</label>
				<input id="email" type="text" value={session.user.email} disabled />
			</div>
			<div>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					type="text"
					value={username || ''}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="sex">sex</label>
				<input
					id="sex"
					type="sex"
					value={sex || ''}
					onChange={(e) => setsex(e.target.value)}
				/>
			</div>

			<div>
				<button
					className="button primary block"
					onClick={() => updateProfile({ username, sex, avatar_url })}
					disabled={loading}
				>
					{loading ? 'Loading ...' : 'Update'}
				</button>
			</div>

			<div>
				<button className="button block" onClick={() => supabase.auth.signOut()}>
					Sign Out
				</button>
			</div>
		</div> */
}
