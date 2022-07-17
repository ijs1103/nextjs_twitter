import React from 'react'
import Link from "next/link";
import { cls, parsedUpdatedAt } from '@libs/utils';

interface Iprops {
	userId: number;
	userName: string;
	id: number;
	payload: string;
	updatedAt: Date;
	likes: number;
	isDetail?: boolean;
	isLiked?: boolean;
	onLikeClick?: () => void;
}

export default function TweetBox({ userId, userName, id, payload, updatedAt, likes, isDetail=false, isLiked, onLikeClick }: Iprops) {
	return (
		<Link href={`/tweets/${id}`}>
			<div className='border-b border-gray-700 text-white'>
				<div className="relative flex flex-shrink-0 p-4 pb-0">
					<a href="#" className="flex-shrink-0 group block">
						<div className="flex items-center">
							<div>
								<img className="inline-block h-10 w-10 rounded-full"
									src="http://placeimg.com/640/480/any" alt="profile" />
							</div>
							<div className="ml-3">
								<p className="text-sm sm:text-base leading-6 font-medium text-white">
									{ userName }
									<span
										className="text-xs sm:text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
										@nickname  { !isDetail && `· ${parsedUpdatedAt(isDetail, updatedAt)}` }
									</span>
								</p>
							</div>
						</div>
					</a>
					<svg className="rounded-full hover:bg-slate-500 cursor-pointer top-1/2  right-4 absolute w-5" viewBox="0 0 24 24"
						aria-hidden="true" fill="#fff">
						<g>
							<circle cx="5" cy="12" r="2"></circle>
							<circle cx="12" cy="12" r="2"></circle>
							<circle cx="19" cy="12" r="2"></circle>
						</g>
					</svg>
				</div>
				<div className="pl-16">
					<p className="text-base width-auto font-medium text-white flex-shrink">
						{payload}	
					</p>
					<p className='text-xs sm:text-sm leading-5 font-medium text-gray-400 my-4'>{ isDetail && parsedUpdatedAt(isDetail, updatedAt)}</p> 
				</div>
				<div className={cls("flex w-full ", !isDetail ? "pl-16" : "pl-0 border-t border-gray-700")}>
						<div className="w-full">
							<div className="flex items-center">
								<div className="flex-1 text-center">
									<div
										className="w-12 mt-1 group flex items-center px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
										<svg className="text-center h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round"
											strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
											<path
												d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
											</path>
										</svg>
									</div>
								</div>

								<div className="flex-1 text-center py-2 m-2">
									<div
										className="w-12 mt-1 group flex items-center px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
										<svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round"
											strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
											<path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
										</svg>
									</div>
								</div>

								<div onClick={onLikeClick} className="flex-1 flex items-center text-center py-2 m-2">
									<div
										className="w-12 mt-1 flex items-center px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
										<svg className={cls("text-center h-7 w-6 ", isLiked ? 'text-red-600' : 'text-white')} fill={isLiked ? 'red' : 'none'} strokeLinecap="round" strokeLinejoin="round"
											strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
											<path
												d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
											</path>
										</svg>
									</div>
									{!isDetail && <span className='text-xs mt-1'>{likes}</span>}
								</div>

								<div className="flex-1 text-center py-2 m-2">
									<div 
										className="w-12 mt-1 group flex items-center px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
										<svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round"
											strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
											<path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
										</svg>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
		</Link>
	)
}

