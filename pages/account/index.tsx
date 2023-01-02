import Head from 'next/head'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Components from '../../src/components'
import { CiPalette } from 'react-icons/ci'

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
	const session = useSession()
	const supabase = useSupabaseClient()

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="px-4 sm:px-8">
				<div className="my-8 m-auto p-4 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
					<div className='shadow p-8 rounded-md dark:shadow-gray-700'>
						<div className='flex items-center'>
							<div className='mr-2 bg-green-600 p-2 rounded-full text-white'>
								<CiPalette size={24} />
							</div>
							<div className='text-2xl font-medium'>Wellcome to BCuns</div>
						</div>
						<div className='my-3 font-light'>Sign in today for BCuns</div>
						{!session ? (
							<Auth
								supabaseClient={supabase}
								appearance={{
									theme: ThemeSupa,
									variables: {
										default: {
											colors: {
												
											}
										}
									},
									style: {
										input: {
											color: 'gray'
										}
									}
								}}
								providers={['google', 'facebook']} // 'twitter'
								localization={{
									variables: {
										sign_in: {
											email_label: 'Your email address',
											password_label: 'Your strong password',
										},
										sign_up: {
											email_label: 'Your email address'
										}
									},
								}}
								socialLayout='horizontal'
								theme="light"
							/>
						) : (
							<Components.Account session={session} />
						)}
					</div>
				</div>
			</main>
		</>
	)
}
