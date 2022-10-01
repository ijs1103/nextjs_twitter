import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/withHandler";
import client from "@libs/db";
import { withApiSession } from "@libs/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { id },
  } = req;
  const existingUser = await client.user.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!existingUser) {
    return {
      ok: false,
      error: "팔로우 할 유저가 존재하지 않습니다.",
    };
  }
  await client.user.update({
    where: {
      id: req.session.user?.id,
    },
    data: {
      following: {
        connect: {
          id,
        },
      },
    },
  });

  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: true,
  })
);
