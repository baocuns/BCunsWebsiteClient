import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners'
import ScaleLoader from 'react-spinners/ScaleLoader'

type Props = {}

const Loading = (props: Props) => {
	return (
		<>
			<div className="flex fixed inset-0 justify-center z-50 bg-gray-200 dark:bg-gray-500 bg-opacity-75 dark:bg-opacity-75 transition-opacity items-center">
				{/* <ClimbingBoxLoader color="#36d7b7" loading size={20} speedMultiplier={1} /> */}
				<ScaleLoader color="#36d7b7" height={45} width={8} />
			</div>
		</>
	)
}

export default Loading
