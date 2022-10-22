
# 🐦 넥스트 트위터

## 🧩 개요

next.js로 구현한 트위터 

## 🛠 사용기술

<img src="https://img.shields.io/badge/Next.js-black?style=flat&&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/swr-black?style=flat&&logo=swc&logoColor=white"> <img src="https://img.shields.io/badge/recoil-06B6D4?style=flat&&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&e&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=Prisma&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat&logo=Amazon S3&logoColor=black"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=black"/> <img src="https://img.shields.io/badge/PlanetScale-000000?style=flat&logo=PlanetScale&logoColor=white"/>

## 📕 기능목록

|                                  기능                                                                                          |
| :----------------------------------------------------------------------: |
|               구글 로그인 / 일반 로그인 / 회원가입               | 
프로필 조회 / 변경 | 
팔로우 / 언팔로우 | 
게시물 CRUD | 
게시물 검색 | 
댓글 CRUD |                        
리트윗 기능 |


[상세 기능 명세](https://www.notion.so/1608e58eb5304791b076ffd21d000b23?v=d5a8a8fb49304e48bf8bd0b5064cbea1)

## 🤔 고민한 내용

✔️ 클론 디자인

트위터의 레이아웃과 css 디자인을 90퍼센트 이상 구현하였습니다. 특히, 3단계로 이루어진 회원가입 form을 그대로 구현하였고, Framer-motion으로 자연스러운 animation을 적용해 보았습니다. 트위터와 마찬가지로 반응형 페이지입니다.

✔️ 재사용성 

두번 이상 사용되는 코드를 컴포넌트로 만들었고, 컴포넌트들을 조합하여 재사용성을 높였습니다.

✔️ next.config.js 설정

빌드 속도가 최대 3배 빠른 Rust compiler인 swc를 적용하였으며, @next/bundle-analyzer로 번들 최적화를 수행 하였습니다.

✔️ TypeScript

interface를 따로 분리하고 확장하기 쉽도록 구현 하였으며, 타입이 존재하지 않는 모듈에 대해 선언(declare)를 하였습니다.

✔️ swr 사용

Server State를 관리하고 및 동일한 api 요청에 대해 캐싱 기능을 제공하는 swr를 사용했습니다. mutate 함수로 데이터 변경시 새로고침 없이 즉시 반영 되는 사용자 경험을 제공하였습니다. (실제로는 캐시 데이터만 업데이트 합니다)

✔️ 서버측 helper function 

hoc 패턴으로 서버측 api 호출할때마다 1) 올바른 http 메소드를 사용하는지 2) 인가가 필요한 상황에서 session에 로그인 정보가 저장되어있는지 점검하였습니다.

✔️ 무한 스크롤

Intersection Observer Api를 이용하여 무한 스크롤을 구현했으며, 트위터 특성상 무한스크롤이 적용된 리스트가 많이 필요한데 재사용을 위해 무한 스크롤 자체를 컴포넌트화 하였습니다. pagination api 설계에 있어서는 리스트 중간중간 삭제나 순서변경이 일어나도 문제가 없는 [offset](https://www.prisma.io/docs/concepts/components/prisma-client/pagination) 방식을 적용하였습니다.

✔️ 성능 최적화 

1) 코드 스플리팅, 번들 최적화, 이미지 최적화, cdn방식으로 변경등을 수행하였습니다.

2) 렌더링 최적화 => useCallBack, useMemo, memo의 hook을 적재적소에 적용하였습니다.

3) 성능 점수를 95점으로 개선하고, 번들 크기를 줄였습니다. 

✔️ SSR 

초기 로딩 속도 개선과 SEO를 위해 SSR을 적용했습니다. 

✔️ 구글 로그인 및 db 연동

처음 구글 로그인이 되면, 구글 정보가 db에 자동으로 연동되고 일반 유저와 마찬가지로 db에 정보가 저장되도록 하였습니다.

✔️ 이메일 / 휴대폰 인증

회원가입시 본인확인을 위해, 이메일 혹은 휴대폰에 6자리 코드를 보내고 이를 인증 하도록 하는 기능을 구현하였습니다.

✔️ 웹접근성 및 SEO 개선

시멘틱 태그 사용를 사용하여 웹접근성을 개선하였으며, 페이지별로 동적으로 title과 meta 태그를 작성하여 SEO를 개선하였습니다.

## 🔗 링크

[배포 페이지(vercel)](https://nextjs-twiiter.vercel.app/)

[성능 최적화를 위한 기록(wiki)](https://github.com/ijs1103/nextjs_twitter/wiki/%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94%EB%A5%BC-%EC%9C%84%ED%95%9C-%EA%B8%B0%EB%A1%9D%EB%93%A4)

[시연 영상(youtube)](https://youtu.be/phoeJ2AbFlc)




