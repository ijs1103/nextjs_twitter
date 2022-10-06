import Image from 'next/image'
import React from 'react'


function NotFound() {
	return (
		<div className='flex flex-col items-center gap-4 mt-10'>
			<Image src={"https://abs.twimg.com/sticky/illustrations/empty-states/rubber-chicken-400x200.v1.png"} width={300} height={150} />
			<span className='text-2xl font-bold text-center'>Oops... It's Empty</span></div>
	)
}

export default NotFound