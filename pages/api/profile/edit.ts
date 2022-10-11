import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/withHandler";
import client from "@libs/db";
import { withApiSession } from "@libs/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  const newAvatar = req.body.avatar;
  const newNickName = req.body.nickName;

  await client.user.update({
    where: {
      id: user?.id,
    },
    data: {
      ...(newNickName && { nickName: newNickName }),
      ...(newAvatar && { image: newAvatar }),
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
