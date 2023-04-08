/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

type Props = {}

const posts = [
	{
		id: 1,
		title: 'Boost your conversion rate',
        image: 'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/thumb_1920x1080__notext_-74b733a15710-1677820176303-e0UF4omJ.jpg?v=0&maxW=1400&format=webp',
		href: '#',
		description:
			'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
		date: 'Mar 16, 2020',
		datetime: '2020-03-16',
		category: { title: 'Marketing', href: '#' },
		author: {
			name: 'Michael Foster',
			role: 'Co-Founder / CTO',
			href: '#',
			imageUrl:
				'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
	},
	{
		id: 1,
		title: 'Boost your conversion rate',
        image: 'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/copy_of_kvpex_thumb_1920x1080__notext_-f2a1eb0c96dd-1669023034755-WPjcwavK.jpg?v=0&maxW=1400&format=webp',
		href: '#',
		description:
			'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
		date: 'Mar 16, 2020',
		datetime: '2020-03-16',
		category: { title: 'Marketing', href: '#' },
		author: {
			name: 'Michael Foster',
			role: 'Co-Founder / CTO',
			href: '#',
			imageUrl:
				'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
	},
	{
		id: 1,
		title: 'Boost your conversion rate',
        image: 'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/copy_of_sepcho_thumb_1280x720__notext_-22886463a9cf-1663317472391-IOnOQU4X.jpeg?v=0&maxW=1400&format=webp',
		href: '#',
		description:
			'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
		date: 'Mar 16, 2020',
		datetime: '2020-03-16',
		category: { title: 'Marketing', href: '#' },
		author: {
			name: 'Michael Foster',
			role: 'Co-Founder / CTO',
			href: '#',
			imageUrl:
				'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
	},
	// More posts...
]

const Blog = (props: Props) => {
	return (
		<>
			<div className="px-4 sm:px-8 md:px-12 lg:px-16 py-4 md:py-10">
				<div className="flex justify-between pb-3 md:pb-6">
					<h2 className="text-3xl lg:text-5xl font-bold dark:text-white">Blog</h2>
					<Link href={'/blog'} className="hidden md:block">
						<div className="flex items-center gap-1 px-4 py-2 rounded shadow font-bold uppercase hover:bg-gray-100 transition duration-500 ease-in-out hover:scale-110 dark:shadow-gray-700 dark:hover:bg-gray-700 dark:text-white">
							<p>see more</p>
							<FiChevronRight size={20} />
						</div>
					</Link>
				</div>
				<div className="py-6">
					<div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{posts.map((post, i) => (
							<article
								key={i}
								className="flex max-w-xl flex-col items-start justify-between shadow rounded transition duration-500 ease-in-out hover:scale-105 dark:shadow-gray-700"
							>
								<div className="mb-4">
									<Link href={'#'}>
										<img
											src={post.image}
											alt=""
											className="rounded-t"
										/>
									</Link>
								</div>
								<div className="p-2">
									<div className="flex items-center gap-x-4 text-xs">
										<time dateTime={post.datetime} className="text-gray-500 dark:text-white">
											{post.date}
										</time>
										<a
											href={post.category.href}
											className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100"
										>
											{post.category.title}
										</a>
									</div>
									<div className="group relative">
										<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-white">
											<a href={post.href}>
												<span className="absolute inset-0" />
												{post.title}
											</a>
										</h3>
										<p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3 dark:text-white">
											{post.description}
										</p>
									</div>
									<div className="relative mt-8 flex items-center gap-x-4">
										<img
											src={post.author.imageUrl}
											alt=""
											className="h-10 w-10 rounded-full bg-gray-50"
										/>
										<div className="text-sm leading-6">
											<p className="font-semibold text-gray-900 dark:text-white">
												<a href={post.author.href}>
													<span className="absolute inset-0" />
													{post.author.name}
												</a>
											</p>
											<p className="text-gray-600 dark:text-white">{post.author.role}</p>
										</div>
									</div>
								</div>
							</article>
						))}
					</div>

					<div className="pt-6 flex justify-center">
						<Link href={'/blog'} className="md:hidden">
							<div className="flex items-center gap-1 px-4 py-2 rounded shadow font-bold uppercase hover:bg-gray-100 transition duration-500 ease-in-out hover:scale-110 dark:shadow-gray-700 dark:hover:bg-gray-700 dark:text-white">
								<p>see more</p>
								<FiChevronRight size={20} />
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default Blog
