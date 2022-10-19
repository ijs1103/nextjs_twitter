import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/db";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    body: { payload },
  } = req;
  const updatedTweet = await client.tweet.update({
    where: {
      id: +id.toString(),
    },
    data: {
      payload,
    },
  });
  if (!updatedTweet) {
    return res.json({ ok: false, error: "해당 트윗은 삭제되었습니다!" });
  }
  res.json({ ok: true, newPayload: payload });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
