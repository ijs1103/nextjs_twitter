import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProfileResponse } from "@libs/interfaces";
import useSWR from "swr";
import { USE_USER_URL } from "./constants";

export default function useUser() {
  const { data, error, isValidating } = useSWR<ProfileResponse>(USE_USER_URL);
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/");
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: (!data && !error) || isValidating };
}
