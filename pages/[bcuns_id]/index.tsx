import Head from 'next/head'
import { useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { GridCardList, LinkTab, ProfileDetails, TabPanel } from '../../src/components'
import { BsJournalAlbum } from 'react-icons/bs'
import { Box, Tabs } from '@mui/material'
import { GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

type Profiles = Database['public']['Tables']['profiles']['Row']

type Props = {
	data: Profiles
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(context)
	const bcuns_id: string | string[] | undefined = context.params?.bcuns_id

	const { data, error, status } = await supabase
		.from('profiles')
		.select()
		.eq('bcuns_id', bcuns_id)
		.single()

	return { props: { data } }
}

export default function Home(props: Props) {
	const profile: Profiles = props.data
	const session = useSession()
	const router = useRouter()
	// const bcuns_id: string | string[] | undefined = router.query.account

	// tablist
	const [value, setValue] = useState(0)
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	// console.log('router.query', router.query.account)

	const products: Array<Comic> = [
		{
			id: 1,
			name: 'TA KHÔNG PHẢI CON CƯNG CỦA KHÍ VẬN',
			href: '/comics/ta-khong-phai-con-cung-cua-khi-van',
			imageSrc: 'https://st.ntcdntempv3.com/data/comics/203/ta-khong-phai-con-cung-cua-khi-van.jpg',
			imageAlt: 'TA KHÔNG PHẢI CON CƯNG CỦA KHÍ VẬN',
			view: '1000',
			chapter: 'chapter-100',
		},
		{
			id: 2,
			name: 'Basic Tee',
			href: '#',
			imageSrc: 'https://st.ntcdntempv3.com/data/comics/89/chuong-mon-khiem-ton-chut.jpg',
			imageAlt: "Front of men's Basic Tee in black.",
			view: '1000',
			chapter: 'chapter-100',
		},
		{
			id: 3,
			name: 'Basic Tee',
			href: '#',
			imageSrc: 'https://st.ntcdntempv3.com/data/comics/227/bat-dau-tho-lo-voi-my-nu-su-ton.jpg',
			imageAlt: "Front of men's Basic Tee in black.",
			view: '1000',
			chapter: 'chapter-100',
		},
		{
			id: 4,
			name: 'Basic Tee',
			href: '#',
			imageSrc: 'https://st.ntcdntempv3.com/data/comics/46/nhap-hon-ma-dao-to-su.jpg',
			imageAlt: "Front of men's Basic Tee in black.",
			view: '1000',
			chapter: 'chapter-100',
		},
		{
			id: 5,
			name: 'Basic Tee',
			href: '#',
			imageSrc: 'https://st.ntcdntempv3.com/data/comics/146/nguyen-ton.jpg',
			imageAlt: "Front of men's Basic Tee in black.",
			view: '1000',
			chapter: 'chapter-100',
		},
		{
			id: 6,
			name: 'Basic Tee',
			href: '#',
			imageSrc: 'https://st.ntcdntempv3.com/data/comics/217/ta-co-mot-son-trai.jpg',
			imageAlt: "Front of men's Basic Tee in black.",
			view: '1000',
			chapter: 'chapter-100',
		},
		{
			id: 7,
			name: 'Basic Tee',
			href: '#',
			imageSrc: 'https://st.ntcdntempv3.com/data/comics/71/tam-nhan-hao-thien-luc.jpg',
			imageAlt: "Front of men's Basic Tee in black.",
			view: '1000',
			chapter: 'chapter-100',
		},
		{
			id: 8,
			name: 'Basic Tee',
			href: '#',
			imageSrc: 'https://st.ntcdntempv3.com/data/comics/228/vo-dao-doc-ton-7886.jpg',
			imageAlt: "Front of men's Basic Tee in black.",
			view: '1000',
			chapter: 'chapter-100',
		},
		{
			id: 9,
			name: 'Basic Tee',
			href: '#',
			imageSrc: 'https://st.ntcdntempv3.com/data/comics/141/tien-vo-de-ton.jpg',
			imageAlt: "Front of men's Basic Tee in black.",
			view: '1000',
			chapter: 'chapter-100',
		},
		{
			id: 10,
			name: 'Basic Tee',
			href: '#',
			imageSrc: 'https://st.ntcdntempv3.com/data/comics/117/nguyen-lai-ta-la-tu-tien-dai-lao.jpg',
			imageAlt: "Front of men's Basic Tee in black.",
			view: '1000',
			chapter: 'chapter-100',
		},
	]

	return (
		<>
			<Head>
				<title>{profile?.full_name} | BCuns</title>
				<meta name="description" content={`Generated by create next app`} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="px-4 sm:px-8">
				{profile ? (
					<>
						<ProfileDetails profile={profile} />
						{/* option */}
						<Box sx={{ width: '100%' }}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
									<LinkTab label="Truyện tranh" icon={<BsJournalAlbum size={18} color="red" />} />
								</Tabs>
							</Box>
							<TabPanel value={value} index={0}>
								<GridCardList list={products} />
							</TabPanel>
						</Box>
					</>
				) : (
					<>
						<div className='h-screen w-full flex items-center justify-center'>
							<h1 className='text-2xl font-medium pr-2 py-2 border-r-2'>404</h1>
							<p className='px-2'>This <b>bcuns id</b> could not be found.</p>
							<Link href={'/'}>
								<u className='text-red-500 hover:text-red-600'>Go Home</u>
							</Link>
						</div>
					</>
				)}
			</main>
		</>
	)
}
