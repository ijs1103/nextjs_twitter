import { useEffect, useCallback } from "react";
import useSWR, { mutate } from "swr";
import TweetBox from "@components/tweet/TweetBox";
import MobileLayout from "@components/layout/MobileLayout";
import useMutation from "hooks/useMutation";
import { TweetDetail, TweetWith } from "@libs/client/interfaces";
import TweetForm from "@components/tweet/TweetForm";
import InfiniteScrollList from "@components/common/InfiniteScrollList";
import { useSetRecoilState } from "recoil";
import { currentTweetIdState } from "@components/states";
import { ProfileResponse } from "@libs/client/interfaces";
import type { GetServerSidePropsContext } from "next";
import { withSsrSession } from "@libs/server/withSession";
import client from "@libs/client/db";
import Head from "next/head";
Head

interface ServerSideProps {
  tweetId: number
  tweet: TweetWith
  isLiked: boolean
  isMyTweet: boolean
  isRetweeted: boolean
}

function TweetDetail({ tweetId, tweet, isLiked, isMyTweet, isRetweeted }: ServerSideProps) {
  const { data: myInfo } = useSWR<ProfileResponse>("/api/users/me");
  const [toggleLike] = useMutation(`/api/tweets/${tweetId}/like`);
  const [toggleRetweet] = useMutation(`/api/tweets/${tweetId}/retweet`);
  const [editTweet, { data: editedData }] = useMutation(
    `/api/tweets/${tweetId}/update`
  );
  const onLikeClick = useCallback(() => {
    mutate(`/api/tweets/${tweetId}`, (prev: TweetDetail) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleLike({});
  }, [tweet]);
  const onRetweetClick = useCallback(() => {
    mutate(`/api/tweets/${tweetId}`, (prev: TweetDetail) => prev && { ...prev, isRetweeted: !prev.isRetweeted }, false);
    toggleRetweet({});
  }, [tweet]);
  const onEdit = useCallback((payload: string) => {
    editTweet({ payload });
    mutate(`/api/tweets/${tweetId}`, (prev: TweetDetail) => prev && { ...prev, tweet: { ...prev.tweet, payload } }, false);
  }, []);
  useEffect(() => {
    if (!editedData) return;
    if (editedData.ok) {
      alert("트윗이 정상적으로 수정되었습니다!");
    } else {
      alert(editedData.error);
    }
  }, [editedData]);
  const [createComment, { data: newComment }] = useMutation(`/api/comments/${tweetId}/new`);
  const setCurrentTweetId = useSetRecoilState(currentTweetIdState)
  useEffect(() => {
    setCurrentTweetId(tweetId);
  }, [])
  const onCreateComment = useCallback(({ ...payload }) => {
    createComment(payload);
  }, []);

  return (
    <>
      <Head>
        <title>{tweet.user.nickName}의 게시글</title>
        <meta name="description" content={tweet.payload} />
      </Head>
      <MobileLayout title={'Detail'}>
        <TweetBox
          key={tweet.id}
          id={tweet.id}
          userId={tweet.user.id}
          userName={tweet.user.name}
          nickName={tweet.user.nickName}
          image={tweet.user.image}
          payload={tweet.payload}
          updatedAt={tweet.updatedAt}
          isLiked={isLiked}
          isRetweeted={isRetweeted}
          onLikeClick={onLikeClick}
          onRetweetClick={onRetweetClick}
          onEdit={onEdit}
          isMyTweet={isMyTweet}
          photo={tweet.photo}
          isDetail
        />
        {/* 댓글 */}
        <TweetForm isCreatePage onCreateTweet={onCreateComment} image={myInfo?.profile.image} isComment />
        <InfiniteScrollList newData={newComment} dataType="comments" url={`/api/comments/${tweetId}`} isDetail isComment />
      </MobileLayout>
    </>
  );
}

export default TweetDetail;

export const getServerSideProps = withSsrSession(async function ({ query, req }: GetServerSidePropsContext) {
  const tweetId = query.id as string;
  const logginedId = req?.session.user?.id;
  const tweet = await client.tweet.findUnique({
    where: {
      id: +tweetId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          nickName: true,
          image: true,
        },
      },
      _count: {
        select: {
          like: true,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.like.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: logginedId,
      },
      select: {
        id: true,
      },
    })
  );
  // 게시물이 리트윗 당했는지 여부
  const isRetweeted = Boolean(
    await client.tweet.findFirst({
      where: {
        retweetId: tweet?.id,
        userId: logginedId,
      },
      select: {
        id: true,
      },
    })
  );
  const isMyTweet = logginedId === tweet?.userId;
  return {
    props: {
      tweetId,
      tweet: JSON.parse(JSON.stringify(tweet)),
      isLiked,
      isMyTweet,
      isRetweeted
    },
  };
});

