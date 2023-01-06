import React from 'react'
import Tab from '@mui/material/Tab'

type Props = {}

const LinkTab = (props?: LinkTab) => {
	return (
		<>
			<Tab
				component="a"
				onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
					event.preventDefault()
				}}
				{...props}
				iconPosition='start'
				className='dark:text-white dark:focus:text-blue-500'
			/>
		</>
	)
}

export default LinkTab
