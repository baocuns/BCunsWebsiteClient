import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners'
import ScaleLoader from 'react-spinners/ScaleLoader'

type Props = {
	open: boolean
}

const Loading = (props: Props) => {
	return (
		<>
			{props.open && (
				<div className="flex fixed inset-0 justify-center z-50 bg-gray-200 dark:bg-gray-500 bg-opacity-30 dark:bg-opacity-30 transition-opacity items-center">
					{/* <ClimbingBoxLoader color="#36d7b7" loading size={20} speedMultiplier={1} /> */}
					<ScaleLoader color="#36d7b7" height={45} width={8} />
				</div>
			)}
		</>
	)
}

export default Loading
