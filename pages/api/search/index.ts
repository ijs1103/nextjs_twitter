import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/db";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { keyword, limit, offset },
  } = req;
  // searchFilter: 검색 조건
  // 1) 검색 키워드가 글내용 or 유저이름 or 유저닉네임에 포함 되어있고
  // 2) 리트윗한 게시물은 검색에서 제외
  const searchFilter = (word: string) => {
    return {
      OR: [
        {
          payload: {
            contains: word,
          },
        },
        {
          user: {
            name: {
              contains: word,
            },
          },
        },
        {
          user: {
            nickName: {
              contains: word,
            },
          },
        },
      ],
      AND: [
        {
          retweetId: {
            equals: null,
          },
        },
      ],
    };
  };

  const total = await client.tweet.count({
    where: searchFilter(keyword + ""),
  });
  const searchedTweets = await client.tweet.findMany({
    where: searchFilter(keyword + ""),
    orderBy: {
      updatedAt: "desc",
    },
    take: +limit,
    skip: +offset,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          nickName: true,
          image: true,
        },
      },
      _count: {
        select: {
          like: true,
          comments: true,
        },
      },
    },
  });
  return res.json({
    ok: true,
    tweets: searchedTweets,
    total,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
