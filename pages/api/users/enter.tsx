import {NextApiRequest, NextApiResponse} from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    const { email, phone } = req.body
    const user = phone ? {phone: +phone} : {email}

    const token = await client.token.create({
        data: {
            payload: "1234",
            user: {
                connectOrCreate: {
                    where: {
                        ...user
                    },
                    create: {
                        ...user,
                        name: "아무개"
                    }
                }
            }
        }
    });

    console.log(token)

    return res.status(200).end();
}

export default withHandler("POST", handler);