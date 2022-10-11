import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/withHandler";
import client from "@libs/db";
import { withApiSession } from "@libs/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const {
      query: { limit, offset },
    } = req;
    const allTweets = await client.tweet.findMany({
      select: {
        id: true,
      },
    });
    const tweets = await client.tweet.findMany({
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
        retweet: {
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
      tweets,
      total: allTweets.length,
    });
  }
  if (req.method === "POST") {
    const {
      body: { payload },
      session: { user },
    } = req;
    const tweet = await client.tweet.create({
      data: {
        payload,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.json({
      ok: true,
      tweet,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
