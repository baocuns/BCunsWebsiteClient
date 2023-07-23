/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import dayjs from 'dayjs'
import Link from 'next/link'
const slug = require('slug')

type Props = {
	indexChapter: number
	comic: { id: string; title: string }
	chapters: Array<{
		id: string
		title: string
	}> | null
	open: boolean
	handleCallback: () => void
}

// scroll view chưa hoạt động

const ChapterModalList = (props: Props) => {
	// modals: open and close
	const cancelButtonRef = useRef(null)
	const handleCloseModals = () => {
		props.handleCallback()
	}

	// field

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
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg w-full">
								<div
									className="overflow-hidden rounded-lg bg-white shadow-md"
									id="headlessui-dialog-panel-8"
									data-headlessui-state="open"
								>
									<ul
										className="max-h-[20rem] divide-y divide-slate-200 overflow-y-auto rounded-b-lg border-t border-slate-200 text-sm leading-6"
									>
										{props.chapters &&
											props.chapters.map((e, i) => {
												return (
													<li
														key={i}
														className={`${
															i === props.indexChapter ? 'bg-red-200' : 'hover:bg-gray-200'
														}`}
														ref={(ref) => {
															if (i === props.indexChapter) {
																ref?.scrollIntoView({ behavior: 'smooth' })
															}
														}}
														id={`${i}`}
													>
														<Link
															className="font-semibold text-slate-900"
															href={`/comics/${slug(props.comic.title)}-${props.comic.id}/chapter/${
																e.id
															}`}
															onClick={handleCloseModals}
														>
															<p className="p-4 w-full">{e.title}</p>
														</Link>
													</li>
												)
											})}
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

export default ChapterModalList
