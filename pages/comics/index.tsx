/* eslint-disable react-hooks/exhaustive-deps */
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { GridCardList, SEO, TitleLink } from '../../src/components'

type Props = {
	url: any
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const url = context.req.url

	return { props: { url } }
}

const Comics = (props: Props) => {
	const supabase = useSupabaseClient<Database>()

	// -------------------- fetch data
	const [comicsTopRank, setComicsTopRank] = useState<Array<
		Database['public']['Tables']['comics']['Row']
	> | null>()
	const [comicsTopLike, setComicsTopLike] = useState<Array<
		Database['public']['Tables']['comics']['Row']
	> | null>()
	const [comicsUpdate, setComicsUpdate] = useState<Array<
		Database['public']['Tables']['comics']['Row']
	> | null>()
	const [comicsTopView, setComicsTopView] = useState<Array<
		Database['public']['Tables']['comics']['Row']
	> | null>()

	const handleFetchData = () => {
		// view
		supabase
			.from('comics')
			.select(`*, chapters(view)`)
			.order('view', { ascending: false })
			.range(0, 11)
			.then(({ data, error }) => {
				if (data) {
					setComicsTopView(data)
				}
			})

		// rating
		supabase
			.from('comics')
			.select(`*, chapters(view)`)
			.order('rating', { ascending: false })
			.range(0, 11)
			.then(({ data, error }) => {
				if (data) {
					setComicsTopRank(data)
				}
			})

		// like
		supabase
			.from('comics')
			.select(`*, chapters(view)`)
			.order('like', { ascending: false })
			.range(0, 11)
			.then(({ data, error }) => {
				if (data) {
					setComicsTopLike(data)
				}
			})

		// update
		supabase
			.from('comics')
			.select(`*, chapters(view)`)
			.order('updated_at', { ascending: true })
			.range(0, 11)
			.then(({ data, error }) => {
				if (data) {
					setComicsUpdate(data)
				}
			})
	}

	useEffect(() => {
		handleFetchData()

		return () => {}
	}, [])

	return (
		<>
			<Head>
				<SEO
					title="Đọc truyện tranh online miễn phí - Trang web truyện tranh số 1 | BCuns"
					url={props.url}
					image="/images/BC.png"
					description="Đọc truyện tranh online miễn phí tại trang web của BCuns. Chúng tôi cung cấp cho bạn hàng ngàn tác phẩm truyện tranh từ các tác giả nổi tiếng nhất và nhiều thế loại như manga, manhua, manhwa. Tìm kiếm truyện tranh yêu thích của bạn dễ dàng với công cụ tìm kiếm tiên tiến của BCuns và đọc truyện mọi lúc mọi nơi trên thiết bị di động của bạn. Đăng ký tài khoản để lưu trữ truyện yêu thích của bạn và tham gia vào cộng đồng truyện tranh của BCuns. Hãy đến với BCuns ngay hôm nay để khám phá thế giới truyện tranh đầy màu sắc và giải trí!"
					keywords="đọc truyện tranh, truyện tranh online, trang web truyện tranh, tác phẩm truyện tranh, đọc truyện miễn phí, cộng đồng truyện tranh, manga, manhua, manhwa"
				/>
			</Head>
			<main className="px-4 py-4 sm:px-8">
				<div>
					{/* Top Bảng Xếp Hạng */}
					<div>
						<TitleLink title="Top Bảng Xếp Hạng" link="#" />
						<GridCardList list={comicsTopRank} />
					</div>
					{/* Truyện Tranh Được Xem Nhiều */}
					<div>
						<TitleLink title="Truyện Tranh Được Xem Nhiều" link="#" />
						<GridCardList list={comicsTopView} />
					</div>
					{/* Top Truyện Tranh Đông Đảo Các Đạo Hữu Ưa Thích */}
					<div>
						<TitleLink title="Top Đông Đảo Các Đạo Hữu Ưa Thích" link="#" />
						<GridCardList list={comicsTopLike} />
					</div>
					{/* Truyện Tranh Mới Cập Nhật */}
					<div>
						<TitleLink title="Truyện Tranh Mới Cập Nhật" link="#" />
						<GridCardList list={comicsUpdate} />
					</div>

					{/* pagination */}
					{/* <Pagination /> */}
				</div>
			</main>
		</>
	)
}

export default Comics
