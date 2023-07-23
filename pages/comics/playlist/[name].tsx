import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { GridCardList, SEO, TitleLink } from '../../../src/components'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

type Props = {
	name: string
	url: string
}

const playlist = [
	{
		title: 'Top Bảng Xếp Hạng',
		name: 'ranks',
    order: "rating"
	},
	{
		title: 'Truyện Tranh Được Xem Nhiều',
		name: 'views',
    order: "view"
	},
	{
		title: 'Top Đông Đảo Các Đạo Hữu Ưa Thích',
		name: 'likes',
    order: "like"
	},
	{
		title: 'Truyện Tranh Mới Cập Nhật',
		name: 'updates',
    order: "updated_at"
	},
]

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = context.req.url
	const name: any = context.params?.name || ''

	return { props: { name, url } }
}

const Playlist = (props: Props) => {
	const router = useRouter()
	const supabase = useSupabaseClient<Database>()
	const { name } = props

	const [comics, setComics] = useState<Array<
		Database['public']['Tables']['comics']['Select']
	> | null>()

	useEffect(() => {
		supabase
			.from('comics')
			.select(`*`)
			.order(playlist.find((e) => e.name === name)?.order || "", { ascending: false })
			.limit(36)
			.then(({ data, error }) => {
				if (data) {
					setComics(data)
				}
			})
	}, [name, supabase])

	return (
		<>
			<Head>
				<title>{playlist.find((e) => e.name == name)?.title} | BCuns</title>
				<SEO
					title={`${playlist.find((e) => e.name == name)?.title} | BCuns`}
					url={props.url}
					image="/images/BC.png"
					description="Đọc truyện tranh online miễn phí tại trang web của BCuns. Chúng tôi cung cấp cho bạn hàng ngàn tác phẩm truyện tranh từ các tác giả nổi tiếng nhất và nhiều thế loại như manga, manhua, manhwa. Tìm kiếm truyện tranh yêu thích của bạn dễ dàng với công cụ tìm kiếm tiên tiến của BCuns và đọc truyện mọi lúc mọi nơi trên thiết bị di động của bạn. Đăng ký tài khoản để lưu trữ truyện yêu thích của bạn và tham gia vào cộng đồng truyện tranh của BCuns. Hãy đến với BCuns ngay hôm nay để khám phá thế giới truyện tranh đầy màu sắc và giải trí!"
					keywords="đọc truyện tranh, truyện tranh online, trang web truyện tranh, tác phẩm truyện tranh, đọc truyện miễn phí, cộng đồng truyện tranh, manga, manhua, manhwa"
				/>
			</Head>
			<main>
				<main className="px-4 py-4 sm:px-8">
					<div>
						{/* Top Bảng Xếp Hạng */}
						<div>
							<TitleLink title={`${playlist.find((e) => e.name == name)?.title}`} link={`/comics/playlist/${name}`} />
							<GridCardList list={comics} />
						</div>

						{/* pagination */}
						{/* <Pagination /> */}
					</div>
				</main>
			</main>
		</>
	)
}

export default Playlist
