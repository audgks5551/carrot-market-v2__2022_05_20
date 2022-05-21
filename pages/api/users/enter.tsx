import {NextApiRequest, NextApiResponse} from "next";
import withHandler from "@libs/server/withHandler";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.json({execute: true});
}

export default withHandler("POST", handler);