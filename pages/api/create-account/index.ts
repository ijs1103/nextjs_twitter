import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { name, nickName, password, phone, email, birth } = req.body;
  const method = phone ? { phone } : email ? { email } : null;
  if (!method) return res.status(400).json({ ok: false });
  const existingUser = await client.user.findFirst({
    where: {
      OR: [{ ...method }],
    },
  });
  if (existingUser)
    return res.json({
      ok: false,
      error: "해당 전화번호 혹은 이메일은 현재 사용중입니다.",
    });
  await client.user.create({
    data: {
      name,
      nickName,
      password,
      ...method,
      birth,
    },
  });

  res.json({
    ok: true,
  });
}

export default withHandler({ methods: ["POST"], handler });
