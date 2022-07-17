import { useCallback } from 'react'
import useSWR from 'swr';
import { Tweet } from "@prisma/client";
import { useRouter } from "next/router";
import { TweetsResponse } from './index';
import TweetBox from '@components/TweetBox';
import TweetForm from '@components/TweetForm';
import useMutation from "@libs/useMutation";

import MobileNav from '@components/MobileNav';
import Header from '@components/Header';

interface TweetWith extends Tweet {
	_count: {
    like: number;
  };
	user: {
		id: number;
		name: string;
	},
}
interface TweetDetail{
	ok: boolean;
	tweet: TweetWith;
	isLiked: boolean;
}
function TweetDetail() {
	const router = useRouter();
	const { data, mutate } = useSWR<TweetDetail>(router.query.id ? `/api/tweets/${router.query.id}` : null);
	const [ toggleLike ] = useMutation(`/api/tweets/${router.query.id}/like`);
	const onLikeClick = useCallback(() => {
		if (!data) return
		mutate(prev => prev && {...prev, isLiked: !prev.isLiked}, false);
		toggleLike({});
	}, [data]);
	return (
		<div className='min-h-screen max-w-xl mx-auto bg-black'>
			<Header />
			{ data && <TweetBox 
				key={data.tweet.id} 
				id={data.tweet.id} 
				userId={data.tweet.user.id} 
				userName={data.tweet.user.name} 
				payload={data.tweet.payload} 
				updatedAt={data.tweet.updatedAt}
				likes={data.tweet._count.like}
				isLiked={data.isLiked} 
				isDetail={true} 
				onLikeClick={onLikeClick} /> }
			<MobileNav />
		</div>
	)
}

export default TweetDetail