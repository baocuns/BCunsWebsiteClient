import React from 'react'
import Footer from './footer'
import Headers from './header'
import { useSelector } from 'react-redux'
import { API } from '../../redux/slices/apiSlice'
import Loading from '../Loading'

type Props = {
	children: React.ReactNode
}

const Layout = ({ children }: Props) => {
	const api = useSelector(API)

	return (
		<>
			{/* header */}
			<Headers />

			{/* loading */}
			{api.isFetching && <Loading />}

			{/* body */}
			{children}

			{/* footer */}
			<Footer />
		</>
	)
}

export default Layout
