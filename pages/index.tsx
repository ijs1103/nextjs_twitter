import Router from "next/router";
import GoogleLoginBtn from "@components/auth/GoogleLoginBtn";

export default () => {
  const router = Router;
  const handleSignUp = () => {
    router.push("/create-account");
  };
  const handleLogin = () => {
    router.push("/log-in");
  };
  return (
    <main className="relative flex flex-col lg:flex-row">
      <div className="bg-blue-500 w-full h-[50vh] lg:h-[100vh] order-2 lg:order-none flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="#fff"
          className="h-52"
        >
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center items-center bg-black w-full lg:min-w-[800px] h-[100vh] order-1 px-3 py-3 lg:px-4 lg:py-4 ">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="#fff"
          className="pb-[13px]w-12 h-12"
        >
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </g>
        </svg>
        <h1 className="font-bold text-2xl my-2 lg:text-6xl lg:leading-[92px]  lg:my-[53px]">
          지금 일어나고 있는 일
        </h1>
        <h2 className="text-xl font-semibold break-words lg:text-3xl">
          오늘 트위터에 가입하세요.
        </h2>
        <div className="mt-5 space-y-3 w-[300px]">
          <GoogleLoginBtn />
          <button className="bg-white text-black text-sm rounded-[20px] w-full px-1 py-1 flex justify-center items-center gap-4 hover:bg-slate-200 transition-colors">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-[rgb(15, 20, 25)]"><g><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path></g></svg>
            <span className="font-bold">Apple에서 로그인</span>
          </button>
          <div className="relative pt-3">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative text-center -top-3 ">
              <span className="px-2 text-sm text-gray-500 bg-black">또는</span>
            </div>
          </div>
          <button
            onClick={handleSignUp}
            className="bg-blue-500  text-sm rounded-[20px] w-full px-1 py-1"
          >
            이메일로 가입하기
          </button>
          <p className="text-[12px]">
            By signing up, you agree to the{" "}
            <span className="text-blue-600">Terms of Service</span> and{" "}
            <span className="text-blue-600">Privacy Policy</span>, including{" "}
            <span className="text-blue-600">Cookie Use.</span>
          </p>
          <h3 className="pt-6 font-bold">이미 트위터에 가입하셨나요?</h3>
          <button
            onClick={handleLogin}
            className="border border-gray-600 text-blue-500 text-sm rounded-[20px] w-full px-1 py-1 "
          >
            로그인
          </button>
        </div>
      </div>
    </main>
  );
};
