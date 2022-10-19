import { SWRConfig } from "swr";
import { RecoilRoot } from 'recoil';
import "../global.css";
import MobileNav from "@components/layout/MobileNav";
import type { AppProps } from "next/app";
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(url).then((response) => response.json()),
        }}
      >
        <RecoilRoot>
          <div className="text-white bg-black ">
            <Component {...pageProps} />
            <MobileNav />
          </div>
        </RecoilRoot>
      </SWRConfig>
    </SessionProvider>
  );
}
