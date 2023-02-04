import { useTheme } from 'next-themes'
import Head from 'next/head'
import * as React from 'react'

export interface IHomeProps {}

export default function Home(props: IHomeProps) {

	return (
		<>
			<Head>
				<title>BCuns</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Web đọc truyện tranh online full, đa dạng thể loại: truyện tranh ngôn tình, đam mỹ, xuyên không, cổ trang, trọng sinh, manhwa, manhua mới nhất 2022 tại BCuns" property=""/>
			</Head>
			<main className="px-4 sm:px-8">
				Home page
			</main>
		</>
	)	
}
