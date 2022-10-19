import React, { useCallback } from "react";
import TweetForm from "@components/tweet/TweetForm";
import MobileLayout from "@components/layout/MobileLayout";
import useMutation from "@libs/useMutation";
import { MutationResult, createTweetBody } from "@libs/interfaces";
import { useEffect } from "react";
import { ProfileResponse } from "@libs/interfaces";
import useSWR from "swr";

function createTweet() {
  const { data: myInfo } = useSWR<ProfileResponse>("/api/users/me");
  const [createTweet, { data, error }] =
    useMutation<MutationResult>("/api/tweets");
  useEffect(() => {
    if (data?.ok) {
      // router.push()로 보내주면 리렌더링이 되지 않아 새롭게 생성된 트윗이 보이지 않으므로,
      // 새롭게 생성된 트윗을 보기 위해 document.location.href를 사용하여 트윗 목록 페이지로 보내주었다
      document.location.href = "/tweets";
    }
    if (error) alert(error)
  }, [data]);
  const onCreateTweet = useCallback((data: createTweetBody) => createTweet(data), []);
  return (
    <MobileLayout title={'Write'}>
      <TweetForm isCreatePage onCreateTweet={onCreateTweet} image={myInfo?.profile.image} />
    </MobileLayout>
  );
}

export default createTweet;
