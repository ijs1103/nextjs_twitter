import { useEffect, useCallback } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import TweetBox from "@components/TweetBox";
import MobileLayout from "@components/MobileLayout";
import useMutation from "@libs/useMutation";
import { TweetDetail } from "@libs/interfaces";
import MobileNav from "@components/MobileNav";
import TweetForm from "@components/TweetForm";
import InfiniteScrollList from "@components/InfiniteScrollList";

function TweetDetail() {
  const router = useRouter();
  const { data, mutate } = useSWR<TweetDetail>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [toggleLike] = useMutation(`/api/tweets/${router.query.id}/like`);
  const [editTweet, { data: editedData }] = useMutation(
    `/api/tweets/${router.query.id || data?.tweet.id}/update`
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
      document.location.href = `/tweets/${router.query.id || data?.tweet.id}`;
    } else {
      alert(editedData.error);
    }
  }, [editedData]);
  const [createComment, { data: newComment }] = useMutation(`/api/comments/${router.query.id || data?.tweet.id}/new`);


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
          likes={data.tweet._count.like}
          isLiked={data.isLiked}
          isDetail={true}
          onLikeClick={onLikeClick}
          onEdit={onEdit}
          isMyTweet={data.isMyTweet}
        />
      )}
      {/* 댓글 */}
      <TweetForm isCreatePage={true} onCreateTweet={onCreateComment} />
      <InfiniteScrollList isUpdated={!!newComment} dataType="comments" url={`/api/comments/${router.query.id || data?.tweet.id}`} isDetail={true} />
      <MobileNav />
    </MobileLayout>
  );
}

export default TweetDetail;
