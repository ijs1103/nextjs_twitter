import InfiniteScrollList from "@components/InfiniteScrollList";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { prevUrlState } from "@components/states";
import { useEffect } from "react";

function Replies() {
  const router = useRouter();
  const setPrevUrl = useSetRecoilState(prevUrlState)
  useEffect(() => {
    if (!router.isReady) return;
    setPrevUrl(router.asPath);
  }, [router.isReady]);
  return (
    <InfiniteScrollList dataType="comments" url={`/api/profile/${router.query.id}/myReplies`} isDetail={true} isComment={true} />
  );
}

export default Replies;
