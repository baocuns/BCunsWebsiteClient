/* eslint-disable react/no-unescaped-entities */
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Provider } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CiLock, CiPalette } from 'react-icons/ci'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import { SEO } from '../../../src/components'

type Props = {}

type Account = {
	email?: string
}

const Forgot = (props: Props) => {
	const supabase = useSupabaseClient()
	const session = useSession()
	const router = useRouter()

	const [isSendEmailResetPassword, setIsSendEmailResetPassword] = useState(false)
	const [isError, setIsError] = useState(false)
	const [data, setData] = useState<Account>()

	const handleChangeData = (target: HTMLInputElement) => {
		const { value, name } = target
		setData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	/**
	 * Step 1: Send the user an email to get a password reset token.
	 * This email contains a link which sends the user back to your application.
	 */
	const handleForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		supabase.auth
			.resetPasswordForEmail(data?.email || '', {
				redirectTo: 'https://www.baocuns.com/auth/forgot?reset=true',
			})
			.then(({ data, error }) => {
				if (error) {
					setIsError(true)
				}
				if (data) {
					setIsSendEmailResetPassword(true)
				}
			})
	}

	/**
	 * Step 2: Once the user is redirected back to your application,
	 * ask the user to reset their password.
	 */
	useEffect(() => {
		if (router.query.reset === 'true' && session?.user) {
			const newPassword: string | any = prompt('What would you like your new password to be?')
			supabase.auth.updateUser({ password: newPassword }).then(({ data, error }) => {
				if (data) {
					alert('Password updated successfully!')
					router.push('/')
				}
				if (error) alert('There was an error updating your password.')
			})
		}
		// supabase.auth.onAuthStateChange(async (event, session) => {
		// 	// console.log('event: ', event);
			
		// 	if (event === 'PASSWORD_RECOVERY') {
		// 		const newPassword : string | any = prompt('What would you like your new password to be?')
		// 		const { data, error } = await supabase.auth.updateUser({ password: newPassword })

		// 		if (data) {
		// 			alert('Password updated successfully!')
		// 			router.push('/')
		// 		}
		// 		if (error) alert('There was an error updating your password.')
		// 	}
		// })
	}, [router, session?.user, supabase.auth])

	// login with goofle
	const handleLoginWithOAuth = (type: Provider) => {
		supabase.auth.signInWithOAuth({
			provider: type,
		})
	}

	return (
		<>
			<Head>
				<title>Lấy lại mật khẩu tài khoản BCuns</title>
				<SEO
					title="Lấy lại mật khẩu tài khoản BCuns"
					url="{props.url}"
					image="/images/BC.png"
					description="Đọc truyện tranh online miễn phí tại trang web của BCuns. Chúng tôi cung cấp cho bạn hàng ngàn tác phẩm truyện tranh từ các tác giả nổi tiếng nhất và nhiều thế loại như manga, manhua, manhwa. Tìm kiếm truyện tranh yêu thích của bạn dễ dàng với công cụ tìm kiếm tiên tiến của BCuns và đọc truyện mọi lúc mọi nơi trên thiết bị di động của bạn. Đăng ký tài khoản để lưu trữ truyện yêu thích của bạn và tham gia vào cộng đồng truyện tranh của BCuns. Hãy đến với BCuns ngay hôm nay để khám phá thế giới truyện tranh đầy màu sắc và giải trí!"
					keywords="đọc truyện tranh, truyện tranh online, trang web truyện tranh, tác phẩm truyện tranh, đọc truyện miễn phí, cộng đồng truyện tranh, manga, manhua, manhwa"
				/>
			</Head>
			<main className="px-4 sm:px-8">
				<div className="my-8 m-auto p-4 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
					<div className="shadow p-8 rounded-md dark:shadow-gray-700">
						<div className="flex items-center">
							<div className="mr-2 bg-green-600 p-2 rounded-full text-white">
								<CiPalette size={24} />
							</div>
							<div className="text-2xl font-medium">Wellcome to BCuns</div>
						</div>
						<div className="my-3 font-light">Sign in today for BCuns</div>
						<div className="grid grid-cols-2 gap-2 border-b pb-4 my-2 dark:border-b-gray-700">
							<button
								className="flex justify-center py-2 shadow rounded hover:bg-gray-100 dark:shadow-gray-700 dark:hover:bg-gray-700"
								onClick={() => handleLoginWithOAuth('google')}
							>
								<FcGoogle size={25} />
							</button>
							<button
								className="flex justify-center py-2 shadow rounded hover:bg-gray-100 dark:shadow-gray-700 dark:hover:bg-gray-700"
								onClick={() => handleLoginWithOAuth('facebook')}
							>
								<SiFacebook size={25} color="#039be5" />
							</button>
						</div>
						{/* form */}
						<form onSubmit={(e) => handleForgotPassword(e)} id="forgot">
							<div className="py-2">
								<div>
									<label htmlFor="email" className="">
										Your email address
									</label>
									<div className="my-2">
										<input
											type="email"
											name="email"
											id="email"
											required
											className="w-full px-4 py-2 shadow rounded focus:outline-green-600"
											placeholder="Your email address"
											onChange={(e) => handleChangeData(e.target)}
										/>
									</div>
								</div>
							</div>
						</form>
						{/* error */}
						<div className={`py-2 justify-center ${isError ? 'flex' : 'hidden'}`}>
							<p className="text-red-600 underline text-sm">Invalid email credentials</p>
						</div>
						{/* error */}
						<div className={`py-2 justify-center ${isSendEmailResetPassword ? 'flex' : 'hidden'}`}>
							<p className="text-green-600 underline text-sm">
								Check your email for the password reset link
							</p>
						</div>
						{/* submit */}
						<div className="py-2">
							<button
								type="submit"
								form="forgot"
								className="flex w-full py-2 rounded shadow bg-green-500 hover:bg-green-600 text-white justify-center items-center gap-4"
							>
								<CiLock size={20} />
								Send reset password instructions
							</button>
						</div>
						{/* link to login */}
						<div className="py-2 flex justify-center">
							<Link
								href={'/auth/login'}
								className="text-gray-500 hover:text-gray-400 underline text-sm"
							>
								Already have an account? Sign in
							</Link>
						</div>
						<div className="py-2 flex justify-center">
							<Link
								href={'/auth/signup'}
								className="text-gray-500 hover:text-gray-400 underline text-sm"
							>
								Don't have an account? Sign up
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default Forgot
