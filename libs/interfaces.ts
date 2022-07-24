import { Tweet } from "@prisma/client";

interface TweetWith extends Tweet {
  _count: {
    like: number;
  };
  user: {
    id: number;
    name: string;
  };
}
export interface TweetsResponse {
  ok: boolean;
  tweets: TweetWith[];
  total: number;
}
export interface MutationResult {
  ok: boolean;
  tweet: Tweet;
}
export interface TweetDetail {
  ok: boolean;
  tweet: TweetWith;
  isLiked: boolean;
  isMyTweet: boolean;
}
