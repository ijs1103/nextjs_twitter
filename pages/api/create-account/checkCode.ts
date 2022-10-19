import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 인증 번호를 db와 대조 및 검증
  const { number, phone, email } = req.body;
  const existingToken = await client.token.findFirst({
    where: {
      number,
      ...(phone && { phone }),
      ...(email && { email }),
    },
  });
  if (!existingToken) return res.json({ ok: false });
  // 확인된 토큰은 삭제
  await client.token.deleteMany({
    where: {
      ...(phone && { phone }),
      ...(email && { email }),
    },
  });
  res.json({ ok: true });
}

export default withHandler({ methods: ["POST"], handler });
