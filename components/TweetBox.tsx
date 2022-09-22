import { useEffect, useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Popup from "@components/Popup";
import { useRouter } from "next/router";
import { cls, parsedUpdatedAt } from "@libs/utils";
import Button from "./Button";
import useMutation from "@libs/useMutation";
import { useSetRecoilState } from "recoil";
import { isCommentState } from "./states";

interface Props {
  userId: number;
  userName: string;
  id: number;
  payload: string;
  updatedAt: Date;
  likes: number | null;
  isDetail?: boolean;
  isComment?: boolean;
  isLiked?: boolean;
  onLikeClick?: () => void;
  onEdit?: (payload: string) => void;
  isMyTweet: boolean;
}

function TweetBox({
  userId,
  userName,
  id,
  payload,
  updatedAt,
  likes,
  isDetail = false,
  isComment = false,
  isLiked,
  onLikeClick,
  onEdit,
  isMyTweet,
}: Props) {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [popupOn, setPopupOn] = useState(false);
  const popupOpen = () => setPopupOn(true);
  const popupClose = useCallback(() => setPopupOn(false), []);
  const { register, handleSubmit, setValue } = useForm<{ payload: string }>({
    mode: "onChange",
  });
  const [editComment] = useMutation(
    `/api/comments/${id}/update`
  );
  const handleEdit = useCallback(() => {
    setEditMode(true);
    popupClose();
    setValue("payload", payload);
  }, []);
  const handleDelete = useCallback(() => {
    router.push(`/tweets/${id}/delete`);
  }, []);
  const onEditComment = useCallback((payload: string) => {
    editComment({ payload });
  }, []);
  const onValid = (form: { payload: string }) => {
    isComment ? onEditComment(form.payload) : onEdit && onEdit(form.payload);
    setEditMode(false);
    document.location.href = location.pathname;
  };
  const setIsComment = useSetRecoilState(isCommentState)
  useEffect(() => {
    setIsComment(isComment)
  }, [isComment])
  const tweetPopup = [
    {
      title: "삭제하기",
      onClickFn: handleDelete,
      disabled: !isMyTweet,
    },
    { title: "수정하기", onClickFn: handleEdit, disabled: !isMyTweet },
  ];
  return (
    <Link href={`/tweets/${id}`}>
      <a onClick={e => isDetail && e.preventDefault()}>
        <div
          className={cls(
            "border-b border-gray-700 '' ",
            isDetail ? "" : "hover:bg-slate-900"
          )}
        >
          <div className="relative flex flex-shrink-0 p-4 pb-0">
            <div className="flex-shrink-0 block group">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block w-10 h-10 rounded-full"
                    src="http://placeimg.com/640/480/any"
                    alt="profile"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium leading-6 sm:text-base ''">
                    {userName}
                    <span className="text-xs font-medium leading-5 text-gray-400 transition duration-150 ease-in-out sm:text-sm group-hover:text-gray-300">
                      @nickname{" "}
                      {!isDetail && `· ${parsedUpdatedAt(isDetail, updatedAt)}`}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {isDetail && (
              <>
                <div
                  className={cls(
                    "p-1 rounded-full hover:bg-slate-500 cursor-pointer top-1/2 right-2 ",
                    editMode ? "hidden" : "absolute"
                  )}
                  onClick={popupOpen}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </div>
                <div className="absolute top-0 right-0">
                  <Popup
                    onPopupClose={popupClose}
                    isVisible={popupOn}
                    contents={tweetPopup}
                  />
                </div>
              </>
            )}
          </div>

          <div className="pl-16">
            {!editMode ? (
              <p className="pr-4 text-base font-medium '' flex-shrink">
                {payload}
              </p>
            ) : (
              <div className="pr-8 sm:pr-4">
                <textarea
                  {...register("payload")}
                  rows={2}
                  className="p-2.5 whitespace-pre-wrap break-words w-full text-sm '' bg-gray-900 rounded-lg border border-gray-500 outline-none focus:ring-black focus:border-black"
                ></textarea>
                <div className="flex justify-between">
                  <Button
                    name="취소"
                    onClick={() => setEditMode(false)}
                    isCancel
                  />
                  <Button name="수정" onClick={handleSubmit(onValid)} />
                </div>{" "}
              </div>
            )}

            {isDetail && (
              <p className="my-4 text-xs font-medium leading-5 text-gray-400 sm:text-sm">
                {parsedUpdatedAt(isDetail, updatedAt)}
              </p>
            )}
          </div>

          <div
            className={cls(
              "flex ",
              !isDetail ? "pl-16" : "pl-0 border-t border-gray-700"
            )}
          >
            <div className="flex items-center justify-around w-full lg:justify-start">
              <div className="text-center lg:flex-1">
                <div className={cls("w-12 mt-1 group flex items-center px-3 py-2 text-base leading-6 font-medium rounded-full hover:text-blue-300 ", isDetail ? 'hover:bg-blue-800' : '')}>
                  <svg
                    className="w-6 h-6 text-center"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
              </div>

              <div className="text-center lg:flex-1">
                <div className={cls("w-12 mt-1 group flex items-center px-3 py-2 text-base leading-6 font-medium rounded-full hover:text-blue-300 ", isDetail ? 'hover:bg-blue-800' : '')}>
                  <svg
                    className="w-6 text-center h-7"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                  </svg>
                </div>
              </div>

              <div
                onClick={onLikeClick}
                className="flex items-center text-center lg:flex-1"
              >
                <div className={cls("w-12 mt-1 group flex items-center px-3 py-2 text-base leading-6 font-medium rounded-full hover:text-blue-300 ", isDetail ? 'hover:bg-blue-800' : '')}>
                  <svg
                    className={cls(
                      "text-center h-7 w-6 ",
                      isLiked || !isDetail && likes && likes > 0 ? "text-red-600" : "''"
                    )}
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                {!isDetail && <span className="mt-1 text-xs">{likes}</span>}
              </div>

              <div className="text-center lg:flex-1">
                <div className={cls("w-12 mt-1 group flex items-center px-3 py-2 text-base leading-6 font-medium rounded-full hover:text-blue-300 ", isDetail ? 'hover:bg-blue-800' : '')}>
                  <svg
                    className="w-6 text-center h-7"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
export default memo(TweetBox);
