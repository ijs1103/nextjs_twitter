import { cls } from "@libs/utils";

interface Props {
  children: React.ReactNode;
  isDisable?: boolean;
  isCancel?: boolean;
  onClick?: () => void;
  isFollowing?: boolean;
}

function Button({ children, isDisable = false, isCancel = false, onClick, isFollowing = false }: Props) {

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisable}
      className={cls(
        "font-bold py-1 px-4 sm:px-8 rounded-xl sm:rounded-full transition-colors disabled:opacity-50 ",
        isCancel
          ? "bg-red-600 hover:bg-red-800" :
          isFollowing ? " w-[180px] border-white border-2 bg-transparent hover:text-red-500 hover:border-red-500" : "bg-blue-400 hover:bg-blue-600"
      )}
    >
      {children}
    </button>
  );
}

export default Button;
