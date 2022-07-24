import { useForm } from "react-hook-form";
import { useEffect, useCallback } from "react";
import { cls } from "@libs/utils";

interface textareaForm {
  payload: string;
}
interface TweetFormProps {
  isCreatePage?: boolean;
  onCreateTweet: (data: any) => void;
}
function TweetForm({ isCreatePage = false, onCreateTweet }: TweetFormProps) {
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
  useEffect(() => {}, [isCreatePage]);

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
        <div className="flex-shrink-0 m-2 w-10 py-1">
          <img
            className="inline-block h-10 w-10 rounded-full"
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
            className="p-2.5 whitespace-pre-wrap break-words w-full text-sm text-white bg-gray-900 rounded-lg border border-gray-500 outline-none focus:ring-black focus:border-black"
            placeholder="What's happening?"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-between border-b border-gray-700">
        <div className="w-64 px-2">
          <div className="flex items-center">
            <div className="flex-1 text-center px-1 py-1">
              <a
                href="#"
                className="mt-1 group flex justify-center items-center text-blue-400 px-1 py-1 md:px-2 md:py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-7 w-6"
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

            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
                className="mt-1 group flex justify-center items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-7 w-6"
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

            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
                className="mt-1 group flex justify-center items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-7 w-6"
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

            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
                className="mt-1 group flex justify-center items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-7 w-6"
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
            className="bg-blue-400 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-2 sm:px-8 rounded-full mr-4"
          >
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
}

export default TweetForm;
