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
				<meta name="description" content="Truyện tranh, danh sách các truyện tranh nổi tiếng..." />
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
