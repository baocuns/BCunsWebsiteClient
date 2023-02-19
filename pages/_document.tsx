import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" href="/images/BC.png" />
			</Head>
			<body className="dark:bg-gray-900 scrollbar-hide">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
