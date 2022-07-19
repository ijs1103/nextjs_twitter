import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/withSession";
import withHandler, { ResponseType } from "@libs/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  req.session.destroy();
  res.json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
