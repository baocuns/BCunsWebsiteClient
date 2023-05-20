import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { SEO } from '../../../src/components'
import { MdPostAdd } from 'react-icons/md'
import { TextareaAutosize } from '@mui/material'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

type Props = {}

const colorsDefault: Array<Database['public']['Colors']> = [
	{ name: 'Trắng', class: 'bg-white text-black', selectedClass: 'ring-gray-400' },
	{ name: 'Đen', class: 'bg-black', selectedClass: 'ring-gray-400' },
	{ name: 'Xám', class: 'bg-gray-400', selectedClass: 'ring-gray-400' },
	{ name: 'Nâu', class: 'bg-stone-400', selectedClass: 'ring-gray-400' },
	{ name: 'Đỏ', class: 'bg-red-400', selectedClass: 'ring-gray-400' },
	{ name: 'Cam', class: 'bg-orange-400', selectedClass: 'ring-gray-400' },
	{ name: 'Vàng', class: 'bg-yellow-400', selectedClass: 'ring-gray-400' },
	{ name: 'Xanh', class: 'bg-green-400', selectedClass: 'ring-gray-400' },
	{ name: 'Xanh Ngọc', class: 'bg-emerald-400', selectedClass: 'ring-gray-400' },
	{ name: 'Lục lam', class: 'bg-cyan-400', selectedClass: 'ring-gray-400' },
	{ name: 'Bầu trời', class: 'bg-sky-400', selectedClass: 'ring-gray-400' },
	{ name: 'Tím', class: 'bg-violet-400', selectedClass: 'ring-gray-400' },
	{ name: 'Ho vân anh', class: 'bg-fuchsia-400', selectedClass: 'ring-gray-400' },
	{ name: 'Hồng', class: 'bg-pink-400', selectedClass: 'ring-gray-400' },
	{ name: 'Hoa Hồng', class: 'bg-rose-400', selectedClass: 'ring-gray-400' },
]
const sizesDefault: Array<Database['public']['Sizes']> = [
	{ name: 'XXS', inStock: false },
	{ name: 'XS', inStock: true },
	{ name: 'S', inStock: true },
	{ name: 'M', inStock: true },
	{ name: 'L', inStock: true },
	{ name: 'XL', inStock: true },
	{ name: '2XL', inStock: true },
	{ name: '3XL', inStock: true },
]

