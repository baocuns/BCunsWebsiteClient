/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SEO, TypingEffect } from '../../src/components'
import Head from 'next/head'

type Props = {
	img: string
	content: string | any
}

const contents = [
	'Anh biết ơn ngày em đã đến cuộc đời anh. Em đã khiến thế giới của anh trở nên tốt đẹp hơn. Cảm ơn em luôn bên anh. Chúc vợ yêu 8/3 vui vẻ.',
	'Anh thật may mắn khi có em bên cạnh, đồng hành cùng anh trong chuyến đi cuộc đời. Cảm ơn em thật nhiều. Chúc mừng ngày Quốc tế Phụ nữ!',
	'Nhân ngày 8/3, xin chúc vợ yêu của anh luôn xinh đẹp, vui vẻ. Cảm ơn em đã luôn bên cạnh anh. Yêu em nhiều!',
	`Làm vợ đã không dễ, việc nuôi con và quán xuyến công việc, nhà cửa cũng không hề dễ dàng chút nào nhưng em đều làm rất tốt. Cảm ơn em nhiều lắm. Happy Women's Day.`,
	'Chúc em một ngày thật tươi vui và hạnh phúc hơn những ngày khác. Ở bên em 365 ngày đều là những ngày thật ngọt ngào với anh. Mãi mãi yêu em.',
	`Em không chỉ là người vợ, người mẹ của các con anh mà còn là người bạn đồng hành với anh suốt cuộc đời này. Chúng ta hãy cùng vun đắp để có mái ấm gia đình hạnh phúc nhé. Happy Women's Day vợ yêu!`,
	'Cảm ơn vì sự cảm thông, nhường nhịn, yêu thương, quan tâm, động lực và cảm hứng em đã truyền cho anh. Cảm ơn em đã chăm sóc gia đình của chúng ta. Chúc mừng ngày 8/3 vợ yêu.',
	'Cảm ơn em vì em đã trở thành người vợ tuyệt vời. Chúc em ngày 8/3 hạnh phúc, vui vẻ và thành công trong mọi công việc.',
	'Cảm ơn em vì em đã cho anh biết thế nào là yêu, thế nào là mái ấm gia đình, thế nào là trách nhiệm. Ngày 8/3 - ngày của em, anh chúc vợ yêu một ngày tràn ngập hạnh phúc, 364 ngày còn lại trong năm vui vẻ.',
	`Anh chỉ muốn em biết rằng, anh đặc biệt và may mắn như thế nào, anh thấy mình được ban phước với người phụ nữ luôn yêu thương, chăm sóc và tuyệt vời như em. Happy Women's Day!`,
	'Ngày đặc biệt này, em hãy tận hưởng, nghỉ ngơi, shopping, làm những điều mà em muốn bởi hôm nay là ngày của em. Chúc em có ngày 8/3 tuyệt vời và đáng nhớ.',
	`Không có lời nào đủ để diễn tả cảm xúc của anh dành cho em lúc này. Càng ngày anh càng yêu em hơn. Mọi khoảnh khắc bên em đều giống như giấc mơ. Anh yêu em vô cùng! Happy Women's Day!`,
	'Ngày Quốc tế Phụ nữ 8/3 là ngày thật đặc biệt của cả vợ và chồng. Vì anh được thêm ngày yêu thương chăm sóc em. Cảm ơn em đã luôn bên cạnh anh và con những lúc khó khăn nhất. Anh chúc vợ yêu luôn xinh đẹp và mạnh khỏe để anh được tận hưởng giây phút ngọt ngào và hạnh phúc khi được bên em.',
	`Hôm nay là ngày đặc biệt không chỉ đối với em mà còn cả đối với anh - Ngày mà anh có thể nói Anh cảm ơn em và nói lời yêu thương đối với em thật nhiều. Happy Women's Day!`,
	'Chúc vợ yêu của anh có một ngày Quốc tế Phụ nữ 8/3 thật vui vẻ. Hôm nay em chỉ cần nghỉ ngơi hoặc đi chơi, đi mua sắm thôi, việc nấu ăn, rửa chén, dọn dẹp nhà cửa, chăm con cứ để chồng lo.',
	'Vợ xinh đẹp của anh, hoa hồng hay món quà nhỏ anh tặng em cũng khó để nói hết tình yêu anh dành cho em. Ngày 8/3, chúc em mọi may mắn và niềm vui trong cuộc sống. Yêu em!',
	'Nụ cười chính là đường cong đẹp nhất trên cơ thể người phụ nữ. Đối với anh vợ mãi là người phụ nữ đẹp nhất. Chúc em ngày 8/3 vui vẻ.',
	`Một người phụ nữ quyến rũ là người không bao giờ chạy theo số đông. Cô ấy luôn là chính mình. Và vợ anh chính là người phụ nữ như thế. Happy Women's Day!`,
	`Tất cả ngôn từ trên thế giới này đều không thể diễn tả hết những gì chúng ta đã trải qua cùng nhau. Tất cả những gì anh muốn nói, là luôn luôn yêu em như bây giờ cho đến mãi về sau. Anh yêu em! Happy Women's Day!`,
	'Mọi điều nhỏ bé em làm đều có ý nghĩa rất lớn đối với anh. Cảm ơn em và chúc em ngày 8-3 hạnh phúc!',
]

