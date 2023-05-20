/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { BsChevronDown } from 'react-icons/bs'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
	title: string
	icon: string
	handleCallback: (url: string) => void
	childs: Array<{
		title: string
		url: string
	}>
}

export default function ControlledAccordions(props: Props) {
	const [expanded, setExpanded] = React.useState<string | false>(false)

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false)
	}

	return (
		<div>
			<Accordion
				sx={{ backgroundColor: 'transparent', boxShadow: '0 1px 3px 0 #2dd4bf', color: 'white' }}
				className=""
				expanded={expanded === 'panel1'}
				onChange={handleChange('panel1')}
			>
				<AccordionSummary
					expandIcon={<BsChevronDown color="white" />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
					className="bg-transparent text-white"
				>
					<Typography sx={{ width: '10%', flexShrink: 0 }}>
						<img className="h-5" src={props.icon} alt="" />
					</Typography>
					<Typography sx={{}}>{props.title}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className="px-10">
						{props.childs.map((e, i) => (
							<button
								key={i}
								onClick={() => props.handleCallback(e.url)}
								className="mb-2 bg-teal-400 w-full py-1 font-bold rounded transition duration-500 ease-in-out hover:scale-105"
							>
								{e.title}
							</button>
						))}
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	)
}
