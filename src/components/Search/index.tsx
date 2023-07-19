/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { CiSearch, CiStickyNote } from 'react-icons/ci'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import dayjs from 'dayjs'
import Link from 'next/link'
const slug = require('slug')

type Props = {
	open: boolean
	handleCallback: () => void
}

const Search = (props: Props) => {
	const supabase = useSupabaseClient<Database>()

	// modals: open and close
	const [isLoad, setIsLoad] = useState<boolean>(false)
	const cancelButtonRef = useRef(null)
	const handleCloseModals = () => {
		props.handleCallback()
	}

	const [keyWord, setKeyWord] = useState('')
	const [comics, setComics] = useState<
		Array<{
			id: String
			title: String
			updated_at: string | number | Date | null | undefined
			chapters: any
		}>
	>([])

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setKeyWord(event.target.value)
	}

	useEffect(() => {
		var timer: string | number | NodeJS.Timeout | undefined = 0
		setIsLoad(true)
		timer = setTimeout(() => {
			supabase
				.from('comics')
				.select('id,title,updated_at, chapters(view)')
				.textSearch('crawl_id', `${slug(keyWord).split('-').join('"|"')}`, {
					type: 'websearch',
				})
				.then(({ data, error }) => {
					setIsLoad(false)
					if (data) {
						setComics(data)
					}
				})
		}, 1000)

		return () => {
			clearTimeout(timer)
		}
	}, [keyWord, supabase])

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
									className="overflow-hidden rounded-lg bg-white shadow-md"
									id="headlessui-dialog-panel-8"
									data-headlessui-state="open"
								>
									<div className="relative shadow-sm">
										<input
											className="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
											placeholder="Find anything..."
											aria-label="Search components"
											id="headlessui-combobox-input-9"
											role="combobox"
											type="text"
											aria-expanded="true"
											data-headlessui-state="open"
											value={keyWord}
											aria-controls="headlessui-combobox-options-195"
											onChange={(e) => handleChange(e)}
										/>
										<div className="pointer-events-none absolute top-4 right-4 h-6 w-6">
											{isLoad ? (
												<svg
													className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500"
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
											) : <CiSearch size={24} />}
											
										</div>
									</div>
									<ul
										className="max-h-[18.375rem] divide-y divide-slate-200 overflow-y-auto rounded-b-lg border-t border-slate-200 text-sm leading-6"
										role="listbox"
										id="headlessui-combobox-options-195"
										data-headlessui-state="open"
									>
										{comics.map((e, i) => (
											<li
												key={i}
												className="hover:bg-gray-200"
												id="headlessui-combobox-option-291"
												role="option"
												aria-selected="false"
												data-headlessui-state=""
											>
												<Link
													className="grid grid-cols-4 items-center justify-between p-4"
													href={`/comics/${slug(e.title)}-${e.id}`}
												>
													<div className="col-span-3">
														<span className="font-semibold text-slate-900">{e.title}</span>
													</div>
													<div className="col-span-1 flex gap-2">
														<CiStickyNote size={18} />
														<span className="text-right text-xs text-slate-600">
															{e.chapters && e.chapters.length}
														</span>
														<span className="text-right text-xs text-slate-600">
															{dayjs(e.updated_at).fromNow()}
														</span>
													</div>
												</Link>
											</li>
										))}
									</ul>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default Search
