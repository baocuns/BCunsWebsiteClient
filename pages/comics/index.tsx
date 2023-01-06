/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React from 'react'
import { GridCardList, Pagination } from '../../src/components'

type Props = {}

const products: Array<Comic> = [
	{
		id: 1,
		name: 'TA KHÔNG PHẢI CON CƯNG CỦA KHÍ VẬN',
		href: '/comics/ta-khong-phai-con-cung-cua-khi-van',
		imageSrc: 'https://st.ntcdntempv3.com/data/comics/203/ta-khong-phai-con-cung-cua-khi-van.jpg',
		imageAlt: 'TA KHÔNG PHẢI CON CƯNG CỦA KHÍ VẬN',
		view: '1000',
		chapter: 'chapter-100',
	},
	{
		id: 2,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://st.ntcdntempv3.com/data/comics/89/chuong-mon-khiem-ton-chut.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		view: '1000',
		chapter: 'chapter-100',
	},
	{
		id: 3,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://st.ntcdntempv3.com/data/comics/227/bat-dau-tho-lo-voi-my-nu-su-ton.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		view: '1000',
		chapter: 'chapter-100',
	},
	{
		id: 4,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://st.ntcdntempv3.com/data/comics/46/nhap-hon-ma-dao-to-su.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		view: '1000',
		chapter: 'chapter-100',
	},
	{
		id: 5,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://st.ntcdntempv3.com/data/comics/146/nguyen-ton.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		view: '1000',
		chapter: 'chapter-100',
	},
	{
		id: 6,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://st.ntcdntempv3.com/data/comics/217/ta-co-mot-son-trai.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		view: '1000',
		chapter: 'chapter-100',
	},
	{
		id: 7,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://st.ntcdntempv3.com/data/comics/71/tam-nhan-hao-thien-luc.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		view: '1000',
		chapter: 'chapter-100',
	},
	{
		id: 8,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://st.ntcdntempv3.com/data/comics/228/vo-dao-doc-ton-7886.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		view: '1000',
		chapter: 'chapter-100',
	},
	{
		id: 9,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://st.ntcdntempv3.com/data/comics/141/tien-vo-de-ton.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		view: '1000',
		chapter: 'chapter-100',
	},
	{
		id: 10,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://st.ntcdntempv3.com/data/comics/117/nguyen-lai-ta-la-tu-tien-dai-lao.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		view: '1000',
		chapter: 'chapter-100',
	},
]

const Comics = (props: Props) => {
	return (
		<div>
			<Head>
				<title>Comics | BCuns</title>
				<meta name="description" content="Truyện tranh, danh sách các truyện tranh nổi tiếng..." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="px-4 py-4 sm:px-8">
				<div>
					{/* list */}
					<GridCardList list={products} />
					{/* pagination */}
					<Pagination />
				</div>
			</main>
		</div>
	)
}

export default Comics
