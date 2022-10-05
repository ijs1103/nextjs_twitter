import { useEffect, useMemo, useState } from "react";
import MobileLayout from "@components/MobileLayout";
import { UserWith } from "@libs/interfaces";
import Button from "@components/Button";
import Likes from "@components/profile/MyLikes";
import Replies from "@components/profile/MyReplies";
import MyTweets from "@components/profile/MyTweets";
import TabMenu from "@components/profile/TabMenu";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { prevUrlState } from "@components/states";
import useMutation from "@libs/useMutation";
import type { NextPageContext } from "next";
import { useRouter } from "next/router";
import { withSsrSession } from "@libs/withSession";
import client from "@libs/db";
import ProfileModal from "@components/profile/ProfileModal";
import Avatar from "@components/Avatar";
import { editedAvatarState } from "@components/states";

interface ServerSideProps {
  userId: number;
  logginedId: number;
  profile: UserWith;
  followers_cnt: number;
  followings_cnt: number;
}
const Profile = (props: ServerSideProps) => {
  const { userId, logginedId, profile, followers_cnt, followings_cnt } = props
  const router = useRouter();
  const isMyProfile = logginedId === userId
  const [follow] = useMutation('/api/users/follow')
  const [unFollow] = useMutation('/api/users/unFollow')
  const computedIsFollowing = useMemo(() => {
    // 프로필이 내 프로필인 경우 얼리 리턴
    if (isMyProfile) return false
    return Boolean(profile.followers.find(cur => cur.id === logginedId))
  }, [profile])
  const [isFollowing, setIsFollowing] = useState(computedIsFollowing)
  const handleFollow = () => {
    follow({ id: userId })
    setIsFollowing(true)
  }
  const handleUnFollow = () => {
    unFollow({ id: userId })
    setIsFollowing(false)
  }
  const { query: { tab } } = router;
  const isTabTweets = !tab;
  const isTabReplies = tab === "replies";
  const isTabLikes = tab === "likes";
  const setPrevUrl = useSetRecoilState(prevUrlState)
  useEffect(() => {
    // 현재 선택한 탭이 'Tweets'(내가 작성한 트윗목록)일 경우 뒤로가기 경로를 홈으로 , 'Replies'나 'Likes'일 경우 뒤로가기 경로를 프로필 페이지로 설정
    setPrevUrl(isTabTweets ? '/tweets' : `/${userId}`);
  }, [tab])
  const [isModalOn, setIsModalOn] = useState(false)
  const handleEditProfile = () => {
    setIsModalOn(true);
  }
  // editedAvatar: 방금 변경한 프로필 이미지 url
  const editedAvatar = useRecoilValue(editedAvatarState)
  return (
    <MobileLayout>
      <div className="relative">
        <div className="h-48 bg-white"></div>
        <div className="absolute w-24 h-24 -translate-y-1/2 bg-gray-500 rounded-full top-1/2 left-4">
          <Avatar url={editedAvatar ? editedAvatar : profile.avatar} isBig />
        </div>
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
            {isMyProfile ? <Button onClick={handleEditProfile}>Edit Profile</Button> : isFollowing ? <Button onClick={handleUnFollow} isFollowing>UnFollow</Button> : <Button onClick={handleFollow}>Follow</Button>}
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <div className="">
              <span className="text-2xl font-bold">{profile.nickName}</span>
              <span className="block text-gray-500">@{profile.name}</span>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-gray-500">
                <strong className="text-white">{followings_cnt}</strong> Following
              </span>
              <span className="text-gray-500">
                <strong className="text-white">{followers_cnt}</strong> Followers
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm border-b border-gray-700">
        <ul className="flex text-gray-500">
          <TabMenu url={`/${userId}`} isCurrent={isTabTweets}>
            Tweets
          </TabMenu>
          <TabMenu
            url={`/${userId}?tab=replies`}
            isCurrent={isTabReplies}
          >
            Replies
          </TabMenu>
          <TabMenu
            url={`/${userId}?tab=likes`}
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
      {isMyProfile && isModalOn && <ProfileModal avatarUrl={profile.avatar} nickName={profile.nickName} onClose={() => setIsModalOn(false)} />}
    </MobileLayout>
  );
}
export default Profile;

export const getServerSideProps = withSsrSession(async function ({ query, req }: NextPageContext) {
  const userId = query.id as string
  const logginedId = req?.session.user?.id
  const profile = await client.user.findUnique({
    where: { id: +userId },
    include: {
      followers: {
        select: {
          id: true
        }
      },
    },
  });
  // 서버의 비용을 최소화하는 count 메서드
  const followers_cnt = await client.user.count({
    where: {
      following: {
        some: {
          id: +userId
        }
      }
    }
  })
  const followings_cnt = await client.user.count({
    where: {
      followers: {
        some: {
          id: +userId
        }
      }
    }
  })
  return {
    props: {
      userId: +userId,
      logginedId,
      profile: JSON.parse(JSON.stringify(profile)),
      followers_cnt,
      followings_cnt
    }
  };
});
