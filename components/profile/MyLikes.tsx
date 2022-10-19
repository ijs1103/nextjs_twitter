import InfiniteScrollList from "@components/common/InfiniteScrollList";
import { useRouter } from "next/router";

function MyLikes() {
  const router = useRouter();
  return (
    <InfiniteScrollList dataType="likes" url={`/api/profile/${router.query.id}/myLikes`} />
  );
}

export default MyLikes;
