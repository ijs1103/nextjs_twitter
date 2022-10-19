import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/db";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id: tweetId },
    session: { user },
  } = req;
  const existingTweet = await client.tweet.findUnique({
    where: {
      id: +tweetId,
    },
    include: {
      retweet: true,
    },
  });
  if (!existingTweet)
    return res.json({ ok: false, error: "존재하지 않는 트윗입니다." });
  // 본인 글을 리트윗 하거나, 본인 글을 리트윗한 게시글을 리트윗 하는것을 방지
  if (
    user?.id === existingTweet.userId ||
    user?.id === existingTweet.retweet?.userId
  )
    return res.json({ ok: false, error: "본인 글은 리트윗 할 수 없습니다." });
  // 리트윗 아이디는 항상 원본의 트윗 아이디만을 가리키게 함
  const retweetTargetId = existingTweet.retweetId || +tweetId;
  const alreadyRetweetdTweet = await client.tweet.findFirst({
    where: {
      userId: user?.id,
      retweetId: retweetTargetId,
    },
    select: {
      id: true,
    },
  });
  // 리트윗 토글
  if (alreadyRetweetdTweet) {
    await client.tweet.delete({
      where: {
        id: alreadyRetweetdTweet.id,
      },
    });
  } else {
    await client.tweet.create({
      data: {
        payload: "retweet",
        user: {
          connect: {
            id: user?.id,
          },
        },
        retweet: {
          connect: {
            id: retweetTargetId,
          },
        },
      },
    });
  }

  return res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: true,
  })
);
