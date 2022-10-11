import React from "react";
import TweetForm from "@components/TweetForm";
import MobileLayout from "@components/MobileLayout";
import useMutation from "@libs/useMutation";
import { MutationResult } from "@libs/interfaces";
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

  return (
    <MobileLayout title={'Write'}>
      <TweetForm isCreatePage={true} onCreateTweet={createTweet} image={myInfo?.profile.image} />
    </MobileLayout>
  );
}

export default createTweet;
