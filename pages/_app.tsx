import { SWRConfig } from "swr";
import { RecoilRoot } from 'recoil';
import "../global.css";

export default function App({ Component, pageProps }: any) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <RecoilRoot>
        <div className="text-white bg-black">
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </SWRConfig>
  );
}
