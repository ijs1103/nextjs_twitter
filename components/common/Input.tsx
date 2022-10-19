import type { UseFormRegisterReturn } from "react-hook-form";
import { memo, useState } from "react";
import { cls } from "@libs/client/utils";
interface Props {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  hasError?: boolean;
  isFilled?: boolean;
  setStage?: () => void;
  disabled?: boolean;
  type?: "text" | "password" | "number";
}
function Input({
  id,
  label,
  register,
  hasError,
  isFilled,
  setStage,
  disabled,
  type = "text",
}: Props) {
  const [focused, setFocused] = useState(false);
  const onInput = (e: any) => {
    if (hasError) {
      setFocused(false);
      return;
    }
    e.target.value ? setFocused(true) : setFocused(false);
  };
  const onFocus = () => {
    setStage && setStage();
  };
  return (
    <div className="relative">
      <input
        disabled={disabled}
        onFocus={onFocus}
        onInput={onInput}
        {...register}
        className={cls(
          "disabled:opacity-30 peer appearance-none w-full bg-transparent border-gray-600 border rounded px-2 pt-4 pb-3 outline-none",
          !hasError ? " focus:ring-blue-500 focus:border-blue-500 " : " ",
          hasError ? "ring-red-600 border-red-600" : "",
          focused ? " ring-blue-500 border-blue-500" : ""
        )}
        type={type}
        id={id}
      />
      <label
        className={cls(
          "transition-all absolute left-3 top-1/2 -translate-y-1/2",
          !hasError
            ? " peer-focus:text-xs peer-focus:top-[20%] peer-focus:text-blue-500 "
            : " ",
          hasError ? "text-xs top-[20%] text-red-600" : "",
          focused ? " text-xs top-[20%] text-blue-500" : "",
          isFilled ? "text-xs top-[20%]" : ""
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

export default memo(Input);
