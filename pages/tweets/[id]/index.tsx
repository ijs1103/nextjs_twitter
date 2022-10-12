import { useEffect, useCallback } from "react";
import useSWR from "swr";
import TweetBox from "@components/TweetBox";
import MobileLayout from "@components/MobileLayout";
import useMutation from "@libs/useMutation";
import { TweetDetail } from "@libs/interfaces";
import TweetForm from "@components/TweetForm";
import InfiniteScrollList from "@components/InfiniteScrollList";
import { GetServerSideProps } from 'next'
import { useSetRecoilState } from "recoil";
import { currentTweetIdState } from "@components/states";
import { ProfileResponse } from "@libs/interfaces";

interface ServerSideProps {
  tweetId: number
}

function TweetDetail({ tweetId }: ServerSideProps) {
  const { data: myInfo } = useSWR<ProfileResponse>("/api/users/me");
  const { data, mutate } = useSWR<TweetDetail>(
    `/api/tweets/${tweetId}`
  );
  const [toggleLike] = useMutation(`/api/tweets/${tweetId}/like`);
  const [toggleRetweet] = useMutation(`/api/tweets/${tweetId}/retweet`);
  const [editTweet, { data: editedData }] = useMutation(
    `/api/tweets/${tweetId}/update`
  );
  const onLikeClick = useCallback(() => {
    if (!data) return;
    mutate(prev => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleLike({});
  }, [data]);
  const onRetweetClick = useCallback(() => {
    if (!data) return;
    mutate(prev => prev && { ...prev, isRetweeted: !prev.isRetweeted }, false);
    toggleRetweet({});
  }, [data]);
  const onEdit = useCallback((payload: string) => {
    editTweet({ payload });
    mutate(prev => prev && { ...prev, tweet: { ...prev.tweet, payload } }, false);
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
    <MobileLayout title={'Detail'}>
      {data && (
        <TweetBox
          key={data.tweet.id}
          id={data.tweet.id}
          userId={data.tweet.user.id}
          userName={data.tweet.user.name}
          nickName={data.tweet.user.nickName}
          image={data.tweet.user.image}
          payload={data.tweet.payload}
          updatedAt={data.tweet.updatedAt}
          isLiked={data.isLiked}
          isRetweeted={data.isRetweeted}
          onLikeClick={onLikeClick}
          onRetweetClick={onRetweetClick}
          onEdit={onEdit}
          isMyTweet={data.isMyTweet}
          photo={data.tweet.photo}
          isDetail
        />
      )}
      {/* 댓글 */}
      <TweetForm isCreatePage onCreateTweet={onCreateComment} image={myInfo?.profile.image} isComment />
      <InfiniteScrollList newData={newComment} dataType="comments" url={`/api/comments/${tweetId}`} isDetail isComment />
    </MobileLayout>
  );
}

export default TweetDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query: { id } } = context;
  return {
    props: {
      tweetId: id,
    },
  };
};

