import { memo } from "react";

interface PopupLi {
  title: string;
  onClickFn: () => void;
}
interface PopupProps {
  contents: PopupLi[];
}

function Popup({ contents }: PopupProps) {
  return (
    <div className="bg-black w-[250px] space-y-2 p-1 rounded-xl border border-gray-700">
      <ul className="flex flex-col">
        {contents.map((content, idx) => {
          return (
            <li
              className="transition text-center p-3 hover:bg-gray-800 rounded-xl"
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
