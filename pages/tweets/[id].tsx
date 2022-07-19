import { useCallback } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import TweetBox from "@components/TweetBox";
import MobileLayout from "@components/MobileLayout";
import useMutation from "@libs/useMutation";
import { TweetDetail } from "@libs/interfaces";
import MobileNav from "@components/MobileNav";
import Header from "@components/Header";

function TweetDetail() {
  const router = useRouter();
  const { data, mutate } = useSWR<TweetDetail>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [toggleLike] = useMutation(`/api/tweets/${router.query.id}/like`);
  const onLikeClick = useCallback(() => {
    if (!data) return;
    mutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleLike({});
  }, [data]);
  return (
    <MobileLayout>
      <Header />
      {data && (
        <TweetBox
          key={data.tweet.id}
          id={data.tweet.id}
          userId={data.tweet.user.id}
          userName={data.tweet.user.name}
          payload={data.tweet.payload}
          updatedAt={data.tweet.updatedAt}
          likes={data.tweet._count.like}
          isLiked={data.isLiked}
          isDetail={true}
          onLikeClick={onLikeClick}
        />
      )}
      <MobileNav />
    </MobileLayout>
  );
}

export default TweetDetail;
