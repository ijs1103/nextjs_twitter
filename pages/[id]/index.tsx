import { useEffect } from "react";
import MobileLayout from "@components/MobileLayout";
import { ProfileResponse } from "@libs/interfaces";
import { withRouter, NextRouter } from "next/router";
import Button from "@components/Button";
import Likes from "@components/profile/MyLikes";
import Replies from "@components/profile/MyReplies";
import useSWR from "swr";
import MyTweets from "@components/profile/MyTweets";
import TabMenu from "@components/profile/TabMenu";
import { useSetRecoilState } from "recoil";
import { prevUrlState } from "@components/states";

interface WithRouterProps {
  router: NextRouter;
}

function profile({ router }: WithRouterProps) {
  const { data, error } = useSWR<ProfileResponse>(
    `/api/profile/${router.query?.id}`
  );
  const isFollowing = true;
  const toggleFollow = () => { };
  const {
    query: { tab },
  } = router;
  const isTabTweets = !tab;
  const isTabReplies = tab === "replies";
  const isTabLikes = tab === "likes";
  const setPrevUrl = useSetRecoilState(prevUrlState)
  useEffect(() => {
    if (!router.isReady) return;
    setPrevUrl(router.asPath);
  }, [router.isReady])
  return (
    <MobileLayout>
      <>
        <div className="relative">
          <div className="h-48 bg-white"></div>
          <div className="absolute w-24 h-24 -translate-y-1/2 bg-gray-500 rounded-full top-1/2 left-4"></div>
          <div className="relative h-48 px-4">
            <div className="flex justify-end gap-2 mt-4">
              <div className="p-1 text-gray-300 border-2 border-gray-500 rounded-full cursor-pointer">
                <svg
                  className="w-8 h-8"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              {isFollowing ? <Button onClick={toggleFollow} isFollowing>Following</Button> : <Button onClick={toggleFollow}>Follow</Button>}
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <div className="">
                <span className="text-2xl font-bold">{data?.profile.name}</span>
                <span className="block text-gray-500">@nickname</span>
              </div>
              <div className="flex gap-3 text-sm">
                <span className="text-gray-500">
                  <strong className="text-white">0</strong> Following
                </span>
                <span className="text-gray-500">
                  <strong className="text-white">103.2k</strong> Followers
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm border-b border-gray-700">
          <ul className="flex text-gray-500">
            <TabMenu url={`/${router.query?.id}`} isCurrent={isTabTweets}>
              Tweets
            </TabMenu>
            <TabMenu
              url={`/${router.query?.id}?tab=replies`}
              isCurrent={isTabReplies}
            >
              Replies
            </TabMenu>
            <TabMenu
              url={`/${router.query?.id}?tab=likes`}
              isCurrent={isTabLikes}
            >
              Likes
            </TabMenu>
          </ul>
        </div>
        <div className="min-h-[50vh]">
          {isTabTweets && <MyTweets />}
          {isTabReplies && <Replies />}
          {isTabLikes && <Likes />}
        </div>
      </>
    </MobileLayout>
  );
}

export default withRouter(profile);
