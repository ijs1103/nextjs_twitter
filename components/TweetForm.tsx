import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { cls } from "@libs/utils";
import Avatar from "@components/Avatar";
import { AnimatePresence } from 'framer-motion';
import TweetPhoto from "./TweetPhoto";
import axios from "axios";
import { BUCKET_URL } from "@libs/constants";
import EmojiPicker from "./EmojiPicker";

interface TweetForm {
  payload: string;
  file?: FileList;
}
interface Props {
  isCreatePage?: boolean;
  onCreateTweet: (data: any) => void;
  image: string | null | undefined;
  isComment?: boolean;
}
function TweetForm({ isCreatePage = false, onCreateTweet, image, isComment = false }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
    getValues,
    setValue
  } = useForm<TweetForm>({ mode: "onChange" });
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [emojiOn, setEmojiOn] = useState(false);
  const fileWatch = watch('file');
  useEffect(() => {
    let blobUrl = ''
    if (fileWatch?.length) {
      const file = fileWatch[0]
      setUploadFile(file)
      blobUrl = URL.createObjectURL(file)
      setPreviewUrl(blobUrl)
    }
    return () => {
      URL.revokeObjectURL(blobUrl)
    }
  }, [fileWatch]);
  const onValid = async (form: TweetForm) => {
    let newTweetPhoto = ''
    if (uploadFile) {
      const { data: { url, objectName } } = await axios.post('/api/tweets/uploadPhoto', { name: uploadFile.name, type: uploadFile.type })
      await axios.put(url, uploadFile, {
        headers: {
          'Content-type': uploadFile.type,
          'Access-Control-Allow-Origin': '*',
        },
      })
      newTweetPhoto = BUCKET_URL + objectName
    }
    onCreateTweet({ ...(newTweetPhoto && { photo: newTweetPhoto }), payload: form.payload })
    reset();
    setPreviewUrl('');
  };
  const handleResizeHeight = useCallback((event: any) => {
    if (event === null || event.target === null) return;
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  }, []);
  const setEmojiToInput = (emoji: string) => {
    const newPayload = getValues("payload") + emoji;
    setValue("payload", newPayload);
    setEmojiOn(false);
  }
  return (
    <>
      <form
        className={cls("sm:block ", isCreatePage ? "block" : "hidden")}
        onSubmit={handleSubmit(onValid)}
      >
        <div className="flex">
          <div className="flex-shrink-0 w-10 py-1 m-2">
            <Avatar url={image} />
          </div>
          <div className="flex-1 px-2 pt-2 mt-2">
            <textarea
              {...register("payload", {
                required: true,
                onChange: (e) => handleResizeHeight(e),
              })}
              rows={2}
              className="p-2.5 whitespace-pre-wrap break-words w-full text-sm bg-gray-900 rounded-lg border border-gray-500 outline-none focus:ring-black focus:border-black"
              placeholder="What's happening?"
            ></textarea>
          </div>
        </div>
        <AnimatePresence>
          {previewUrl ? <TweetPhoto url={previewUrl} /> : null}
        </AnimatePresence>
        <div className={cls("flex items-center border-b border-gray-700 ", isComment ? "justify-end" : "justify-between")}>
          {!isComment && <div className="w-64 px-2">
            <div className="flex items-center">
              <div className="flex-1 px-1 py-1 text-center">

                <label className="flex items-center justify-center px-1 py-1 mt-1 text-base font-medium leading-6 text-blue-400 rounded-full cursor-pointer group md:px-2 md:py-2 hover:bg-blue-800 hover:text-blue-300"
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
                  <input
                    {...register('file')}
                    type='file'
                    accept='image/*'
                    className='hidden'
                  />
                </label>
              </div>
              <div className="flex-1 py-2 m-2 text-center">
                <span
                  onClick={() => setEmojiOn(true)}
                  className="flex items-center justify-center px-2 py-2 mt-1 text-base font-medium leading-6 text-blue-400 rounded-full cursor-pointer group hover:bg-blue-800 hover:text-blue-300"
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
                </span>
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
            </div>
          </div>}

          <button
            disabled={!isValid}
            type="submit"
            className="px-2 py-2 mt-2 mb-4 mr-4 font-bold transition-colors bg-blue-400 rounded-full cursor-pointer hover:bg-blue-600 sm:px-8"
          >
            {isComment ? 'Comment' : 'Tweet'}
          </button>
        </div>
      </form>
      {emojiOn && <EmojiPicker setter={setEmojiToInput} onClose={() => setEmojiOn(false)} />}
    </>
  );
}

export default TweetForm;
