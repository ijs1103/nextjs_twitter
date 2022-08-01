import { cls } from "@libs/utils";
import Link from "next/link";
import { memo } from "react";

interface Props {
  url: string;
  isCurrent: boolean;
  children: React.ReactNode;
}
function TabMenu({ url, isCurrent, children }: Props) {
  return (
    <Link href={url}>
      <a className="transition duration-300 py-3 text-center flex-1 hover:bg-gray-800">
        <li>
          <span
            className={cls(
              "py-3 border-b-4 ",
              isCurrent ? "border-blue-500" : "border-transparent"
            )}
          >
            {children}
          </span>
        </li>
      </a>
    </Link>
  );
}

export default memo(TabMenu);
