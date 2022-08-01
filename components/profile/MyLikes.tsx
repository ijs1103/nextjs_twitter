import { useRef, useEffect } from "react";
import { LikesResponse } from "@libs/interfaces";
import useSWRInfinite from "swr/infinite";
import { SWRInfiniteKeyLoader } from "swr/infinite";
import useIntersectionObserver from "@libs/useIntersectionObserver";
import Loader from "@components/Loader";
import TweetBox from "@components/TweetBox";
import NotFound from "@components/NotFound";
import { useRouter } from "next/router";
interface Props {
  isCurrent: boolean;
}

function MyLikes({ isCurrent }: Props) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref);
  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (!isCurrent || previousPageData && previousPageData?.results?.length === 0)
      return null;
    return `/api/profile/${router.query.id}/likes?offset=${
      pageIndex * 5
    }&limit=5`;
  };
  const { data, error, isValidating, setSize, mutate } =
    useSWRInfinite<LikesResponse>(getKey, {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    });
  console.log(data);  
  const likes = data?.map((item) => item.likes).flat() ?? [];
  const isEnd = likes.length === data?.[0]?.total;
  const isEmpty = data?.[0]?.likes?.length === 0;
  const isLoading = (!data && !error) || isValidating;
  
  useEffect(() => {
    if (isIntersecting && !isEnd && !isLoading) {
      setSize((oldSize) => oldSize + 1);
    }
  }, [isIntersecting]);
  return (
    <>
      {!isEmpty
        ? likes.map((like: any) => {
            return (
              <TweetBox
                key={like.tweet.id}
                id={like.tweet.id}
                userId={like.tweet.user.id}
                userName={like.tweet.user.name}
                payload={like.tweet.payload}
                updatedAt={like.tweet.updatedAt}
                likes={like.tweet._count.like}
                isMyTweet={like.tweet.isMyTweet}
              />
            );
          })
        : <NotFound />}
      <Loader ref={ref} isLoading={isLoading} />
    </>
  );
}

export default MyLikes;
