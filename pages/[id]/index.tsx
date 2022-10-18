import { useEffect, useMemo, useState, useCallback } from "react";
import MobileLayout from "@components/MobileLayout";
import { UserWith } from "@libs/interfaces";
import Button from "@components/Button";
import MyTweets from "@components/profile/MyTweets";
import TabMenu from "@components/profile/TabMenu";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { prevUrlState } from "@components/states";
import useMutation from "@libs/useMutation";
import type { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { withSsrSession } from "@libs/withSession";
import client from "@libs/db";
import Avatar from "@components/Avatar";
import { editedAvatarState } from "@components/states";
import FloatingButton from "@components/FloatingButton";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "pages/api/auth/[...nextauth]";
import dynamic from 'next/dynamic'

interface ServerSideProps {
  userId: number;
  logginedId: number;
  profile: UserWith;
  followers_cnt: number;
  followings_cnt: number;
}
const Profile = (props: ServerSideProps) => {
  const ProfileModal = dynamic(() => import('../../components/profile/ProfileModal'))
  const MyLikes = dynamic(() => import('../../components/profile/MyLikes'))
  const MyReplies = dynamic(() => import('../../components/profile/MyReplies'))
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
  const handleFollow = useCallback(() => {
    follow({ id: userId })
    setIsFollowing(true)
  }, [userId]);
  const handleUnFollow = useCallback(() => {
    unFollow({ id: userId })
    setIsFollowing(false)
  }, [userId]);
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
  const handleEditProfile = useCallback(() => {
    setIsModalOn(true);
  }, []);
  // editedimage:방금 변경한 프로필 이미지 url
  const editedAvatar = useRecoilValue(editedAvatarState)
  return (
    <MobileLayout title={'Profile'}>
      <div className="relative">
        <div className="h-48 bg-white"></div>
        <div className="absolute w-24 h-24 -translate-y-1/2 bg-gray-500 rounded-full top-1/2 left-4">
          <Avatar url={editedAvatar ? editedAvatar : profile.image} isBig />
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
        {isTabReplies && <MyReplies />}
        {isTabLikes && <MyLikes />}
      </div>

      {isMyProfile && isModalOn &&
        <ProfileModal avatarUrl={profile.image} nickName={profile.nickName || ''} onClose={() => setIsModalOn(false)} />
      }
      <FloatingButton />
    </MobileLayout>
  );
}
export default Profile;

export const getServerSideProps = withSsrSession(async function ({ query, req, res }: GetServerSidePropsContext) {
  const userId = query.id as string
  // nextAuthSession: 소셜 로그인 완료시 생성되는 session 
  const nextAuthSession = await unstable_getServerSession(req, res, authOptions)
  let profile, followers_cnt, followings_cnt, logginedId;
  // 소셜 로그인 했을때 
  if (nextAuthSession) {
    const logginedUser = await client.user.findUnique({
      where: { email: nextAuthSession.user?.email + '' },
      select: {
        id: true
      }
    });
    logginedId = logginedUser?.id
    profile = await client.user.findUnique({
      where: { id: +userId },
      include: {
        followers: {
          select: {
            id: true
          }
        },
      },
    });
    followers_cnt = await client.user.count({
      where: {
        following: {
          some: {
            id: profile?.id
          }
        }
      }
    })
    followings_cnt = await client.user.count({
      where: {
        followers: {
          some: {
            id: profile?.id
          }
        }
      }
    })
  } else {
    // 일반 로그인 했을때
    profile = await client.user.findUnique({
      where: { id: +userId },
      include: {
        followers: {
          select: {
            id: true
          }
        },
      },
    });
    logginedId = req?.session.user?.id
    // 서버의 비용을 최소화하는 count 메서드
    followers_cnt = await client.user.count({
      where: {
        following: {
          some: {
            id: +userId
          }
        }
      }
    })
    followings_cnt = await client.user.count({
      where: {
        followers: {
          some: {
            id: +userId
          }
        }
      }
    })
  }
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