const Emm = (props: Props) => {
	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
	const [data, setData] = useState<Props>()
	const [open, setOpen] = useState(false)

	const handleClickPicture = (e: any, i: number) => {
		setOpen(!open)
		setData({
			img: window.getComputedStyle(e).backgroundImage.slice(5, -2),
			content: contents[i],
		})
	}

	return (
		<>
			<Head>
				<title>Chúc mừng ngày Phụ nữ Việt Nam 8/3 - Người phụ nữ tuyệt vời của tôi! | BCuns</title>
				<SEO
					title="Chúc mừng ngày Phụ nữ Việt Nam 8/3 - Người phụ nữ tuyệt vời của tôi! | BCuns"
					url="{props.url}"
					image="/images/BC.png"
					description="Trong ngày Phụ nữ Việt Nam 8/3 này, tôi muốn gửi đến bạn những lời chúc tốt đẹp nhất. Bạn là một người phụ nữ đáng yêu, thông minh, và có tấm lòng rộng lớn. Cám ơn bạn vì luôn là người đồng hành của tôi trong mọi khoảnh khắc."
					keywords="Trong ngày Phụ nữ Việt Nam 8/3 này, tôi muốn gửi đến bạn những lời chúc tốt đẹp nhất. Bạn là một người phụ nữ đáng yêu, thông minh, và có tấm lòng rộng lớn. Cám ơn bạn vì luôn là người đồng hành của tôi trong mọi khoảnh khắc."
				/>
			</Head>
			<main>
				<div className="emm">
					<div className="assembly absolute">
						{arr.map((e, i) => (
							<div
								key={i}
								className="cube absolute"
								onClick={(e) => handleClickPicture(e.target, i)}
							>
								<div className="cube__face absolute"></div>
								<div className="cube__face absolute"></div>
								<div className="cube__face absolute"></div>
								<div className="cube__face absolute"></div>
								<div className="cube__face absolute"></div>
								<div className="cube__face absolute"></div>
							</div>
						))}
					</div>
				</div>

				{/* modals */}
				<Transition.Root show={open} as={Fragment}>
					<Dialog as="div" className="relative z-30" onClose={setOpen}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
						</Transition.Child>

						<div className="fixed inset-0 z-10 overflow-y-auto">
							<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
									enterTo="opacity-100 translate-y-0 sm:scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 translate-y-0 sm:scale-100"
									leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								>
									<Dialog.Panel className="relative transform overflow-hidden rounded bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
										<div className="bg-white px-2 pt-3 pb-2 sm:p-4 sm:pb-4">
											<div className="sm:flex sm:items-start">
												<div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
													<Dialog.Title
														as="h3"
														className="text-base font-semibold leading-6 text-gray-900 pb-2"
													>
														Gửi Emm iu :33
													</Dialog.Title>
													<div>
														<img src={data?.img} alt="" className="rounded shadow" />
													</div>
												</div>
											</div>
										</div>
										<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
											<p className="font-light italic">
												<TypingEffect text={data?.content} delay={30} />
											</p>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition.Root>
			</main>
		</>
	)
}

export default Emm
