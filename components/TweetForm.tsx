import { useForm } from "react-hook-form";
import { useEffect, useCallback } from "react";
import { cls } from "@libs/utils";

interface textareaForm {
  payload: string;
}
interface Props {
  isCreatePage?: boolean;
  onCreateTweet: (data: any) => void;
}
function TweetForm({ isCreatePage = false, onCreateTweet }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<textareaForm>({ mode: "onChange" });
  const onValid = (form: textareaForm) => {
    onCreateTweet(form);
    reset({ payload: "" });
  };
  useEffect(() => { }, [isCreatePage]);

  const handleResizeHeight = useCallback((event: any) => {
    if (!isCreatePage) return;
    if (event === null || event.target === null) {
      return;
    }
    event.target.style.height = "38px";
    event.target.style.height = event.target.scrollHeight + "px";
  }, []);
  return (
    <form
      className={cls("sm:block ", isCreatePage ? "block" : "hidden")}
      onSubmit={handleSubmit(onValid)}
    >
      <div className="flex">
        <div className="flex-shrink-0 w-10 py-1 m-2">
          <img
            className="inline-block w-10 h-10 rounded-full"
            src="http://placeimg.com/40/40/any"
            alt="profile"
          />
        </div>
        <div className="flex-1 px-2 pt-2 mt-2">
          <textarea
            {...register("payload", {
              required: true,
              onChange: (e) => handleResizeHeight(e),
            })}
            rows={2}
            className="p-2.5 whitespace-pre-wrap break-words w-full text-sm '' bg-gray-900 rounded-lg border border-gray-500 outline-none focus:ring-black focus:border-black"
            placeholder="What's happening?"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-between border-b border-gray-700">
        <div className="w-64 px-2">
          <div className="flex items-center">
            <div className="flex-1 px-1 py-1 text-center">
              <a
                href="#"
                className="flex items-center justify-center px-1 py-1 mt-1 text-base font-medium leading-6 text-blue-400 rounded-full group md:px-2 md:py-2 hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="w-6 text-center h-7"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>

            <div className="flex-1 py-2 m-2 text-center">
              <a
                href="#"
                className="flex items-center justify-center px-2 py-2 mt-1 text-base font-medium leading-6 text-blue-400 rounded-full group hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="w-6 text-center h-7"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </div>

            <div className="flex-1 py-2 m-2 text-center">
              <a
                href="#"
                className="flex items-center justify-center px-2 py-2 mt-1 text-base font-medium leading-6 text-blue-400 rounded-full group hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="w-6 text-center h-7"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>

            <div className="flex-1 py-2 m-2 text-center">
              <a
                href="#"
                className="flex items-center justify-center px-2 py-2 mt-1 text-base font-medium leading-6 text-blue-400 rounded-full group hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="w-6 text-center h-7"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div>
          <button
            disabled={!isValid}
            type="submit"
            className="mt-5 bg-blue-400 hover:bg-blue-600 '' font-bold py-2 px-2 sm:px-8 rounded-full mr-4"
          >
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
}

export default TweetForm;
