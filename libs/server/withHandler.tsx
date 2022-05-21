import {NextApiRequest, NextApiResponse} from "next";

export interface ResponseType {
    ok: boolean
    [key: string]: any
}

export default function withHandler (
    method: "GET" | "POST" | "DELETE",
    fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
    return async function(req:NextApiRequest, res:NextApiResponse) {
        if (req.method !== method) {
            return res.status(405).end();
        }
        try {
            return await fn(req, res);
        } catch (error) {
            console.log("에러")
            console.log(error)
            return res.status(500).end();
        }
    }
}