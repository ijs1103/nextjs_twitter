import { cls } from "@libs/utils";
import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  isDisable?: boolean;
  isCancel?: boolean;
  onClick?: () => void;
  isFollowing?: boolean;
}

function Button({ children, isDisable = false, isCancel = false, onClick, isFollowing = false }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [text, setText] = useState(children);
  const handleMouseOver = () => {
    if (!isFollowing) return;
    setText('UnFollow');
  }
  const handleMouseOut = () => {
    if (!isFollowing) return;
    setText(children);
  }
  useEffect(() => {
    btnRef.current?.addEventListener('mouseover', handleMouseOver);
    btnRef.current?.addEventListener('mouseout', handleMouseOut);
    return () => {
      btnRef.current?.removeEventListener('mouseover', handleMouseOver);
      btnRef.current?.addEventListener('mouseout', handleMouseOut);
    }
  }, [])

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      disabled={isDisable}
      className={cls(
        "font-bold py-1 px-4 sm:px-8 rounded-xl  sm:rounded-full ",
        isCancel
          ? "bg-red-600 hover:bg-red-800" :
          isFollowing ? " w-[180px] border-white border-2 bg-transparent hover:text-red-500 hover:border-red-500" : "bg-blue-400 hover:bg-blue-600"
      )}
    >
      {text}
    </button>
  );
}

export default Button;
