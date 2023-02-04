/* eslint-disable react-hooks/exhaustive-deps */
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { GridCardList, TitleLink } from '../../src/components'

type Props = {}

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
		<div>
			<Head>
				<title>Truyện Tranh &amp; Đọc Truyện Tranh Online Comic Tại BCuns | BCuns</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Web đọc truyện tranh online full, đa dạng thể loại: truyện tranh ngôn tình, đam mỹ, xuyên không, cổ trang, trọng sinh, manhwa, manhua mới nhất tại BCuns"
					property=""
				/>
				<meta
					name="twitter:title"
					content="Truyện Tranh &amp; Đọc Truyện Tranh Online Comic Tại BCuns | BCuns"
					property=""
				/>
				<meta
					name="twitter:description"
					content="Web đọc truyện tranh online full, đa dạng thể loại: truyện tranh ngôn tình, đam mỹ, xuyên không, cổ trang, trọng sinh, manhwa, manhua mới nhất tại BCuns"
					property=""
				/>
				<meta
					name="twitter:image"
					content="https://manhua.acimg.cn/horizontal/0/24_01_18_0a3ff00895a448ee7147f6a221782fc6_1669223905901.png/0"
					property=""
				/>
				<meta
					name=""
					content="Truyện Tranh &amp; Đọc Truyện Tranh Online Comic Tại BCuns | BCuns"
					property="og:title"
				/>
				<meta
					name=""
					content="Web đọc truyện tranh online full, đa dạng thể loại: truyện tranh ngôn tình, đam mỹ, xuyên không, cổ trang, trọng sinh, manhwa, manhua mới nhất tại BCuns"
					property="og:description"
				/>
				<meta
					name=""
					content="https://manhua.acimg.cn/horizontal/0/24_01_18_0a3ff00895a448ee7147f6a221782fc6_1669223905901.png/0"
					property="og:image"
				/>
				<meta name="copyright" content="BCuns" property="" />
				<meta
					name="keywords"
					content="truyện tranh, đọc truyện tranh, đọc truyện tranh ngôn tình hay, truyện đam mỹ, truyện xuyên không, truyện tranh online full, truyện tranh online, truyện ngôn tình, truyện cổ trang, truyện trọng sinh, boylove , manga, manhua, manhwa, truyện tranh hàn"
					property=""
				/>
				<meta name="" content="https://baocuns.com/comics" property="og:url" />
				<meta name="site" content="POPS APP Vietnam" property="" />
				<meta name="language" content="vi" property="" />
				<meta name="country" content="vn" property="" />
				<meta name="distribution" content="local" property="" />
				<meta name="next-head-count" content="22" />
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
		</div>
	)
}

export default Comics
