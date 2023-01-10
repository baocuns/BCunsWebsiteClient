/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React from 'react'
import { ChapterList, DetailsComic } from '../../../src/components'

type Props = {}

const Comic = (props: Props) => {
	return (
		<div>
			<Head>
				<title>TA KHÔNG PHẢI CON CƯNG CỦA KHÍ VẬN | BCuns - Truyện Tranh</title>
				<meta name="description" content="Đọc truyện tranh Ta Là Tà Đế [Ngã Vi Tà Đế] Tiếng Việt bản dịch Full mới nhất, ảnh đẹp chất lượng cao, cập nhật nhanh và sớm nhất tại BCuns" />
				<meta property="og:title" content="Ta Là Tà Đế" />
				<meta property="og:site_name" content="BCuns" />
				<meta property="og:url" content="http://localhost:3000/comics/ta-khong-phai-con-cung-cua-khi-van" />
				<meta property="og:type" content="article" />
				<meta property="og:image" content="https://st.ntcdntempv3.com/data/images/26017.jpg" />
				<meta property="og:description" content="Đọc truyện tranh Ta Là Tà Đế [Ngã Vi Tà Đế] Tiếng Việt bản dịch Full mới nhất, ảnh đẹp chất lượng cao, cập nhật nhanh và sớm nhất tại BCuns" />
				<meta itemProp="name" content="Ta Là Tà Đế" />
				<meta itemProp="description" content="Đọc truyện tranh Ta Là Tà Đế [Ngã Vi Tà Đế] Tiếng Việt bản dịch Full mới nhất, ảnh đẹp chất lượng cao, cập nhật nhanh và sớm nhất tại BCuns" />
				<meta itemProp="image" content="https://st.ntcdntempv3.com/data/comics/161/ta-la-ta-de.jpg" />
				<meta name="copyright" content="Copyright © 2023 Truyện tranh BCuns" />
				<meta name="Author" content="Truyện tranh BCuns" />
				<meta name="thumbnail" content="https://st.ntcdntempv3.com/data/comics/161/ta-la-ta-de.jpg" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="px-4 py-4 sm:px-8">
				<div>
					<DetailsComic />
				</div>
				<div>
					<ChapterList />
				</div>
			</main>
		</div>
	)
}

export default Comic
