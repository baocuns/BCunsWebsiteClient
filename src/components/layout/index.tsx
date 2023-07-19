/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Footer from './footer'
import Headers from './header'
import Dashboard from '../Dashboard'
import Navbar from '../Dashboard/Navbar'
import { useRouter } from 'next/router'
import { useSession } from '@supabase/auth-helpers-react'
// import { useSelector } from 'react-redux'
// import { API } from '../../redux/slices/apiSlice'
import Loading from '../Loading'
import backgroud from '../../../public/images/3.png'
import Image from 'next/image'

type Props = {
	children: React.ReactNode
}

const Layout = ({ children }: Props) => {
	// const api = useSelector(API)
	const router = useRouter()
	const session = useSession()
	const [isAdmin, setIsAdmin] = useState<boolean>(false)

	useEffect(() => {
		session && session?.user.id === 'ad14fcf2-067d-4351-b065-ab18349e157c' && setIsAdmin(true)
	}, [session])

	if (router.asPath.search('/dashboard') === 0) {
		if (!isAdmin) {
			return (
				<>
					<Loading open={true} />
				</>
			)
		} else {
			return (
				<>
					<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
						<div className="fixed inset-0 -z-50 h-full w-full">
							<Image src={backgroud} alt="Picture of the author" className='h-full w-full object-cover' />
						</div>
						<div className="hidden md:col-span-1 md:block">
							<Dashboard />
						</div>
						<div className="col-span-1 md:col-span-4">
							<Navbar />
							{children}
						</div>
					</div>
				</>
			)
		}
	} else {
		return (
			<>
				{/* header */}
				<Headers />

				{/* loading */}
				{/* {api.isFetching && <Loading />} */}

				{/* body */}
				{children}

				{/* footer */}
				<Footer />
			</>
		)
	}
}

export default Layout
