import type { NextPage } from "next";
import useUser from "@libs/useUser";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect } from "react";
import TweetForm from "@components/TweetForm";
import MobileNav from "@components/MobileNav";
import Header from "@components/Header";
import useMutation from "@libs/useMutation";
import { cls } from "@libs/utils";
import Popup from "@components/Popup";
import { MutationResult } from "@libs/interfaces";
import Link from "next/link";
import InfiniteScrollList from "@components/InfiniteScrollList";

const Home: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [popupOn, setPopupOn] = useState(false);
  const popupToggle = useCallback(() => setPopupOn((prev) => !prev), []);
  /* 트위터 생성 관련 */
  const [createTweet, { loading, data: mutateData, error: mutateError }] =
    useMutation<MutationResult>("/api/tweets");
  /* 로그아웃 관련 */
  const [logout, { data: logoutData, error: logoutError }] = useMutation<{
    ok: boolean;
  }>("/api/users/log-out");
  useEffect(() => {
    logoutData?.ok && router.replace("/");
  }, [logoutData]);
  const profilePopup = [
    {
      title: "프로필 보기",
      onClickFn: () => router.push(`/${user?.id}`),
      disabled: false,
    },
    { title: "로그아웃", onClickFn: () => logout({}), disabled: false },
  ];
  const onMobileCreate = () => {
    router.push("/tweets/new");
  };
  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* left */}
        <section className="z-10 hidden sm:block top-0 left-0 fixed h-full w-[80px] lg:w-[300px] py-4">
          <svg
            viewBox="0 0 24 24"
            className="mx-auto h-10 w-10 ''"
            fill="currentColor"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>

          <nav className="mt-5 px-2 space-y-1">
            <a
              href="#"
              className="group flex justify-center lg:justify-start items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="lg:mr-4 h-6 w-6 "
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
                />
              </svg>
              <span className="hidden lg:block">Home</span>
            </a>
            <a
              href="#"
              className="group flex justify-center lg:justify-start items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="lg:mr-4 h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
              </svg>
              <span className="hidden lg:block">Explore</span>
            </a>
            <a
              href="#"
              className="mt-1 group flex justify-center lg:justify-start items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="lg:mr-4 h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span className="hidden lg:block">Notifications</span>
            </a>
            <a
              href="#"
              className="mt-1 group flex justify-center lg:justify-start items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="lg:mr-4 h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span className="hidden lg:block">Messages</span>
            </a>
            <a
              href="#"
              className="mt-1 group flex justify-center lg:justify-start items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="lg:mr-4 h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
              <span className="hidden lg:block">Bookmarks</span>
            </a>
            <a
              href="#"
              className="mt-1 group flex justify-center lg:justify-start items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="lg:mr-4 h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <span className="hidden lg:block">Lists</span>
            </a>
            <a
              href="#"
              className="mt-1 group flex justify-center lg:justify-start items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="lg:mr-4 h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span className="hidden lg:block">Profiles</span>
            </a>
            <a
              href="#"
              className="mt-1 group flex justify-center lg:justify-start items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="lg:mr-4 h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="hidden lg:block">More</span>
            </a>
            <div className="flex justify-center">
              <Link href="/tweets/new">
                <a className="text-center bg-blue-400 lg:w-48 mt-5 hover:bg-blue-600 '' font-bold py-2 px-2 lg:px-4 rounded-full">
                  <span className="hidden lg:block">Tweet</span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="#fff"
                    className="w-4 h-4 block lg:hidden"
                  >
                    <g>
                      <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
                    </g>
                  </svg>
                </a>
              </Link>
            </div>
          </nav>

          <div
            onClick={popupToggle}
            className="absolute bottom-0 right-0 left-0  mx-2  mb-5 "
          >
            <div className="p-2 rounded-full hover:bg-blue-400 group block">
              <div className="flex justify-center lg:justify-start items-center">
                <div className="flex-shrink-0">
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="http://placeimg.com/640/480/any"
                    alt="profile"
                  />
                </div>
                <div className="hidden lg:block lg:ml-3">
                  <p className="text-sm leading-6 font-medium ''">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                    @nickname
                  </p>
                </div>
                <svg
                  className="ml-3 hidden lg:block w-6"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="#fff"
                >
                  <g>
                    <circle cx="5" cy="12" r="2"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                    <circle cx="19" cy="12" r="2"></circle>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div
            className={cls(
              "absolute bottom-[110px] left-0 lg:left-1/2  lg:-translate-x-1/2 z-[1000]"
            )}
          >
            <Popup
              onPopupClose={popupToggle}
              isVisible={popupOn}
              contents={profilePopup}
            />
          </div>
        </section>
        {/* center */}
        <section className="sm:ml-[80px] lg:ml-[300px] w-full lg:w-3/5 border-x border-gray-700">
          <Header />
          <TweetForm onCreateTweet={createTweet} />
          <InfiniteScrollList isUpdated={!!mutateData} url={`/api/tweets`} />
          
          <button
            onClick={onMobileCreate}
            className="fixed z-[1] sm:hidden bottom-[80px] right-5 bg-blue-400 '' font-bold py-4 px-4 rounded-full"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="#fff"
              className="w-5 h-5"
            >
              <g>
                <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
              </g>
            </svg>
          </button>
        </section>
        {/* right */}
        <section className="w-2/5 hidden lg:block">
          <div className="w-80 p-3 pb-0 mr-16">
            <div className="relative w-full">
              <input
                type="text"
                name="search"
                placeholder="Search Twitter"
                className="bg-gray-800 h-10 px-10 w-full rounded-full text-sm peer focus:border-2 border-blue-500 outline-none"
              />
              <svg
                className="cursor-pointer absolute left-2 top-0 bottom-0 my-auto fill-current peer-focus:fill-blue-500 w-6 h-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                viewBox="0 0 15 15"
                aria-hidden="true"
                className="hidden peer-focus:block cursor-pointer absolute fill-blue-500 rounded-full right-3 top-0 bottom-0 my-auto w-4 h-4"
              >
                <g>
                  <path d="M8.914 7.5l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L7.5 6.086 1.707.293c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L6.086 7.5.293 13.293c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L7.5 8.914l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L8.914 7.5z"></path>
                </g>
              </svg>
            </div>
          </div>

          <div className="max-w-sm rounded-lg bg-gray-800 overflow-hidden shadow-lg m-4 mr-20">
            <div className="flex">
              <div className="flex-1 m-2">
                <h2 className="px-4 py-2 text-xl w-48 font-semibold ''">
                  Trends for you
                </h2>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a
                  href=""
                  className=" text-2xl rounded-full '' hover:bg-black hover:text-blue-300 float-right"
                >
                  <svg
                    className="m-2 h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex">
              <div className="flex-1">
                <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
                  Trending
                </p>
                <h2 className="px-4 ml-2 w-48 font-bold ''">#React</h2>
                <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
                  5,466 Tweets
                </p>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a
                  href=""
                  className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right"
                >
                  <svg
                    className="m-2 h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <hr className="border-gray-600" />

            <div className="flex">
              <div className="flex-1">
                <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
                  Trending
                </p>
                <h2 className="px-4 ml-2 w-48 font-bold ''">#Typescript</h2>
                <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
                  8,464 Tweets
                </p>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a
                  href=""
                  className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right"
                >
                  <svg
                    className="m-2 h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <hr className="border-gray-600" />

            <div className="flex">
              <div className="flex-1">
                <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
                  Trending
                </p>
                <h2 className="px-4 ml-2 w-48 font-bold ''">#Vue</h2>
                <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
                  5,586 Tweets
                </p>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a
                  href=""
                  className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right"
                >
                  <svg
                    className="m-2 h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <hr className="border-gray-600" />

            <div className="flex">
              <div className="flex-1">
                <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
                  Trending
                </p>
                <h2 className="px-4 ml-2 w-48 font-bold ''">#Next.js</h2>
                <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
                  9,416 Tweets
                </p>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a
                  href=""
                  className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right"
                >
                  <svg
                    className="m-2 h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <hr className="border-gray-600" />

            <div className="flex">
              <div className="flex-1 p-4">
                <h2 className="ml-2 w-48 font-bold text-sm text-blue-400">
                  Show more
                </h2>
              </div>
            </div>
          </div>

          <div className="max-w-sm rounded-lg bg-gray-800 overflow-hidden shadow-lg m-4 mr-20">
            <div className="flex">
              <div className="flex-1 m-2">
                <h2 className="px-4 py-2 text-xl w-48 font-semibold ''">
                  Who to follow
                </h2>
              </div>
            </div>

            <hr className="border-gray-600" />

            <div className="flex flex-shrink-0">
              <div className="flex-1 ">
                <div className="flex items-center w-48">
                  <div>
                    <img
                      className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                      src="http://placeimg.com/640/480/any"
                      alt=""
                    />
                  </div>
                  <div className="ml-3 mt-3">
                    <p className="text-base leading-6 font-medium ''">
                      Nomad Coder
                    </p>
                    <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @nico
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a href="" className=" float-right">
                  <button className="bg-transparent hover:bg-blue-500 '' font-semibold hover:'' py-2 px-4 border border-white hover:border-transparent rounded-full">
                    Follow
                  </button>
                </a>
              </div>
            </div>
            <hr className="border-gray-600" />

            <div className="flex flex-shrink-0">
              <div className="flex-1 ">
                <div className="flex items-center w-48">
                  <div>
                    <img
                      className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                      src="http://placeimg.com/640/480/any"
                      alt=""
                    />
                  </div>
                  <div className="ml-3 mt-3">
                    <p className="text-base leading-6 font-medium ''">
                      Nomad Coder
                    </p>
                    <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @nico
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a href="" className=" float-right">
                  <button className="bg-transparent hover:bg-blue-500 '' font-semibold hover:'' py-2 px-4 border border-white hover:border-transparent rounded-full">
                    Follow
                  </button>
                </a>
              </div>
            </div>

            <hr className="border-gray-600" />

            <div className="flex">
              <div className="flex-1 p-4">
                <h2 className="ml-2 w-48 font-bold text-sm text-blue-400">
                  Show more
                </h2>
              </div>
            </div>
          </div>

          <div className="flow-root m-6">
            <div className="flex-1">
              <a href="#">
                <p className="text-sm leading-6 font-medium text-gray-500">
                  Terms of Service Privacy Policy Cookie Policy Accessibility
                  Ads info More
                </p>
              </a>
            </div>
            <div className="flex-2">
              <p className="text-sm leading-6 font-medium text-gray-600">
                {" "}
                © 2022 Twitter, Inc.
              </p>
            </div>
          </div>
        </section>
      </div>
      <MobileNav />
    </div>
  );
};

export default Home;
