import { SWRConfig } from "swr";
import { RecoilRoot } from 'recoil';
import "../global.css";
import MobileNav from "@components/MobileNav";

export default function App({ Component, pageProps }: any) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <RecoilRoot>
        <div className="overflow-scroll text-white bg-black ">
          <Component {...pageProps} />
          <MobileNav />
        </div>
      </RecoilRoot>
    </SWRConfig>
  );
}
