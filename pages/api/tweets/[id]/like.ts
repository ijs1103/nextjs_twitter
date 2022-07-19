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
  const existingLike = await client.like.findFirst({
    where: {
      userId: user?.id,
      tweetId: +id.toString(),
    },
  });
  if (existingLike) {
    await client.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await client.like.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: true,
  })
);
