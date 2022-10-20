import { useRouter } from "next/router";
import { useRef, memo } from "react";

interface Props {
  setKeyword?: (keyword: string) => void;
  isInMain?: boolean;
}
// isInMain: SearchBar가 메인페이지에 존재하는지 여부
function SearchBar({ setKeyword, isInMain = false }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const keyword = e.currentTarget.value;
    // 메인페이지에서 검색을 하면 검색 키워드를 query로 넘겨주고 검색을 실행한다, 메인 페이지가 아닐때(=검색 페이지일때) 부모 컴포넌트의 setter 함수를 실행한다
    isInMain ? router.push(`/search?keyword=${keyword}`) : setKeyword && setKeyword(keyword);
  }
  const handleReset = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  }
  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        type="text"
        name="search"
        placeholder="트위터 검색"
        className="w-full h-10 px-10 text-sm bg-gray-800 border-blue-500 rounded-full outline-none peer focus:border-2"
      />
      <svg
        className="absolute top-0 bottom-0 w-6 h-6 my-auto cursor-pointer fill-current left-2 peer-focus:fill-blue-500"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <svg
        onClick={handleReset}
        viewBox="0 0 15 15"
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-4 h-4 my-auto rounded-full opacity-0 peer-focus:cursor-pointer peer-focus:opacity-100 fill-blue-500 right-3"
      >
        <g>
          <path d="M8.914 7.5l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L7.5 6.086 1.707.293c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L6.086 7.5.293 13.293c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L7.5 8.914l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L8.914 7.5z"></path>
        </g>
      </svg>
    </div>
  );
}

export default memo(SearchBar);
