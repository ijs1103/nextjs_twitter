import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/withHandler";
import client from "@libs/db";
import { withApiSession } from "@libs/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id, limit, offset },
  } = req;
  const myAllTweets = await client.tweet.findMany({
    where: {
      userId: +id,
    },
    select: {
      id: true,
    },
  });
  const tweets = await client.tweet.findMany({
    where: {
      userId: +id,
    },
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
        },
      },
      _count: {
        select: {
          like: true,
        },
      },
    },
  });
  console.log(tweets);
  return res.json({
    ok: true,
    tweets,
    total: myAllTweets.length,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
