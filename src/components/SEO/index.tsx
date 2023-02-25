import React from 'react'

type Props = {
	title: string
	type?: string
	url: string
	image?: string
	description: string
	keywords?: string
}

// type: website, article, product, profile, video...
const keywordsDefauld =
	'truyện tranh, đọc truyện tranh, đọc truyện tranh ngôn tình hay, truyện đam mỹ, truyện xuyên không, truyện tranh online, truyện tranh online, truyện ngôn tình, truyện cổ trang, truyện trọng sinh, boylove , manga, manhua, manhwa, truyện tranh hàn'

const SEO = (props: Props) => {
	const { title, type, url, image, description, keywords } = props

	return (
		<>
			{/* 6. Meta Description */}
			<meta name="description" content={description} />
			{/* 4. Open Graph */}
			<meta property="og:title" content={title} />
			<meta property="og:type" content={type ? type : 'website'} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={image} />
			<meta property="og:description" content={description} />
			{/* 5. Twitter Card */}
			<meta name="twitter:title" content={title} />
			<meta name="twitter:card" content={type ? type : 'website'} />
			<meta name="twitter:url" content={url} />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:description" content={description} />
			{/* keywords */}
			<meta name="keywords" content={keywords ? keywords : keywordsDefauld} />
			{/* 9. Viewport */}
			<meta content="width=device-width, initial-scale=1" name="viewport" />
		</>
	)
}

export default SEO
