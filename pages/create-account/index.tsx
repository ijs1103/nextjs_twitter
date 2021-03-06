import { useEffect, useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import Input from "@components/Input";
import SelectOption from "@components/SelectOption";
import TermsOfService from "@components/TermsOfService";
import useMutation from "@libs/useMutation";
import { FunctionalUpdateFn } from "@libs/types";

interface SignupForm {
  name: string;
  email?: string;
  birth: string;
  phone?: string;
  password: string;
}
interface IBirth {
  month: number;
  date: number;
  year: number;
}
export default function SignupForm() {
  const router = Router;
  const [signup, { data, loading }] = useMutation("/api/create-account");
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [birth, setBirth] = useState<IBirth>();
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
  };
  const onSetStage = () => {
    if (stage !== 3) return;
    setStage(1);
  };
  return (
    <div className="min-h-screen md:h-screen w-full max-w-xl mx-auto '' bg-black px-12 py-2">
      <div className="flex items-center gap-5">
        <button
          onClick={onGoback}
          className="transition px-1 py-1 rounded-full border-black border hover:bg-gray-800"
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
        <span className="">3?????? ??? {stage}??????</span>
      </div>
      <form
        className="flex flex-col h-full relative"
        onSubmit={handleSubmit(onValid)}
      >
        <span className="my-6 text-2xl font-bold">
          {stage !== 2 ? "????????? ???????????????" : "????????? ????????? ?????? ???????????????"}
        </span>
        {stage !== 2 ? (
          <>
            <div className="mt-5 space-y-5">
              <Input
                id="name"
                setStage={onSetStage}
                isFilled={!!getValues("name")}
                label="??????"
                register={register("name", { required: true })}
                hasError={!!errors?.name}
              />
              {errors?.name && (
                <span className="ml-3 text-xs text-red-600">
                  ????????? ???????????????
                </span>
              )}
              <Input
                type="password"
                id="password"
                setStage={onSetStage}
                isFilled={!!getValues("password")}
                label="????????????"
                register={register("password", { required: true })}
                hasError={!!errors?.password}
              />
              {errors?.password && (
                <span className="ml-3 text-xs text-red-600">
                  ??????????????? ???????????????
                </span>
              )}
              {method === "phone" ? (
                <>
                  <Input
                    id="phone"
                    setStage={onSetStage}
                    isFilled={!!getValues("phone")}
                    label="?????????"
                    register={register("phone", {
                      required: true,
                      pattern: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                    })}
                    hasError={!!errors?.phone}
                  />
                  {errors?.phone && (
                    <span className="ml-3 text-xs text-red-600">
                      {errors?.phone.type === "pattern"
                        ? "????????? ????????? ????????? ???????????????"
                        : "???????????? ???????????????"}
                    </span>
                  )}
                  {stage === 1 && (
                    <p
                      onClick={toggleMethod}
                      className="mt-2 text-sm text-right text-blue-500 hover:underline"
                    >
                      ?????? ????????? ????????????
                    </p>
                  )}
                </>
              ) : (
                <>
                  <Input
                    id="email"
                    setStage={onSetStage}
                    isFilled={!!getValues("email")}
                    label="?????????"
                    register={register("email", {
                      required: true,
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    })}
                    hasError={!!errors?.email}
                  />
                  {errors?.email && (
                    <span className="ml-3 text-xs text-red-600">
                      {errors?.email.type === "pattern"
                        ? "????????? ????????? ????????? ???????????????"
                        : "???????????? ???????????????"}
                    </span>
                  )}
                  {stage === 1 && (
                    <p
                      onClick={toggleMethod}
                      className="mt-2 text-sm text-right text-blue-500 hover:underline"
                    >
                      ?????? ????????? ????????????
                    </p>
                  )}
                </>
              )}
              {stage === 3 && (
                <Input
                  id="birth"
                  setStage={onSetStage}
                  isFilled={!!getValues("birth")}
                  label="????????????"
                  register={register("birth")}
                  hasError={!!errors?.birth}
                />
              )}
            </div>
            {stage === 1 && (
              <>
                <span className="mt-8 text-sm font-bold">????????????</span>
                <p className="mt-2 text-xs text-gray-500">
                  ??? ????????? ??????????????? ???????????? ????????????. ????????????, ???????????? ???
                  ?????? ????????? ???????????? ?????? ????????? ???????????????.
                </p>
                <div className="mt-4 flex gap-3">
                  <SelectOption
                    value={birth?.month}
                    onSetBirth={onSetBirth}
                    id="month"
                    label="???"
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
                    label="???"
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
                    label="???"
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
          <p className="mt-5 text-lg text-red-600 text-center">{data?.error}</p>
        )}
        <div className="md:absolute mt-3 mb-10 bottom-0 w-full space-y-6">
          {stage === 3 && (
            <p className="text-xs">
              ???????????? <span className="text-blue-400">?????? ??????</span>??? ?????????
              ???????????? ??? ???????????? ??????????????? ???????????? ?????????. ???????????? ?????????
              ???????????? ???????????? ????????? ????????? ?????? ???????????? ???????????? ??? ?????????
              ???????????? ??????????????? ????????? ????????? ?????? ????????? ?????? ??? ????????????
              ?????? ??? ????????? ????????? ????????? ??? ????????????.{" "}
              <span className="text-blue-400">????????? ????????????.</span> ?????????
              ?????? ??????????????? ??????????????? ?????? ???????????? ??? ????????? ??? ????????? ??????
              ??? ?????? ?????????. ?????? ????????? ???????????? ??????????????? ????????????
              ???????????????.{" "}
            </p>
          )}
          <button
            disabled={!isValid || (birth && Object.keys(birth).length !== 3)}
            onClick={onGoNext}
            className="disabled:opacity-30 w-full bg-blue-500 '' font-bold px-2 py-3 rounded-3xl"
          >
            {stage !== 3 ? "??????" : "??????"}
          </button>
        </div>
      </form>
    </div>
  );
}
