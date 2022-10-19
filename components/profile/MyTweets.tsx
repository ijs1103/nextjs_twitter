import InfiniteScrollList from "@components/common/InfiniteScrollList";
import { useRouter } from "next/router";

function MyTweets() {
  const router = useRouter();
  return (
    <InfiniteScrollList dataType="tweets" url={`/api/profile/${router.query.id}/myTweets`} />
  );
}

export default MyTweets;

