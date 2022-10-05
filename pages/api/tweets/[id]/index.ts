import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/withHandler";
import client from "@libs/db";
import { withApiSession } from "@libs/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const tweet = await client.tweet.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          nickName: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          like: true,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.like.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  // 게시물이 리트윗 당했는지 여부
  const isRetweeted = Boolean(
    await client.tweet.findFirst({
      where: {
        retweetId: tweet?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  const isMyTweet = req.session.user?.id === tweet?.userId;
  res.json({ ok: true, tweet, isLiked, isMyTweet, isRetweeted });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
