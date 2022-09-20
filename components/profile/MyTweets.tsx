import InfiniteScrollList from "@components/InfiniteScrollList";

import { useRouter } from "next/router";
interface Props {
  isCurrent: boolean;
}
function MyTweets({ isCurrent }: Props) {
  const router = useRouter();
  return (
    <InfiniteScrollList dataType="tweets" url={`/api/profile/${router.query.id}/myTweets`} isCurrent={isCurrent} />
  );
}

export default MyTweets;

