import { useRef, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { SWRInfiniteKeyLoader } from "swr/infinite";
import useIntersectionObserver from "@libs/useIntersectionObserver";
import Loader from "@components/Loader";
import TweetBox from "@components/TweetBox";
import NotFound from "@components/NotFound";
import useSWR from "swr";
import { ProfileResponse, MutationResult } from "@libs/interfaces";

interface Props {
  url: string;
  newData?: MutationResult;
  isDetail?: boolean;
  isComment?: boolean;
  dataType?: 'tweets' | 'likes' | 'comments'
}

function InfiniteScrollList({ url, newData, isDetail = false, isComment = false, dataType }: Props) {
  const { data: myInfo } = useSWR<ProfileResponse>(isDetail ? "/api/users/me" : null);
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref);
  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData?.results?.length === 0)
      return null;
    return `${url}?offset=${pageIndex * 5
      }&limit=5`;
  };
  const { data, error, isValidating, setSize, mutate } =
    useSWRInfinite<any>(getKey, {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    });
  useEffect(() => {
    mutate()
  }, [newData])
  console.log(data)
  const items = data?.map((item) => {
    return dataType === 'tweets' ? item.tweets : dataType === 'likes' ? item.likes : item.comments
  }).flat() ?? [];
  const isEmpty = dataType === 'tweets' ? data?.[0]?.tweets?.length === 0 : dataType === 'likes' ? data?.[0]?.likes?.length === 0 : data?.[0]?.comments?.length === 0
  const isEnd = items.length === data?.[0]?.total;
  const isLoading = (!data && !error) || isValidating;

  useEffect(() => {
    if (isIntersecting && !isEnd && !isLoading) {
      setSize((oldSize) => oldSize + 1);
    }
  }, [isIntersecting]);
  return (
    <>
      {!isEmpty
        ? items.map((item: any) => {

          return (
            dataType !== 'likes' ?
              <TweetBox
                key={item.id}
                id={item.id}
                userId={item.user.id}
                userName={item.user.name}
                nickName={item.user.nickName}
                payload={item.payload}
                updatedAt={item.updatedAt}
                likeCnt={item._count?.like}
                commentCnt={item._count?.comments}
                isMyTweet={item.isMyTweet ?? item?.user?.id === myInfo?.profile?.id}
                isDetail={isDetail}
                isComment={isComment}
              />
              :
              <TweetBox
                key={item.tweet.id}
                id={item.tweet.id}
                userId={item.tweet.user.id}
                userName={item.tweet.user.name}
                nickName={item.tweet.user.nickName}
                payload={item.tweet.payload}
                updatedAt={item.tweet.updatedAt}
                likeCnt={item.tweet._count?.like}
                commentCnt={item.tweet._count?.comments}
                isMyTweet={item.tweet.isMyTweet}
                isDetail={isDetail}
                isComment={isComment}
              />
          );
        })
        : <NotFound />}
      <Loader ref={ref} isLoading={isLoading} />
    </>
  );

}

export default InfiniteScrollList