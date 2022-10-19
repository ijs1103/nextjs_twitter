import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import { prevUrlState } from "../states";
interface Props {
  title?: string;
}

function Header({ title }: Props) {
  const prevUrl = useRecoilValue(prevUrlState)
  const router = useRouter();
  const isGobackBtn = router.query.id || router.pathname === "/tweets/new" || router.pathname.includes('search');
  const url = router.asPath === prevUrl ? '/tweets' : prevUrl
  return (
    <div className="sticky top-0 left-0 z-10 flex items-center justify-between w-full bg-black opacity-70 backdrop-blur-md">
      <Link href={url}>
        <a>
          <div className="m-2">
            {!isGobackBtn ? (
              <h2 className="px-4 py-2 text-base font-semibold lg:text-xl">
                Home
              </h2>
            ) : (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </a>
      </Link>
      {title && <h2 className="text-base font-semibold select-none lg:text-xl">{title}</h2>}
      <div className="flex items-center justify-center px-2">
        <svg className="w-6 h-6" fill="#fff" viewBox="0 0 24 24">
          <g>
            <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
          </g>
        </svg>
      </div>
    </div >
  );
}

export default Header;
