import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { ResponseType } from "@libs/withHandler";

const s3 = new S3({
  region: "ap-northeast-2",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    const { name, type } = req.body;
    const objectName = `twitter_photos/${name}-${Date.now()}`;
    const fileParams = {
      Bucket: "seaagainuploads",
      Key: objectName,
      Expires: 600,
      ContentType: type,
    };
    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    return res.json({ ok: true, url, objectName });
  } catch (error) {
    console.error(error);
    return res.json({ ok: false, error });
  }
}
