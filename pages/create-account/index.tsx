import { useEffect, useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import Input from "@components/Input";
import SelectOption from "@components/SelectOption";
import TermsOfService from "@components/TermsOfService";
import useMutation from "@libs/useMutation";
import { FunctionalUpdateFn } from "@libs/types";
import Button from "@components/Button";
import dynamic from 'next/dynamic'

interface SignupForm {
  name: string;
  nickName: string;
  email?: string;
  birth: string;
  phone?: string;
  password: string;
  code: string;
}
interface IBirth {
  month: number;
  date: number;
  year: number;
}
export default function SignupForm() {
  const CodeModal = dynamic(() => import('../../components/CodeModal'))
  const router = Router;
  const [signup, { data }] = useMutation("/api/create-account");
  const [sendCode, { data: sendCodeData }] = useMutation("/api/create-account/createCode");
  const [checkCode, { data: checkCodeData }] = useMutation("/api/create-account/checkCode");
  const [method, setMethod] = useState<"phone" | "email">("email");
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [birth, setBirth] = useState<IBirth>();
  const [isCodeChecked, setIsCodeChecked] = useState(false);
  const [codeModalOn, setCodeModalOn] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<SignupForm>({ mode: "onChange" });
  useEffect(() => {
    data?.ok && router.push("/");
  }, [stage, data]);
  const onValid = (form: SignupForm) => {
    if (!isSubmitted) return;
    const birth = form.birth.split(".").join("");
    signup({ ...form, birth });
  };
  const onSetBirth = (Fn: FunctionalUpdateFn) => setBirth(Fn);
  const onGoback = () => {
    switch (stage) {
      case 1:
        router.push("/");
        break;
      case 2:
        setStage(1);
        break;
      case 3:
        setStage(2);
        break;
      default:
        break;
    }
  };
  const onGoNext = () => {
    if (stage === 1) {
      setValue("birth", `${birth?.year}.${birth?.month}.${birth?.date}`);
      setStage(2);
    }
    stage === 2 && setStage(3);
    stage === 3 && setIsSubmitted(true);
  };
  const toggleMethod = () => {
    reset({
      phone: "",
      email: "",
    });
    method === "phone" ? setMethod("email") : setMethod("phone");
    setIsCodeChecked(false);
  };
  const onSetStage = () => {
    if (stage !== 3) return;
    setStage(1);
  };
  const handleSendCode = () => {
    const value = method === 'email' ? getValues('email') : getValues('phone');
    // 이메일이나 휴대폰 input이 빈값일때 얼리리턴
    if (!value) return;
    sendCode({ [method]: value });
  }
  useEffect(() => {
    if (sendCodeData?.ok) {
      alert('해당 이메일/휴대폰으로 6자리 인증번호가 발송되었습니다.');
      setCodeModalOn(true);
    }
  }, [sendCodeData]);
  const onCheckCode = () => {
    const code = getValues('code');
    if (!code) return;
    const value = method === 'email' ? getValues('email') : getValues('phone');
    checkCode({ number: code, [method]: value });
  }
  useEffect(() => {
    if (!checkCodeData) return;
    if (checkCodeData.ok) {
      alert('성공적으로 인증되었습니다');
      setIsCodeChecked(true);
      setCodeModalOn(false);
    } else {
      alert('올바른 코드가 아닙니다');
    }
  }, [checkCodeData]);
  return (
    <>
      <div className="w-full max-w-xl min-h-screen px-12 py-2 mx-auto bg-black md:h-screen">
        <div className="flex items-center gap-5">
          <button
            onClick={onGoback}
            className="px-1 py-1 transition border border-black rounded-full hover:bg-gray-800"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className="">3단계 중 {stage}단계</span>
        </div>
        <form
          className="relative flex flex-col h-full"
          onSubmit={handleSubmit(onValid)}
        >
          <span className="my-6 text-2xl font-bold">
            {stage !== 2 ? "계정을 생성하세요" : "트위터 환경을 맞춤 설정하세요"}
          </span>
          {stage !== 2 ? (
            <>
              <div className="mt-5 space-y-5">
                <Input
                  id="name"
                  setStage={onSetStage}
                  isFilled={!!getValues("name")}
                  label="이름"
                  register={register("name", { required: true })}
                  hasError={!!errors?.name}
                />
                {errors?.name && (
                  <span className="ml-3 text-xs text-red-600">
                    이름을 입력하세요
                  </span>
                )}
                <Input
                  id="nickName"
                  setStage={onSetStage}
                  isFilled={!!getValues("nickName")}
                  label="닉네임"
                  register={register("nickName", { required: true })}
                  hasError={!!errors?.nickName}
                />
                {errors?.nickName && (
                  <span className="ml-3 text-xs text-red-600">
                    닉네임을 입력하세요
                  </span>
                )}
                <Input
                  type="password"
                  id="password"
                  setStage={onSetStage}
                  isFilled={!!getValues("password")}
                  label="비밀번호"
                  register={register("password", { required: true })}
                  hasError={!!errors?.password}
                />
                {errors?.password && (
                  <span className="ml-3 text-xs text-red-600">
                    비밀번호를 입력하세요
                  </span>
                )}
                {method === "phone" ? (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Input
                          id="phone"
                          setStage={onSetStage}
                          isFilled={!!getValues("phone")}
                          label={isCodeChecked ? "인증됨" : "휴대폰"}
                          register={register("phone", {
                            required: true,
                            pattern: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                          })}
                          hasError={!!errors?.phone}
                          disabled={isCodeChecked}
                        />
                      </div>
                      {(stage === 1) && <Button isDisable={isCodeChecked} onClick={handleSendCode}>인증하기</Button>}
                    </div>
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
                        className="mt-2 text-sm text-right text-blue-500 cursor-pointer hover:underline"
                      >
                        대신 이메일 사용하기
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Input
                          id="email"
                          setStage={onSetStage}
                          isFilled={!!getValues("email")}
                          label={isCodeChecked ? "인증됨" : "이메일"}
                          register={register("email", {
                            required: true,
                            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          })}
                          hasError={!!errors?.email}
                          disabled={isCodeChecked}
                        />
                      </div>
                      {stage === 1 && <Button isDisable={isCodeChecked} onClick={handleSendCode}>인증하기</Button>}
                    </div>
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
                        className="mt-2 text-sm text-right text-blue-500 cursor-pointer hover:underline"
                      >
                        대신 휴대폰 사용하기
                      </p>
                    )}
                  </>
                )}
                {stage === 3 && (
                  <Input
                    id="birth"
                    setStage={onSetStage}
                    isFilled={!!getValues("birth")}
                    label="생년월일"
                    register={register("birth")}
                    hasError={!!errors?.birth}
                  />
                )}
              </div>
              {stage === 1 && (
                <>
                  <span className="mt-8 text-sm font-bold">생년월일</span>
                  <p className="mt-2 text-xs text-gray-500">
                    이 정보는 공개적으로 표시되지 않습니다. 비즈니스, 반려동물 등
                    계정 주제에 상관없이 나의 연령을 확인하세요.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <SelectOption
                      value={birth?.month}
                      onSetBirth={onSetBirth}
                      id="month"
                      label="월"
                      optionData={Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (v, i) => (
                          <option key={i}>{v}</option>
                        )
                      )}
                    />
                    <SelectOption
                      value={birth?.date}
                      onSetBirth={onSetBirth}
                      id="date"
                      label="일"
                      optionData={Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (v, i) => (
                          <option key={i}>{v}</option>
                        )
                      )}
                    />
                    <SelectOption
                      value={birth?.year}
                      onSetBirth={onSetBirth}
                      id="year"
                      label="년"
                      optionData={Array.from(
                        { length: 100 },
                        (_, i) => 2022 - i
                      ).map((v, i) => (
                        <option key={i}>{v}</option>
                      ))}
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            <TermsOfService />
          )}
          {stage === 3 && (
            <p className="mt-5 text-lg text-center text-red-600">{data?.error}</p>
          )}
          <div className="bottom-0 w-full mt-3 mb-10 space-y-6 md:absolute">
            {stage === 3 && (
              <p className="text-xs">
                가입하면 <span className="text-blue-400">쿠키 사용</span>을 포함해
                이용약관 및 개인정보 처리방침에 동의하게 됩니다. 트위터는 계정을
                안전하게 보호하고 광고를 포함한 맞춤 서비스를 제공하는 등 트위터
                개인정보 처리방침에 명시된 목적을 위해 이메일 주소 및 전화번호
                등의 내 연락처 정보를 사용할 수 있습니다.{" "}
                <span className="text-blue-400">자세히 알아보기.</span> 이메일
                또는 전화번호를 제공하시면 다른 사람들이 이 정보로 내 계정을 찾을
                수 있게 됩니다. 해당 정보를 제공하지 않으시려면 여기에서
                변경하세요.{" "}
              </p>
            )}
            <button
              disabled={!isValid || (birth && Object.keys(birth).length !== 3) || !isCodeChecked}
              onClick={onGoNext}
              className="w-full bg-blue-500 disabled:opacity-30 '' font-bold px-2 py-3 rounded-3xl"
            >
              {stage !== 3 ? "다음" : "가입"}
            </button>
          </div>
        </form>
      </div>
      {codeModalOn && <CodeModal onClose={() => setCodeModalOn(false)} getCode={() => getValues("code")} register={register("code")} onCheckCode={onCheckCode} />}
    </>
  );
}
