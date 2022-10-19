import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/db";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id, limit, offset },
  } = req;
  const likedTweets = await client.like.findMany({
    where: {
      userId: +id,
    },
    select: {
      tweet: {
        select: {
          id: true,
        },
      },
    },
  });

  const likes = await client.like.findMany({
    where: {
      userId: +id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: +limit,
    skip: +offset,
    include: {
      tweet: {
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
      },
    },
  });
  return res.json({
    ok: true,
    likes,
    total: likedTweets.length,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
