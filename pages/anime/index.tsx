import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { AnimeCardList, SEO, TitleLink } from '../../src/components'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

type Props = {}

const Animes = (props: Props) => {
	const supabase = useSupabaseClient<Database>()

	const [animeNew, setAnimeView] = useState<Array<
		Database['public']['Tables']['anime']['Row']
	> | null>()

	useEffect(() => {
		supabase
			.from('animes')
			.select(`*, episodes(*)`)
			.range(0, 19)
			.then(({ data, error }) => {
				if (data) {
					setAnimeView(data)
				}
			})
	}, [supabase])

	return (
		<>
			<Head>
				<title>
					{' '}
					Xem phim anime miễn phí - Tổng hợp hàng ngàn bộ anime mới nhất và đình đám nhất tại BCuns
				</title>
				<SEO
					title=" Xem phim anime miễn phí - Tổng hợp hàng ngàn bộ anime mới nhất và đình đám nhất"
					url="/anime"
					image="/images/BC.png"
					description="Tại trang web Bcuns, bạn có thể tìm thấy hàng ngàn bộ anime mới nhất và đình đám nhất từ nhiều thể loại khác nhau như hành động, phiêu lưu, hài hước, tình cảm, kinh dị và nhiều hơn nữa. Với giao diện thân thiện và dễ sử dụng, bạn có thể dễ dàng tìm kiếm và xem các bộ anime yêu thích của mình trên mọi thiết bị, mọi lúc, mọi nơi hoàn toàn miễn phí. Bên cạnh đó, Bcuns cập nhật liên tục các bộ anime mới nhất để mang đến cho bạn những trải nghiệm xem phim tuyệt vời nhất. Hãy đến với Bcuns để khám phá thế giới anime đầy màu sắc và hấp dẫn!"
					keywords="xem phim anime miễn phí, anime mới nhất, anime đình đám, anime hành động, anime phiêu lưu, anime hài hước, anime tình cảm, anime kinh dị, giao diện thân thiện, tìm kiếm anime, cập nhật anime, trải nghiệm xem phim, thế giới anime"
				/>
			</Head>
			<main className="px-4 py-4 sm:px-8">
				{/* Mới Nhất */}
				<div>
					<TitleLink title="Mới Nhất" link="#" />
					<AnimeCardList list={animeNew} />
				</div>
			</main>
		</>
	)
}

export default Animes
