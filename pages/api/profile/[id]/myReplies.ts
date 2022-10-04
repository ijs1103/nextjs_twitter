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
  const allComments = await client.comment.findMany({
    where: {
      userId: +id,
    },
    select: {
      id: true,
    },
  });
  const comments = await client.comment.findMany({
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
          nickName: true,
          avatar: true,
        },
      },
      tweet: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return res.json({
    ok: true,
    comments,
    total: allComments.length,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
