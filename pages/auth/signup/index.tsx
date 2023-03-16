import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Provider } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { CiLock, CiPalette } from 'react-icons/ci'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import { SEO } from '../../../src/components'

type Props = {}

type Account = {
	email?: string
	password?: string
	rePassword?: string
}

const Signup = (props: Props) => {
	const supabase = useSupabaseClient()
	const router = useRouter()

	const [data, setData] = useState<Account>()
	const [isError, setIsError] = useState(false)
	const [isPassword, setIsPassword] = useState(false)
	const [isSignup, setIsSignup] = useState(false)

	const handleChangeData = (target: HTMLInputElement) => {
		const { value, name } = target
		setData((prev) => ({
			...prev,
			[name]: value,
		}))
		setIsError(false)
		if (name === 'rePassword') {
			if (data?.password !== value) {
				setIsPassword(true)
			}
			if (data?.password === value) {
				setIsPassword(false)
			}
		}
	}

	const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log(isPassword);
		
		!isPassword &&
			supabase.auth
				.signUp({
					email: data?.email || '',
					password: data?.password || '',
				})
				.then(({ data, error }) => {
					if (error) {
						setIsError(true)
					}
					if (data.user) {
						setIsSignup(true)
					}
				})
	}

	// login with google or facebook
	const handleLoginWithOAuth = (type: Provider) => {
		supabase.auth.signInWithOAuth({
			provider: type,
		})
	}

	return (
		<>
			<Head>
				<title>Đăng ký tài khoản BCuns</title>
				<SEO
					title="Đăng ký tài khoản BCuns"
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
						<form onSubmit={(e) => handleSignup(e)} id="login">
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
											className={`w-full px-4 py-2 shadow rounded focus:outline-green-600 ${
												isError ? 'outline-2 outline outline-red-500' : ''
											}`}
											placeholder="Your email address"
											onChange={(e) => handleChangeData(e.target)}
										/>
									</div>
								</div>
								<div>
									<label htmlFor="password" className="">
										Create a Password
									</label>
									<div className="my-2">
										<input
											type="password"
											name="password"
											id="password"
											required
											className={`w-full px-4 py-2 shadow rounded focus:outline-green-600 ${
												isError ? 'outline-2 outline outline-red-500' : ''
											} `}
											placeholder="Your password"
											onChange={(e) => handleChangeData(e.target)}
										/>
									</div>
								</div>
								<div>
									<label htmlFor="rePassword" className="">
										Your Re-Password
									</label>
									<div className="my-2">
										<input
											type="password"
											name="rePassword"
											id="rePassword"
											required
											className={`w-full px-4 py-2 shadow rounded focus:outline-green-600 ${
												isError ? 'outline-2 outline outline-red-500' : ''
											} ${
												data?.password !== data?.rePassword
													? 'outline-2 outline focus:outline-red-500 outline-red-500'
													: ''
											}`}
											placeholder="Your password"
											onChange={(e) => handleChangeData(e.target)}
										/>
									</div>
								</div>
							</div>
						</form>
						{/* error */}
						<div className={`py-2 justify-center ${isError ? 'flex' : 'hidden'}`}>
							<p className="text-red-600 underline text-sm">Invalid signup credentials</p>
						</div>
						<div className={`py-2 justify-center ${isSignup ? 'flex' : 'hidden'}`}>
							<p className="text-green-600 underline text-sm">Check your email for the confirmation link.</p>
						</div>
						{/* submit */}
						<div className="py-2">
							<button
								type="submit"
								form="login"
								className="flex w-full py-2 rounded shadow bg-green-500 hover:bg-green-600 text-white justify-center items-center gap-4"
							>
								<CiLock size={20} />
								Sign up
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
					</div>
				</div>
			</main>
		</>
	)
}

export default Signup
