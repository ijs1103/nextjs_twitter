import {useRef, useEffect} from 'react'
import { TweetsResponse } from "@libs/interfaces"
import useSWRInfinite from "swr/infinite";
import { SWRInfiniteKeyLoader } from "swr/infinite";
import useIntersectionObserver from "@libs/useIntersectionObserver";
import Loader from "@components/Loader";
import TweetBox from "@components/TweetBox";
import { useRouter } from 'next/router';

function MyTweets() {
  const router = useRouter()
	const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref);
	const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData?.results?.length === 0)
      return null;
    return `/api/profile/${router.query.id}/tweets?offset=${pageIndex * 5}&limit=5`;
  };
  const { data, error, isValidating, setSize, mutate } =
    useSWRInfinite<TweetsResponse>(getKey, {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    });
		const tweets = data?.map((item) => item.tweets).flat() ?? [];
		const isEnd = tweets.length === data?.[0]?.total;
		const isEmpty = data?.[0]?.tweets?.length === 0;
		const isLoading = (!data && !error) || isValidating;
	
		useEffect(() => {
			if (isIntersecting && !isEnd && !isLoading) {
				setSize((oldSize) => oldSize + 1);
			}
		}, [isIntersecting]);
	return (
		<>
			{!isEmpty ? tweets.map((tweet: any) => {
            return (
              <TweetBox
                key={tweet.id}
                id={tweet.id}
                userId={tweet.user.id}
                userName={tweet.user.name}
                payload={tweet.payload}
                updatedAt={tweet.updatedAt}
                likes={tweet._count.like}
                isMyTweet={tweet.isMyTweet}
              />
            );
      }) : null }
			<Loader ref={ref} isLoading={isLoading} />
		</>
	)
}

export default MyTweets