import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client/db";
import smtpTransport from "@libs/client/email";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  // 이메일, 전화번호 둘다 존재하지 않으면 얼리 리턴
  if (!phone && !email) return res.status(400).json({ ok: false });
  const number = Math.floor(100000 + Math.random() * 900000) + "";
  await client.token.create({
    data: {
      number,
      ...(phone && { phone }),
      ...(email && { email }),
    },
  });

  if (phone) {
    const twilioClient = twilio(
      process.env.NEXT_PUBLIC_TWILIO_SID,
      process.env.NEXT_PUBLIC_TWILIO_TOKEN
    );
    await twilioClient.messages.create({
      messagingServiceSid: process.env.NEXT_PUBLIC_TWILIO_MSID,
      to: process.env.NEXT_PUBLIC_MY_PHONE!,
      body: `회원가입 인증번호는 ${number} 입니다.`,
    });
  }

  if (email) {
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_MAIL_ID,
      to: email,
      subject: "Next Twitter Authentication Email",
      text: `Authentication Code : ${number}`,
    };
    await new Promise((resolve, reject) => {
      smtpTransport.sendMail(mailOptions, (error, responses) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(responses);
          resolve(responses);
        }
      });
    });
    smtpTransport.close();
  }
  return res.json({
    ok: true,
  });
}

export default withHandler({ methods: ["POST"], handler });
