import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/db";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
      body: { payload },
			query: { id },
      session: { user },
    } = req;
    const comment = await client.comment.create({
      data: {
        payload,
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: +id
          },
        },
      },
    });
    return res.json({
      ok: true,
      comment,
    });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
