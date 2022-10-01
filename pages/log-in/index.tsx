import { useState, useEffect } from "react";
import Router from "next/router";
import useMutation from "@libs/useMutation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Input from "@components/Input";

interface LoginForm {
  email?: string;
  phone?: string;
  password: string;
}

function Login() {
  const router = Router;
  const [login, { data, loading }] = useMutation("/api/users/log-in");
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [stage, setStage] = useState<1 | 2>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onChange" });
  useEffect(() => {
    if (data?.ok) {
      router.replace("/tweets");
    }
    data?.error && alert(data?.error);
  }, [stage, data]);
  const toggleMethod = () => {
    reset({
      phone: "",
      email: "",
    });
    method === "phone" ? setMethod("email") : setMethod("phone");
  };
  const onGoback = () => {
    router.push("/");
  };
  const onValid = (form: LoginForm) => {
    if (!isSubmitted) return;
    login(form);
  };
  const onGoNext = () => {
    if (stage === 1) {
      setStage(2);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-xl min-h-screen mx-auto '' bg-black px-12 py-2">
      <button
        onClick={onGoback}
        className="px-1 py-1 transition border border-black rounded-full hover:bg-gray-800"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <form
        className="relative flex flex-col items-center h-full"
        onSubmit={handleSubmit(onValid)}
      >
        <span className="my-6 text-2xl font-bold">
          {stage === 1 ? "트위터에 로그인 하기" : "비밀번호를 입력하세요"}
        </span>
        <div className="mt-5 space-y-3 w-[300px]">
          {stage === 1 && (
            <>
              <button className="bg-white text-black text-sm rounded-[20px] w-full px-1 py-1 ">
                Google 계정으로 가입하기
              </button>
              <button className="bg-white text-black text-sm rounded-[20px] w-full px-1 py-1 ">
                Apple에서 가입하기
              </button>
              <div className="relative pt-3">
                <div className="absolute w-full border-t border-gray-300" />
                <div className="relative text-center -top-3 ">
                  <span className="px-2 text-sm text-gray-500 bg-black">
                    또는
                  </span>
                </div>
              </div>
            </>
          )}
          {method === "phone" ? (
            <>
              <Input
                disabled={stage === 2}
                id="phone"
                isFilled={!!getValues("phone")}
                label="휴대폰"
                register={register("phone", {
                  required: true,
                  pattern: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                })}
                hasError={!!errors?.phone}
              />
              {errors?.phone && (
                <span className="ml-3 text-xs text-red-600">
                  {errors?.phone.type === "pattern"
                    ? "올바른 휴대폰 형식을 입력하세요"
                    : "휴대폰을 입력하세요"}
                </span>
              )}
              {stage === 1 && (
                <p
                  onClick={toggleMethod}
                  className="mt-2 text-sm text-right text-blue-500 hover:underline"
                >
                  대신 이메일 사용하기
                </p>
              )}
            </>
          ) : (
            <>
              <Input
                disabled={stage === 2}
                id="email"
                isFilled={!!getValues("email")}
                label="이메일"
                register={register("email", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
                hasError={!!errors?.email}
              />
              {errors?.email && (
                <span className="ml-3 text-xs text-red-600">
                  {errors?.email.type === "pattern"
                    ? "올바른 이메일 형식을 입력하세요"
                    : "이메일을 입력하세요"}
                </span>
              )}
              {stage === 1 && (
                <p
                  onClick={toggleMethod}
                  className="mt-2 text-sm text-right text-blue-500 hover:underline"
                >
                  대신 휴대폰 사용하기
                </p>
              )}
            </>
          )}
          {stage === 2 && (
            <Input
              id="password"
              type="password"
              label="비밀번호"
              register={register("password", { required: true })}
              hasError={!!errors?.password}
            />
          )}
          {stage === 2 && errors?.password && (
            <span className="ml-3 text-xs text-red-600">
              비밀번호를 입력하세요
            </span>
          )}
          <button
            disabled={!isValid}
            onClick={onGoNext}
            className="disabled:opacity-30 bg-white text-black font-bold text-sm rounded-[20px] w-full px-1 py-1 "
          >
            {stage === 1 ? "다음" : "로그인"}{" "}
          </button>
        </div>
        <span className="mt-10 text-sm">
          계정이 없으신가요?{" "}
          <Link href="/create-account">
            <a className="text-blue-500 hover:underline">가입하기</a>
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
