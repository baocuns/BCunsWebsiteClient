import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const Chapter = (props: Props) => {
	const router = useRouter()

	return (
		<>
			<div>Chapter {JSON.stringify(router.query)}</div>
		</>
	)
}

export default Chapter
