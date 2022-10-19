import Image from 'next/image'
import { cls } from '@libs/utils'
import { BLUR_DATA_URL } from '@libs/constants'

interface Props {
	url: string | null | undefined,
	isBig?: boolean
}

function Avatar({ url, isBig = false }: Props) {
	return (
		url ?
			<div className={cls('overflow-hidden relative rounded-full bg-slate-500 ', isBig ? 'w-24 h-24' : 'w-10 h-10')}>
				<Image
					src={url}
					className='object-cover'
					alt='avatar-image'
					layout='fill'
					blurDataURL={BLUR_DATA_URL}
					placeholder='blur'
					priority={isBig ? true : false}
				/>
			</div> :
			<div className={cls('cursor-pointer flex items-center justify-center p-1 rounded-full bg-gray-500 ', isBig ? 'w-24 h-24' : 'w-10 h-10')}>
			</div>

	)
}

export default Avatar