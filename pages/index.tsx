/* eslint-disable @next/next/no-img-element */
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Carousel, Comics, News, SEO } from '../src/components'
import { createUser } from '../src/lib'

type Props = {
	url: any
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = context.req.url

	return { props: { url } }
}

const images = [
	'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/thumb_1920x1080__notext_-74b733a15710-1677820176303-e0UF4omJ.jpg?v=0&maxW=1400&format=webp',
	'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/copy_of_kvpex_thumb_1920x1080__notext_-f2a1eb0c96dd-1669023034755-WPjcwavK.jpg?v=0&maxW=1400&format=webp',
	'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/copy_of_sepcho_thumb_1280x720__notext_-22886463a9cf-1663317472391-IOnOQU4X.jpeg?v=0&maxW=1400&format=webp',
	'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_assets/1920x1080_slider-fa8d5ffe9079-1678420976314-jrZwTXtE.jpg?v=0&maxW=1400&format=webp',
	'https://popsimg.akamaized.net/api/v2/containers/file2/cms_assets/kl2023_thumb_1920x1080__notext_-d5822577b9ea-1678181211902-7CHfDw6A.jpg?v=0&maxW=1400&format=webp',
]

export default function Home(props: Props) {
	const supabase = useSupabaseClient<Database>()
	const session = useSession()
	const router = useRouter()

	// create user profile
	useEffect(() => {
		createUser(session, supabase)
	}, [session, supabase])

	return (
		<>
			<Head>
				<title>Đọc truyện tranh online miễn phí - Trang web truyện tranh số 1 | BCuns</title>
				<SEO
					title="Đọc truyện tranh online miễn phí - Trang web truyện tranh số 1 | BCuns"
					url="{props.url}"
					image="/images/BC.png"
					description="Đọc truyện tranh online miễn phí tại trang web của BCuns. Chúng tôi cung cấp cho bạn hàng ngàn tác phẩm truyện tranh từ các tác giả nổi tiếng nhất và nhiều thế loại như manga, manhua, manhwa. Tìm kiếm truyện tranh yêu thích của bạn dễ dàng với công cụ tìm kiếm tiên tiến của BCuns và đọc truyện mọi lúc mọi nơi trên thiết bị di động của bạn. Đăng ký tài khoản để lưu trữ truyện yêu thích của bạn và tham gia vào cộng đồng truyện tranh của BCuns. Hãy đến với BCuns ngay hôm nay để khám phá thế giới truyện tranh đầy màu sắc và giải trí!"
					keywords="đọc truyện tranh, truyện tranh online, trang web truyện tranh, tác phẩm truyện tranh, đọc truyện miễn phí, cộng đồng truyện tranh, manga, manhua, manhwa"
				/>
			</Head>
			<main>
				{/* slider */}
				<Carousel images={images} />

				{/* news */}
				<News />

				{/* comics */}
				<Comics />
			</main>
		</>
	)
}
