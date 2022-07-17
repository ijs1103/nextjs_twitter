import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
	ok: boolean;
	[key: string]: any;
}

type method = 'GET' | 'POST' | 'DELETE';

interface ConfigType {
	methods: method[];
	handler: (req: NextApiRequest, res: NextApiResponse) => void;
	isPrivate?: boolean;
}

export default function withHandler({methods, handler, isPrivate=true}: ConfigType) {
	return async function(req: NextApiRequest, res: NextApiResponse): Promise<any> {
		if (req.method && !methods.includes(req.method as any)) res.status(405).end();
		if (isPrivate && !req.session.user) res.status(401).json({ ok: false, error: '로그인이 필요합니다.'});
		try {
			handler(req, res);
		} catch (error) {
			return res.status(500).json({ error });
		}
	}
}