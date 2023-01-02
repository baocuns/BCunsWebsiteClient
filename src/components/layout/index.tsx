import React from 'react'
import Footer from './footer'
import Headers from './header'

type Props = {
	children: React.ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Headers />
			{children}
            <Footer />
		</>
	)
}

export default Layout
