import type { NextPage } from "next";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect } from "react";
import TweetForm from "@components/tweet/TweetForm";
import Header from "@components/layout/Header";
import useMutation from "hooks/useMutation";
import { cls } from "@libs/client/utils";
import Popup from "@components/common/Popup";
import { MutationResult, createTweetBody } from "@libs/client/interfaces";
import Link from "next/link";
import InfiniteScrollList from "@components/common/InfiniteScrollList";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { prevUrlState } from "@components/states";
import Avatar from "@components/common/Avatar";
import SearchBar from "@components/common/SearchBar";
import FloatingButton from "@components/common/FloatingButton";
import { isSocialLogginedState } from "@components/states";
import { signOut } from "next-auth/react";
import { DEPLOY_URL } from "@libs/client/constants";

const Home: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [popupOn, setPopupOn] = useState(false);
  const popupToggle = useCallback(() => setPopupOn((prev) => !prev), []);
  /* 트위터 생성 관련 */
  const [createTweet, { data: mutateData }] =
    useMutation<MutationResult>("/api/tweets");
  const onCreateTweet = useCallback((data: createTweetBody) => createTweet(data), []);
  /* 로그아웃 관련 */
  const [logout, { data: logoutData }] = useMutation<{
    ok: boolean;
  }>("/api/users/log-out");
  useEffect(() => {
    logoutData?.ok && router.replace("/");
  }, [logoutData]);
  const isSocialLoggined = useRecoilValue(isSocialLogginedState)
  const socialLogOut = async () => {
    localStorage.removeItem('isSocialLoggined')
    await signOut({ callbackUrl: DEPLOY_URL })
  }
  const handleLogOut = async () => {
    if (isSocialLoggined) await socialLogOut()
    logout({})
  }
  const profilePopup = [
    {
      title: "프로필 보기",
      onClickFn: () => router.push(`/${user?.id}`),
      disabled: false,
    },
    { title: "로그아웃", onClickFn: handleLogOut, disabled: false },
  ];
  const setprevUrl = useSetRecoilState(prevUrlState)
  useEffect(() => {
    setprevUrl('/tweets');
  }, [])
  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* left */}
        <section className="z-10 top-0 left-0 hidden sm:block fixed h-full w-[80px] lg:w-[300px] py-4">
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 mx-auto "
            fill="currentColor"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>

          <nav className="px-2 mt-5 space-y-1">
            <a
              onClick={e => e.preventDefault}
              className="flex items-center justify-center px-2 py-2 text-base font-semibold leading-6 rounded-full cursor-pointer group lg:justify-start hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="w-6 h-6 lg:mr-4 "
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
              onClick={e => e.preventDefault}
              className="flex items-center justify-center px-2 py-2 text-base font-semibold leading-6 rounded-full cursor-pointer group lg:justify-start hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="w-6 h-6 lg:mr-4"
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
              onClick={e => e.preventDefault}
              className="flex items-center justify-center px-2 py-2 mt-1 text-base font-medium leading-6 rounded-full cursor-pointer group lg:justify-start hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="w-6 h-6 lg:mr-4"
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
              onClick={e => e.preventDefault}
              className="flex items-center justify-center px-2 py-2 mt-1 text-base font-medium leading-6 rounded-full cursor-pointer group lg:justify-start hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="w-6 h-6 lg:mr-4"
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
              onClick={e => e.preventDefault}
              className="flex items-center justify-center px-2 py-2 mt-1 text-base font-medium leading-6 rounded-full cursor-pointer group lg:justify-start hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="w-6 h-6 lg:mr-4"
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
              onClick={e => e.preventDefault}
              className="flex items-center justify-center px-2 py-2 mt-1 text-base font-medium leading-6 rounded-full cursor-pointer group lg:justify-start hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="w-6 h-6 lg:mr-4"
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
            <Link href={`/${user?.id}`}>
              <a
                className="flex items-center justify-center px-2 py-2 mt-1 text-base font-medium leading-6 rounded-full cursor-pointer group lg:justify-start hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="w-6 h-6 lg:mr-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span className="hidden lg:block">Profile</span>
              </a>
            </Link>
            <a
              onClick={e => e.preventDefault}
              className="flex items-center justify-center px-2 py-2 mt-1 text-base font-medium leading-6 rounded-full cursor-pointer group lg:justify-start hover:bg-blue-800 hover:text-blue-300"
            >
              <svg
                className="w-6 h-6 lg:mr-4"
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
                <a className="px-2 py-2 mt-5 font-bold text-center bg-blue-400 rounded-full lg:w-48 hover:bg-blue-600 lg:px-4">
                  <span className="hidden lg:block">Tweet</span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="#fff"
                    className="block w-4 h-4 lg:hidden"
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
            className="absolute left-0 right-0 mx-2 mb-5 cursor-pointer bottom-10 sm:bottom-0 "
          >
            <div className="block p-2 transition-colors rounded-full hover:bg-blue-400 group">
              <div className="flex items-center justify-center lg:justify-around">
                <div className="flex-shrink-0">
                  <Avatar url={user?.image} />
                </div>
                <div className="hidden lg:block lg:ml-3">
                  <p className="text-sm font-medium leading-6">
                    {user?.nickName}
                  </p>
                  <p className="text-xs font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                    @{user?.name}
                  </p>
                </div>
                <svg
                  className="hidden w-6 ml-3 lg:block"
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
        <section className="ml-0 sm:ml-[80px] lg:ml-[300px] w-full lg:w-3/5 border-x border-gray-700">
          <Header />
          <TweetForm onCreateTweet={onCreateTweet} image={user?.image} />
          <InfiniteScrollList dataType="tweets" newData={mutateData} url={`/api/tweets`} />
        </section>
        {/* floating button */}
        <FloatingButton />
        {/* right */}
        <section className="hidden w-2/5 lg:block">
          <div className="p-3 pb-0 mr-16 w-80">
            <SearchBar isInMain />
          </div>

          <div className="max-w-sm m-4 mr-20 overflow-hidden bg-gray-800 rounded-lg shadow-lg">
            <div className="flex">
              <div className="flex-1 m-2">
                <h2 className="w-48 px-4 py-2 text-xl font-semibold ">
                  Trends for you
                </h2>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a
                  onClick={e => e.preventDefault}
                  className="float-right text-2xl rounded-full hover:bg-black hover:text-blue-300"
                >
                  <svg
                    className="w-6 h-6 m-2"
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
                <p className="w-48 px-4 mt-3 ml-2 text-xs text-gray-400">
                  Trending
                </p>
                <h2 className="w-48 px-4 ml-2 font-bold ">#React</h2>
                <p className="w-48 px-4 mb-3 ml-2 text-xs text-gray-400">
                  5,466 Tweets
                </p>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a
                  onClick={e => e.preventDefault}
                  className="float-right text-2xl text-gray-400 rounded-full hover:bg-blue-800 hover:text-blue-300"
                >
                  <svg
                    className="w-5 h-5 m-2"
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
                <p className="w-48 px-4 mt-3 ml-2 text-xs text-gray-400">
                  Trending
                </p>
                <h2 className="w-48 px-4 ml-2 font-bold ">#Typescript</h2>
                <p className="w-48 px-4 mb-3 ml-2 text-xs text-gray-400">
                  8,464 Tweets
                </p>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a
                  onClick={e => e.preventDefault}
                  className="float-right text-2xl text-gray-400 rounded-full hover:bg-blue-800 hover:text-blue-300"
                >
                  <svg
                    className="w-5 h-5 m-2"
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
                <p className="w-48 px-4 mt-3 ml-2 text-xs text-gray-400">
                  Trending
                </p>
                <h2 className="w-48 px-4 ml-2 font-bold ">#Vue</h2>
                <p className="w-48 px-4 mb-3 ml-2 text-xs text-gray-400">
                  5,586 Tweets
                </p>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a
                  onClick={e => e.preventDefault}
                  className="float-right text-2xl text-gray-400 rounded-full hover:bg-blue-800 hover:text-blue-300"
                >
                  <svg
                    className="w-5 h-5 m-2"
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
                <p className="w-48 px-4 mt-3 ml-2 text-xs text-gray-400">
                  Trending
                </p>
                <h2 className="w-48 px-4 ml-2 font-bold ">#Next.js</h2>
                <p className="w-48 px-4 mb-3 ml-2 text-xs text-gray-400">
                  9,416 Tweets
                </p>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a
                  onClick={e => e.preventDefault}
                  className="float-right text-2xl text-gray-400 rounded-full hover:bg-blue-800 hover:text-blue-300"
                >
                  <svg
                    className="w-5 h-5 m-2"
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
                <h2 className="w-48 ml-2 text-sm font-bold text-blue-400">
                  Show more
                </h2>
              </div>
            </div>
          </div>

          <div className="max-w-sm m-4 mr-20 overflow-hidden bg-gray-800 rounded-lg shadow-lg">
            <div className="flex">
              <div className="flex-1 m-2">
                <h2 className="w-48 px-4 py-2 text-xl font-semibold ">
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
                      className="inline-block w-auto h-10 mt-2 ml-4 rounded-full"
                      src="https://placeimg.com/640/480/any"
                      alt=""
                    />
                  </div>
                  <div className="mt-3 ml-3">
                    <p className="text-base font-medium leading-6 ">
                      Elon Musk
                    </p>
                    <p className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                      @elonmusk
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a onClick={e => e.preventDefault} className="float-right ">
                  <button className="px-4 py-2 font-semibold bg-transparent border border-white rounded-full hover:bg-blue-500 hover: hover:border-transparent">
                    Follow
                  </button>
                </a>
              </div>
            </div>
            <hr className="border-gray-600" />

            <div className="flex flex-shrink-0">
              <div className="flex-1">
                <div className="flex items-center w-48">
                  <div>
                    <img
                      className="inline-block w-auto h-10 mt-2 ml-4 rounded-full"
                      src="https://placeimg.com/640/480/any"
                      alt=""
                    />
                  </div>
                  <div className="mt-3 ml-3">
                    <p className="text-base font-medium leading-6 ">
                      SpaceX
                    </p>
                    <p className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                      @SpaceX
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a onClick={e => e.preventDefault} className="float-right ">
                  <button className="px-4 py-2 font-semibold bg-transparent border border-white rounded-full hover:bg-blue-500 hover: hover:border-transparent">
                    Follow
                  </button>
                </a>
              </div>
            </div>

            <hr className="border-gray-600" />

            <div className="flex">
              <div className="flex-1 p-4">
                <h2 className="w-48 ml-2 text-sm font-bold text-blue-400">
                  Show more
                </h2>
              </div>
            </div>
          </div>

          <div className="flow-root m-6">
            <div className="flex-1">
              <a onClick={e => e.preventDefault}>
                <p className="text-sm font-medium leading-6 text-gray-500">
                  Terms of Service Privacy Policy Cookie Policy Accessibility
                  Ads info More
                </p>
              </a>
            </div>
            <div className="flex-2">
              <p className="text-sm font-medium leading-6 text-gray-600">
                {" "}
                © 2022 Twitter, Inc.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
