/* eslint-disable react/no-unescaped-entities */
import { useSupabaseClient } from '@supabase/auth-helpers-react'
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
}

const Login = (props: Props) => {
	const supabase = useSupabaseClient()
	const router = useRouter()

	const [data, setData] = useState<Account>()

	const handleChangeData = (target: HTMLInputElement) => {
		const { value, name } = target
		setData((prev) => ({
			...prev,
			[name]: value
		}))
	}

	const handleLogin = () => {
		supabase.auth.signInWithPassword({
			email: data?.email || '',
			password: data?.password || ''
		})
		.then(({data, error}) => {
			if (data) {
				if (router.query.redirect) {
					router.push(`/${router.query.redirect}`)
				} else {
					router.push('/')
				}
			}
			if (error) {
				router.push('/auth/login')
			}
		})
	}

	return (
		<>
			<Head>
				<title>Đăng nhập tài khoản BCuns</title>
				<SEO
					title="Đăng nhập tài khoản BCuns"
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
							<button className="flex justify-center py-2 shadow rounded hover:bg-gray-100 dark:shadow-gray-700 dark:hover:bg-gray-700">
								<FcGoogle size={25} />
							</button>
							<button className="flex justify-center py-2 shadow rounded hover:bg-gray-100 dark:shadow-gray-700 dark:hover:bg-gray-700">
								<SiFacebook size={25} color="#039be5" />
							</button>
						</div>
						{/* form */}
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
										className="w-full px-4 py-2 shadow rounded focus:outline-green-600"
										placeholder="Your email address"
										onChange={(e) => handleChangeData(e.target)}
									/>
								</div>
							</div>
							<div>
								<label htmlFor="password" className="">
									Your Password
								</label>
								<div className="my-2">
									<input
										type="password"
										name="password"
										id="password"
										className="w-full px-4 py-2 shadow rounded focus:outline-green-600"
										placeholder="Your password"
									/>
								</div>
							</div>
						</div>
						{/* submit */}
						<div className="py-2">
							<button className="flex w-full py-2 rounded shadow bg-green-500 hover:bg-green-600 text-white justify-center items-center gap-4"
								onClick={handleLogin}
							>
                                <CiLock size={20} />
								Login
							</button>
						</div>
						{/* link to login */}
						<div className='py-2 flex justify-center'>
							<Link href={'/auth/forgot'} className='text-gray-500 hover:text-gray-400 underline text-sm'>Forgot your password?</Link>
						</div>
						<div className='py-2 flex justify-center'>
							<Link href={'/auth/signup'} className='text-gray-500 hover:text-gray-400 underline text-sm'>Don't have an account? Sign up</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default Login
