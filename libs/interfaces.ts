import { Tweet, User, Like, Comment } from "@prisma/client";

interface TweetWith extends Tweet {
  _count: {
    like: number;
  };
  user: {
    id: number;
    name: string;
  };
}
interface LikeWith extends Like {
  tweet: Tweet,
  _count: {
    like: number;
  };
  user: {
    id: number;
    name: string;
  };
}
interface CommentWith extends Comment {
  user: {
    id: number;
    name: string;
  };
  tweet: {
    userId: number;
    user: {
      name: string;
    }
  }
}
export interface TweetsResponse {
  ok: boolean;
  tweets: TweetWith[];
  total: number;
}
export interface LikesResponse {
  ok: boolean;
  likes: LikeWith[];
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
export interface ProfileResponse {
  ok: boolean;
  profile: User;
}
export interface CommentsResponse {
  ok: boolean;
  comments: CommentWith[];
  total: number;
}