import InfiniteScrollList from "@components/common/InfiniteScrollList";
import { useRouter } from "next/router";

function Replies() {
  const router = useRouter();
  return (
    <InfiniteScrollList dataType="comments" url={`/api/profile/${router.query.id}/myReplies`} isDetail={true} isComment={true} />
  );
}

export default Replies;
