import React from 'react'

function MobileNav() {
	return (
		<div className='sm:hidden fixed left-0 bottom-0 w-full py-1 flex items-center justify-around bg-black text-white border-t border-gray-600'>
			<a href="#" className='transition-all duration-500 px-2 py-2 rounded-full hover:bg-blue-800 hover:text-blue-300'>
				<svg className="h-6 w-6 " stroke="currentColor" fill="none" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
						d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6" />
				</svg>
			</a>
			<a href="#" className='transition-all duration-500 px-2 py-2 rounded-full hover:bg-blue-800 hover:text-blue-300'>
				<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clipRule="evenodd" /></svg>
			</a>
			<a href="#" className='transition-all duration-500 px-2 py-2 rounded-full hover:bg-blue-800 hover:text-blue-300'>
				<svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
					stroke="currentColor" viewBox="0 0 24 24">
					<path
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
					</path>
				</svg>
			</a>
			<a href="#" className='transition-all duration-500 px-2 py-2 rounded-full hover:bg-blue-800 hover:text-blue-300'>
				<svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
					stroke="currentColor" viewBox="0 0 24 24">
					<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
					</path>
				</svg>
			</a>

		</div>
	)
}

export default MobileNav