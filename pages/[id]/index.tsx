import React from "react";
import MobileLayout from "@components/MobileLayout";
import { ProfileResponse } from "@libs/interfaces";
import { withRouter, NextRouter } from "next/router";
import Button from "@components/Button";
import Likes from "@components/profile/MyLikes";
import Replies from "@components/profile/MyReplies";
import useSWR from "swr";
import MyTweets from "@components/profile/MyTweets";
import TabMenu from "@components/profile/TabMenu";

interface WithRouterProps {
  router: NextRouter;
}

function profile({ router }: WithRouterProps) {
  const { data, error } = useSWR<ProfileResponse>(
    `/api/profile/${router.query?.id}`
  );
  const toggleFollow = () => {};
  const {
    query: { tab },
  } = router;
  const isTabTweets = !tab;
  const isTabReplies = tab === "replies";
  const isTabLikes = tab === "likes";
  return (
    <MobileLayout>
      <>
        <div className="relative">
          <div className="bg-white h-48"></div>
          <div className="absolute -translate-y-1/2 top-1/2 left-4 bg-gray-500 rounded-full w-24 h-24"></div>
          <div className="relative h-48 px-4">
            <div className="mt-4 flex justify-end gap-2">
              <div className="cursor-pointer rounded-full p-1 border-gray-500 border-2 text-gray-300">
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
              <Button name="follow" onClick={toggleFollow} />
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <div className="">
                <span className="font-bold text-2xl">{data?.profile.name}</span>
                <span className="text-gray-500 block">@nickname</span>
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
        <div className="border-b border-gray-700 text-sm">
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
          {isTabTweets && <MyTweets isCurrent={isTabTweets} />}
          {isTabReplies && <Replies isCurrent={isTabReplies} />}
          {isTabLikes && <Likes isCurrent={isTabLikes} />}
        </div>
      </>
    </MobileLayout>
  );
}

export default withRouter(profile);
