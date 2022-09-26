import InfiniteScrollList from "@components/InfiniteScrollList";
import { useRouter } from "next/router";

function Replies() {
  const router = useRouter();
  return (
    <InfiniteScrollList dataType="comments" url={`/api/profile/${router.query.id}/replies`} />
  );
}

export default Replies;
