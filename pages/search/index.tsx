import { useCallback, useState } from "react";
import MobileLayout from "@components/MobileLayout";
import SearchBar from "@components/SearchBar";
import InfiniteScrollList from "@components/InfiniteScrollList";
import { useRouter } from "next/router";
import FloatingButton from "@components/FloatingButton";

function search() {
  const router = useRouter();
  const [keyword, setKeyword] = useState(router.query.keyword ?? '')
  const onSetKeyWord = useCallback((keyword: string) => { setKeyword(keyword) }, []);
  return (
    <MobileLayout title="Search">
      <div className="mx-2 mt-6">
        <SearchBar setKeyword={onSetKeyWord} />
      </div>
      {keyword && <span className="inline-block w-full py-6 mt-6 text-2xl font-bold text-center border-gray-700 border-y">'{keyword}' 검색결과</span>}
      <InfiniteScrollList dataType="tweets" url='/api/search' keyword={keyword} />
      <FloatingButton />
    </MobileLayout>
  );
}

export default search;
