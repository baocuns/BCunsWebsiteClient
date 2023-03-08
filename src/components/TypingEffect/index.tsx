import { useEffect, useRef, useState } from 'react'

type Props = {
	text: string
	delay: number //milis
}

const TypingEffect = (props: Props) => {
	const { text, delay } = props
	const [displayText, setDisplayText] = useState('')
	const iRef = useRef(0)

	useEffect(() => {
		const interval = setInterval(() => {
			if (iRef.current < text.length) {
				setDisplayText(displayText + text.charAt(iRef.current))
				iRef.current++
			} else {
				clearInterval(interval)
			}
		}, delay)

		return () => clearInterval(interval)
	}, [displayText, text, delay])

	return <>{displayText}</>
}

export default TypingEffect
