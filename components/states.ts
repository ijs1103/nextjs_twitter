import { atom } from "recoil";
const isCommentState = atom({
  key: "isComment",
  default: false,
});
const currentTweetIdState = atom({
  key: "currentTweetId",
  default: 0,
});
const prevUrlState = atom({
  key: "prevUrl",
  default: "/tweets",
});
const editedAvatarState = atom({
  key: "editedAvatar",
  default: "",
});
const localStorage = typeof window !== "undefined" ? window.localStorage : null;
const isSocialLogginedState = atom({
  key: "isSocialLoggined",
  default: !!localStorage?.getItem("isSocialLoggined"),
});

export {
  isCommentState,
  currentTweetIdState,
  prevUrlState,
  editedAvatarState,
  isSocialLogginedState,
};
