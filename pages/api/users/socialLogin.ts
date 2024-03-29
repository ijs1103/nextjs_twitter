import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/client/db";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { email },
  } = req;
  //const session = await unstable_getServerSession(req, res, authOptions);
  const existingUser = await client.user.findUnique({
    where: {
      email,
    },
  });
  req.session.user = {
    id: existingUser?.id as number,
  };
  await req.session.save();
  res.json({ ok: true });
}
export default withApiSession(handler);
