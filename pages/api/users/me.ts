import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/withHandler";
import client from "@libs/db";
import { withApiSession } from "@libs/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  if (!profile) res.json({ ok: false });
  res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
