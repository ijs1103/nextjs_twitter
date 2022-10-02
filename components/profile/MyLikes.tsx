import InfiniteScrollList from "@components/InfiniteScrollList";
import { useRouter } from "next/router";

function MyLikes() {
  const router = useRouter();
  return (
    <InfiniteScrollList dataType="likes" url={`/api/profile/${router.query.id}/myLikes`} />
  );
}

export default MyLikes;
