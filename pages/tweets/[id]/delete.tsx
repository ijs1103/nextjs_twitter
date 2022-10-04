import { useEffect } from "react";
import MobileLayout from "@components/MobileLayout";
import { useRouter } from "next/router";
import useMutation from "@libs/useMutation";
import Button from "@components/Button";
import { useRecoilValue } from "recoil";
import { currentTweetIdState, isCommentState, prevUrlState } from "@components/states";

function TweetDelete() {
  const isComment = useRecoilValue(isCommentState)
  const currentTweetId = useRecoilValue(currentTweetIdState)
  const prevUrl = useRecoilValue(prevUrlState)
  const router = useRouter();
  const [deleteTweet, { data, loading }] = useMutation(
    isComment ? `/api/comments/${router.query.id}/delete` : `/api/tweets/${router.query.id}/delete`,
    "DELETE"
  );
  const onDelete = () => {
    if (loading) return;
    deleteTweet({});
  };
  useEffect(() => {
    if (!data) return;
    if (data.ok) {
      alert("트윗이 정상적으로 삭제되었습니다");
      document.location.href = !isComment ? "/tweets" : prevUrl.includes("replies") ? prevUrl : `/tweets/${currentTweetId}`;
    } else {
      alert(data.error);
    }
  }, [data]);
  const onCancel = () => {
    router.back();
  };
  return (
    <MobileLayout>
      <div className="mt-[200px] flex flex-col items-center">
        <p className="mb-4 text-3xl text-gray-500">
          해당 {isComment ? '댓글' : '트윗'}을 정말 삭제하시겠습니까?
        </p>
        <div className="flex gap-3">
          <Button onClick={onDelete} isCancel>삭제</Button>
          <Button onClick={onCancel}>취소</Button>
        </div>
      </div>
    </MobileLayout>
  );
}

export default TweetDelete;
