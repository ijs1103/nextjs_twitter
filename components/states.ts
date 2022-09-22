import { atom, selector } from "recoil";

export const isCommentState = atom({
  key: "isComment",
  default: false,
});
export const currentTweetIdState = atom({
  key: "currentTweetId",
  default: 0,
});
export const prevUrlState = atom({
  key: "prevUrl",
  default: "",
});
