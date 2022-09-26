import { useEffect, useCallback } from "react";
import useSWR from "swr";
import TweetBox from "@components/TweetBox";
import MobileLayout from "@components/MobileLayout";
import useMutation from "@libs/useMutation";
import { TweetDetail } from "@libs/interfaces";
import MobileNav from "@components/MobileNav";
import TweetForm from "@components/TweetForm";
import InfiniteScrollList from "@components/InfiniteScrollList";
import { GetServerSideProps } from 'next'
import { useSetRecoilState } from "recoil";
import { currentTweetIdState } from "@components/states";

interface ServerSideProps {
  tweetId: number
}

function TweetDetail({ tweetId }: ServerSideProps) {
  const { data, mutate } = useSWR<TweetDetail>(
    `/api/tweets/${tweetId}`
  );
  const [toggleLike] = useMutation(`/api/tweets/${tweetId}/like`);
  const [editTweet, { data: editedData }] = useMutation(
    `/api/tweets/${tweetId}/update`
  );
  const onLikeClick = useCallback(() => {
    if (!data) return;
    mutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleLike({});
  }, [data]);
  const onEdit = useCallback((payload: string) => {
    editTweet({ payload });
  }, []);
  useEffect(() => {
    if (!editedData) return;
    if (editedData.ok) {
      alert("트윗이 정상적으로 수정되었습니다!");
      document.location.href = `/tweets/${tweetId}`;
    } else {
      alert(editedData.error);
    }
  }, [editedData]);
  const [createComment, { data: newComment }] = useMutation(`/api/comments/${tweetId}/new`);
  const setCurrentTweetId = useSetRecoilState(currentTweetIdState)
  setCurrentTweetId(tweetId);

  const onCreateComment = useCallback(({ ...payload }) => {
    createComment(payload);
  }, []);
  return (
    <MobileLayout>
      {data && (
        <TweetBox
          key={data.tweet.id}
          id={data.tweet.id}
          userId={data.tweet.user.id}
          userName={data.tweet.user.name}
          payload={data.tweet.payload}
          updatedAt={data.tweet.updatedAt}
          isLiked={data.isLiked}
          isDetail={true}
          onLikeClick={onLikeClick}
          onEdit={onEdit}
          isMyTweet={data.isMyTweet}
        />
      )}
      {/* 댓글 */}
      <TweetForm isCreatePage={true} onCreateTweet={onCreateComment} />
      <InfiniteScrollList isUpdated={!!newComment} dataType="comments" url={`/api/comments/${tweetId}`} isDetail={true} isComment={true} />
      <MobileNav />
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

