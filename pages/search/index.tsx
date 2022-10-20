import { useCallback, useState } from "react";
import MobileLayout from "@components/layout/MobileLayout";
import SearchBar from "@components/common/SearchBar";
import InfiniteScrollList from "@components/common/InfiniteScrollList";
import { useRouter } from "next/router";
import FloatingButton from "@components/common/FloatingButton";

function search() {
  const router = useRouter();
  const [keyword, setKeyword] = useState(router.query.keyword ?? )
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