const Add = (props: Props) => {
	const supabase = useSupabaseClient<Database>()
	const router = useRouter()

	const [product, setProduct] = useState<Database['public']['Tables']['products']['Insert']>({})
	const [images, setImages] = useState({})
	const [highlights, setHighlights] = useState({})
	const [colors, setColors] = useState({})
	const [sizes, setSizes] = useState({})

	const handleChangeProduct = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = event.target
		setProduct((prev) => ({
			...prev,
			[name]: value,
		}))
	}
	const handleChangeImages = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = event.target
		setImages((prev) => ({
			...prev,
			[name]: value,
		}))
	}
	const handleChangeHighlights = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = event.target
		setHighlights((prev) => ({
			...prev,
			[name]: value,
		}))
	}
	const handleChangeColors = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target
		setColors((prev) => ({
			...prev,
			[name]: checked,
		}))
	}
	const handleChangeSizes = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target
		setSizes((prev) => ({
			...prev,
			[name]: checked,
		}))
	}

	useEffect(() => {
		setProduct((prev) => ({
			...prev,
			['images']: Object.values(images),
		}))
	}, [images])
	useEffect(() => {
		setProduct((prev) => ({
			...prev,
			['highlights']: Object.values(highlights),
		}))
	}, [highlights])
	useEffect(() => {
		let colorsJSON: Array<Database['public']['Colors']> = []
		Object.keys(colors).map((key, i) => {
			Object.values(colors).map((value, j) => {
				if (i === j) {
					if (value) {
						colorsJSON.push(colorsDefault[parseInt(key)])
						return
					}
				}
			})
		})
		setProduct((prev) => ({
			...prev,
			['colors']: Object.values(colorsJSON),
		}))
	}, [colors])
	useEffect(() => {
		let sizesJSON: Array<Database['public']['Sizes']> = []
		Object.keys(sizes).map((key, i) => {
			Object.values(sizes).map((value, j) => {
				if (i === j) {
					if (value) {
						sizesJSON.push(sizesDefault[parseInt(key)])
						return
					}
				}
			})
		})
		setProduct((prev) => ({
			...prev,
			['sizes']: Object.values(sizesJSON),
		}))
	}, [sizes])

	const handleSubmit = () => {
		supabase
			.from('products')
			.insert(product)
			.then((res) => {
				console.log('res: ', res)
				router.push(`/dashboard/posts`)
			})
	}

	return (
		<>
			<Head>
				<title>Thêm Bài viết - Affiliate Cuns</title>
				<SEO
					title="Bài viết - Affiliate Cuns"
					url="/dashboard/posts/add"
					image="/images/Cuns.jpg"
					description="Mua sắm trực tuyến tại Cuns - Cửa hàng bán hàng Affiliate với hàng ngàn sản phẩm chất lượng với giá cả hợp lý. Tìm kiếm các sản phẩm từ điện thoại, máy tính, thời trang, đồ gia dụng và nhiều hơn nữa tại Cuns. Đăng ký ngay để nhận được ưu đãi và khuyến mãi hấp dẫn!"
					keywords="Cuns, quần áo, đồ ăn, mỹ phẩm"
				/>
			</Head>
			<main>
				<div className="px-4 sm:px-8 md:px-12 lg:px-16 py-4 md:py-6">
					{/* add posts */}
					<div className="flex items-center gap-4">
						<div className="p-2 bg-green-400 rounded shadow-md shadow-green-300">
							<MdPostAdd size={20} color="white" />
						</div>
						<h2 className="text-2xl font-bold tracking-tight text-white">Add Posts</h2>
					</div>
					<div className="text-white mt-6 bg-black/25 p-4 shadow shadow-white rounded">
						<p className="font-bold">Tên posts</p>
						<TextareaAutosize
							name="name"
							defaultValue={product?.name}
							onChange={(e) => handleChangeProduct(e)}
							className="my-2 py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="Hộp Cơm Điện 2 Tầng Mocato M601"
						/>
						<p className="font-bold">Giá sản phẩm</p>
						<TextareaAutosize
							name="price"
							defaultValue={product?.price}
							onChange={(e) => handleChangeProduct(e)}
							className="my-2 py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="500.000đ - 1.000.000đ"
						/>
						<p className="font-bold">Link Affiliate</p>
						<TextareaAutosize
							name="affiliate"
							defaultValue={product?.affiliate}
							onChange={(e) => handleChangeProduct(e)}
							className="my-2 py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="https://shop.dimuadi.vn/product/435498?pub_id=7059272111390457856"
						/>
						<p className="font-bold">HÌnh đại diện</p>
						<TextareaAutosize
							name="thumbnails"
							defaultValue={product?.thumbnails}
							onChange={(e) => handleChangeProduct(e)}
							className="my-2 py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="https://shop.dimuadi.vn/product/435498?pub_id=7059272111390457856"
						/>
						<p className="font-bold">Hình ảnh</p>
						<TextareaAutosize
							name="images1"
							defaultValue=""
							onChange={(e) => handleChangeImages(e)}
							className="mt-2 py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="https://shop.dimuadi.vn/product/435498?pub_id=7059272111390457856"
						/>
						<TextareaAutosize
							name="images2"
							defaultValue=""
							onChange={(e) => handleChangeImages(e)}
							className="py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="https://shop.dimuadi.vn/product/435498?pub_id=7059272111390457856"
						/>
						<TextareaAutosize
							name="images3"
							defaultValue=""
							onChange={(e) => handleChangeImages(e)}
							className="py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="https://shop.dimuadi.vn/product/435498?pub_id=7059272111390457856"
						/>
						<TextareaAutosize
							name="images4"
							defaultValue=""
							onChange={(e) => handleChangeImages(e)}
							className="py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="https://shop.dimuadi.vn/product/435498?pub_id=7059272111390457856"
						/>

						<p className="font-bold">Mô tả</p>
						<TextareaAutosize
							name="description"
							defaultValue={product?.description}
							onChange={(e) => handleChangeProduct(e)}
							className="my-2 py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus id, ducimus est consectetur neque, eius unde nisi, voluptates cum obcaecati maiores ipsum aut praesentium maxime. Soluta eveniet at minus officia."
						/>

						<p className="font-bold">Highlights</p>
						<TextareaAutosize
							name="highlights1"
							defaultValue=""
							onChange={(e) => handleChangeHighlights(e)}
							className="mt-2 py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="Miễn phí cho đơn hàng trên 1 triệu"
						/>
						<TextareaAutosize
							name="highlights2"
							defaultValue=""
							onChange={(e) => handleChangeHighlights(e)}
							className="py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="Vận chuyển nội thành HN, SG: 25k"
						/>
						<TextareaAutosize
							name="highlights3"
							defaultValue=""
							onChange={(e) => handleChangeHighlights(e)}
							className="py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="Vận chuyển ngoại thành: 30k"
						/>
						<TextareaAutosize
							name="highlights4"
							defaultValue=""
							onChange={(e) => handleChangeHighlights(e)}
							className="py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="Vận chuyển liên tỉnh: 35k"
						/>

						<p className="font-bold">Chi tiết</p>
						<TextareaAutosize
							name="details"
							defaultValue={product?.details}
							onChange={(e) => handleChangeProduct(e)}
							className="my-2 py-2 font-normal tracking-tight focus:outline-0 resize-none w-full bg-transparent text-white focus:border-b focus:border-green-500"
							placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus id, ducimus est consectetur neque, eius unde nisi, voluptates cum obcaecati maiores ipsum aut praesentium maxime. Soluta eveniet at minus officia."
						/>

						<p className="font-bold">Màu sắc</p>
						<div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 py-4">
							{colorsDefault.map((e, i) => (
								<div key={i} className="w-full">
									<input
										type="checkbox"
										name={i.toString()}
										className="hidden peer"
										id={i.toString()}
										onChange={(e) => handleChangeColors(e)}
									/>
									<button
										className={`${e.class} peer-checked:outline w-full rounded transition duration-500 ease-in-out hover:scale-110`}
									>
										<label htmlFor={i.toString()}>
											<p className="px-2 py-1 cursor-pointer">{e.name}</p>
										</label>
									</button>
								</div>
							))}
						</div>

						<p className="font-bold">Kích cỡ</p>
						<div className="grid grid-cols-4 sm::grid-cols-8 gap-4 py-4">
							{sizesDefault.map((e, i) => (
								<div key={i}>
									<input
										type="checkbox"
										name={i.toString()}
										className="hidden peer"
										id={'size' + i.toString()}
										onChange={(e) => handleChangeSizes(e)}
									/>
									<button
										className={`peer-checked:outline w-full rounded transition duration-500 ease-in-out hover:scale-110 shadow shadow-white`}
									>
										<label htmlFor={'size' + i.toString()}>
											<p className="px-2 py-1 cursor-pointer">{e.name}</p>
										</label>
									</button>
								</div>
							))}
						</div>
					</div>
					<div className="flex items-center gap-4 my-2">
						<button
							onClick={handleSubmit}
							type="button"
							className="py-1 px-2 bg-green-400 rounded shadow-md shadow-green-300 flex items-center gap-2 cursor-pointer"
						>
							<MdPostAdd size={20} color="white" />
							<h2 className="text-lg font-bold tracking-tight text-white">Lưu</h2>
						</button>
					</div>
				</div>
			</main>
		</>
	)
}

export default Add
