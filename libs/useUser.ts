import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProfileResponse } from "@libs/interfaces"
import useSWR from "swr";

export default function useUser() {
  const { data, error, isValidating } =
    useSWR<ProfileResponse>("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/");
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: (!data && !error) || isValidating };
}
