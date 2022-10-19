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
  const updatedComment = await client.comment.update({
    where: {
      id: +id.toString(),
    },
    data: {
      payload,
    },
  });
  if (!updatedComment) {
    return res.json({ ok: false, error: "해당 댓글은 삭제되었습니다!" });
  }
  res.json({ ok: true, newPayload: payload });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
