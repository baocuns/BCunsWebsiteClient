import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { CiSearch } from 'react-icons/ci'

type Props = {
	open: boolean
	handleCallback: () => void
}

const Search = (props: Props) => {
	// modals: open and close
	const cancelButtonRef = useRef(null)
	const handleCloseModals = () => {
		props.handleCallback()
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
											value=""
											aria-controls="headlessui-combobox-options-195"
										/>
										<div className="pointer-events-none absolute top-4 right-4 h-6 w-6">
											<CiSearch size={24} />
										</div>
									</div>
									<ul
										className="max-h-[18.375rem] divide-y divide-slate-200 overflow-y-auto rounded-b-lg border-t border-slate-200 text-sm leading-6"
										role="listbox"
										id="headlessui-combobox-options-195"
										data-headlessui-state="open"
									>
										<li
											className="flex items-center justify-between p-4"
											id="headlessui-combobox-option-290"
											role="option"
											aria-selected="false"
											data-headlessui-state=""
										>
											<span className="whitespace-nowrap font-semibold text-slate-900">
												Sidebar Layouts
											</span>
											<span className="ml-4 text-right text-xs text-slate-600">
												Application UI / Application Shells
											</span>
										</li>
										<li
											className="flex items-center justify-between p-4"
											id="headlessui-combobox-option-291"
											role="option"
											aria-selected="false"
											data-headlessui-state=""
										>
											<span className="whitespace-nowrap font-semibold text-slate-900">
												Sidebar Navigation
											</span>
											<span className="ml-4 text-right text-xs text-slate-600">
												Application UI / Navigation
											</span>
										</li>
										<li
											className="flex items-center justify-between p-4"
											id="headlessui-combobox-option-292"
											role="option"
											aria-selected="false"
											data-headlessui-state=""
										>
											<span className="whitespace-nowrap font-semibold text-slate-900">
												Store Navigation
											</span>
											<span className="ml-4 text-right text-xs text-slate-600">
												Ecommerce / Components
											</span>
										</li>
										<li
											className="flex items-center justify-between p-4"
											id="headlessui-combobox-option-205"
											role="option"
											aria-selected="false"
											data-headlessui-state=""
										>
											<span className="whitespace-nowrap font-semibold text-slate-900">
												Stacked Layouts
											</span>
											<span className="ml-4 text-right text-xs text-slate-600">
												Application UI / Application Shells
											</span>
										</li>
										<li
											className="flex items-center justify-between p-4"
											id="headlessui-combobox-option-294"
											role="option"
											aria-selected="false"
											data-headlessui-state=""
										>
											<span className="whitespace-nowrap font-semibold text-slate-900">
												Section Headings
											</span>
											<span className="ml-4 text-right text-xs text-slate-600">
												Application UI / Headings
											</span>
										</li>
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
