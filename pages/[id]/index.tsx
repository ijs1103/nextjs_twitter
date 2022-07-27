import React from 'react'
import { cls } from '@libs/utils'
import MobileLayout from "@components/MobileLayout";
import { ProfileResponse } from "@libs/interfaces"
import { withRouter, NextRouter } from 'next/router';
import Button from '@components/Button';
import Likes from '@components/profile/Likes';
import Replies from '@components/profile/Replies';
import useSWR from 'swr';
import Link from 'next/link';
import MyTweets from '@components/profile/MyTweets';

interface WithRouterProps {
	router: NextRouter
}

function profile({ router }: WithRouterProps) {
	const { data, error } = useSWR<ProfileResponse>(`/api/profile/${router.query?.id}`)
	const toggleFollow = () => {

	}
	const { query: { tab } } = router
	const isTabTweets = !tab
	const isTabReplies = tab === 'replies'
	const isTabLikes = tab === 'likes'
	return (
		<MobileLayout>
			<>
				<div className='relative'>
					<div className='bg-white h-48'></div>
					<div className='absolute -translate-y-1/2 top-1/2 left-4 bg-gray-500 rounded-full w-24 h-24'></div>
					<div className='relative h-48 px-4'>
							<div className='mt-4 flex justify-end gap-2'>
								<div className='cursor-pointer rounded-full p-1 border-gray-500 border-2 text-gray-300'>
									<svg className="w-8 h-8" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
								</div>
								<Button name='follow' onClick={toggleFollow} />
							</div>
							<div className='mt-4 flex flex-col gap-3'>
								<div className=''>
									<span className='font-bold text-2xl'>{data?.profile.name}</span>
									<span className='text-gray-500 block'>@nickname</span>
								</div>
								<div className='flex gap-3 text-sm'>
									<span className='text-gray-500'><strong className='text-white'>0</strong> Following</span>
									<span className='text-gray-500'><strong className='text-white'>103.2k</strong> Followers</span>
								</div>
							</div>
					</div>
				</div>
				<div className='border-b border-gray-700 text-sm'>
								<ul className='flex text-gray-500'>
									<Link href={`/${router.query?.id}`}>
										<a className='transition duration-300 py-3 text-center flex-1 hover:bg-gray-800'>
											<li><span className={cls('py-3 border-b-4 ', !tab ? 'border-blue-500' : 'border-transparent')}>Tweets</span></li>
										</a>
									</Link>
									<Link href={{ pathname: `/${router.query?.id}`, query: { tab: "replies" } }}>
										<a className='transition duration-300 py-3 text-center flex-1 hover:bg-gray-800'>
											<li><span className={cls('py-3 border-b-4 ', isTabReplies ? 'border-blue-500' : 'border-transparent')}>Replies</span></li>
										</a>
									</Link>
									<Link href={{ pathname: `/${router.query?.id}`, query: { tab: "likes" } }}>
										<a className='transition duration-300 py-3 text-center flex-1 hover:bg-gray-800'>
											<li><span className={cls('py-3 border-b-4 ', isTabLikes ? 'border-blue-500' : 'border-transparent' )}>Likes</span></li>
										</a>
									</Link>
								</ul>
				</div>
				<div>
					{isTabTweets && <MyTweets />}
					{isTabReplies && <Replies />}
					{isTabLikes && <Likes />}
				</div>
			</>
    </MobileLayout>
	)
}

export default withRouter(profile)