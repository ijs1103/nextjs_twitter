import { memo } from "react";
import { FunctionalUpdateFn } from "@libs/client/types";

interface Props {
  id: "month" | "date" | "year";
  label: "월" | "일" | "년";
  optionData: JSX.Element[];
  onSetBirth: (Fn: FunctionalUpdateFn) => void;
  value: number | undefined;
}
function SelectOption({ id, label, optionData, onSetBirth, value }: Props) {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    switch (id) {
      case "month":
        onSetBirth((prevs: any) => {
          return { ...prevs, month: selected };
        });
        break;
      case "date":
        onSetBirth((prevs: any) => {
          return { ...prevs, date: selected };
        });
        break;
      case "year":
        onSetBirth((prevs: any) => {
          return { ...prevs, year: selected };
        });
        break;
    }
  };
  return (
    <div className="relative flex-1">
      <label htmlFor={id} className="absolute text-xs top-1 left-2">
        {label}
      </label>
      <select
        onChange={onChange}
        className="w-full px-2 pt-4 pb-2 bg-transparent border border-gray-600 rounded appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        name={id}
        id={id}
        defaultValue={value || ""}
      >
        <option value="" disabled></option>
        {optionData}
      </select>
      <svg
        className="absolute w-4 h-4 -translate-y-1/2 top-1/2 right-1 md:right-2 md:w-8 md:h-8"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default memo(SelectOption);
