import InfiniteScrollList from "@components/InfiniteScrollList";
import { useRouter } from "next/router";

interface Props {
  isCurrent: boolean;
}

function MyLikes({ isCurrent }: Props) {
  const router = useRouter();
  return (
    <InfiniteScrollList dataType="likes" url={`/api/profile/${router.query.id}/likes`} isCurrent={isCurrent} />
  );
}

export default MyLikes;
