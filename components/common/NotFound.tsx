import Image from 'next/image'
import React from 'react'
import { NOTFOUND_URL, BLUR_DATA_URL } from '@libs/constants'

function NotFound() {
	return (
		<div className='flex flex-col items-center gap-4 mt-10'>
			<Image src={NOTFOUND_URL} width={300} height={150} blurDataURL={BLUR_DATA_URL}
				placeholder='blur' />
			<span className='text-2xl font-bold text-center'>Oops... It's Empty</span></div>
	)
}

export default NotFound