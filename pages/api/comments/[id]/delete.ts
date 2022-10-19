import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/db";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;
  const deletedComment = await client.comment.delete({
    where: {
      id: +id.toString(),
    },
  });
  if (!deletedComment) {
    return res.json({ ok: false, error: "해당 댓글은 삭제되었습니다!" });
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["DELETE"],
    handler,
  })
);
