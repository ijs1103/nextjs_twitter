import { memo } from "react";
import { cls } from "@libs/utils";

interface PopupLi {
  title: string;
  onClickFn: () => void;
  disabled: boolean;
}
interface Props {
  contents: PopupLi[];
  isVisible: boolean;
  onPopupClose: () => void;
}

function Popup({ onPopupClose, isVisible, contents }: Props) {
  return (
    <div
      className={cls(
        "divide-y-[1px] divide-gray-700 bg-black w-[200px] space-y-2 rounded-xl border border-gray-700 backdrop:bg-gray-300 z-[1000] overflow-hidden ",
        isVisible ? "block" : "hidden"
      )}
    >
      <div className="flex">
        <button
          onClick={onPopupClose}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close popup</span>
        </button>
      </div>
      <ul className="cursor-pointer flex flex-col divide-y-[1px] divide-gray-700">
        {contents.map((content, idx) => {
          return (
            <li
              className={cls(
                "transition text-center p-3 hover:bg-gray-800 ",
                content.disabled ? "pointer-events-none text-gray-700" : ""
              )}
              onClick={content.onClickFn}
              key={idx}
            >
              {content.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(Popup);
