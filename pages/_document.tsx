import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* 1. Charset */}
				<meta charSet="UTF-8" />
				{/* 2. Khai báo CSS và JS */}
				{/* 3. Favicon */}
				<link rel="icon" href="/images/BC.png"/>
				{/* 7. Canonical URL */}
				<link rel="canonical" href="https://www.baocuns.com/"/>
				{/* 8. Robots Meta Tag */}
				<meta name="robots" content="index, follow"/>
				{/*  */}
				<meta name="copyright" content="Copyright © 2023 Truyện tranh BCuns"/>
				<meta name="site" content="BCuns Vietnam"/>
				<meta name="language" content="vi"/>
				<meta name="country" content="vn"/>
				<meta name="distribution" content="local"/>
				<meta name="next-head-count" content="22"/>
			</Head>
			<body className="dark:bg-gray-900 scrollbar-hide">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
