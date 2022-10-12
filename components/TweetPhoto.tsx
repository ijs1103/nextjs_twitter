import Image from 'next/image';
import { motion } from 'framer-motion';
import { BLUR_DATA_URL } from '@libs/constants'

interface Props {
	url: string;
}

function TweetPhoto({ url }: Props) {
	return (
		<motion.div
			className='relative my-4 mx-auto overflow-hidden rounded-lg cursor-pointer w-48 h-36 sm:w-[360px] sm:h-[240px]'
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0, opacity: 1 }}
		>
			<Image
				className='object-cover'
				src={url}
				alt={url}
				layout='fill'
				blurDataURL={BLUR_DATA_URL}
				placeholder='blur'
			/>
		</motion.div>
	)
}

export default TweetPhoto