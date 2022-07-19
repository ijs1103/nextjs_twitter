import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/withHandler";
import client from "@libs/db";
import { withApiSession } from "@libs/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email, password } = req.body;
  const method = phone ? { phone } : email ? { email } : null;
  const existingUser = await client.user.findFirst({
    where: {
      ...method,
      password,
    },
  });
  if (!existingUser)
    return res.json({
      ok: false,
      error: "올바르지 않은 휴대폰 번호, 이메일 혹은 비밀번호입니다.",
    });
  req.session.user = {
    id: existingUser.id,
  };
  await req.session.save();
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
