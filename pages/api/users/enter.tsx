import {NextApiRequest, NextApiResponse} from "next";
import withHandler, {ResponseType} from "@libs/server/withHandler";
import client from "@libs/server/client";
import twilio from "twilio";
const twilioClient = twilio(process.env.TWILIO_ID, process.env.TWILIO_TOKEN)
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { email, phone } = req.body
    const user = phone ? {phone: +phone} : email ? {email} : null;
    if (!user) return res.status(400).end();
    const payload = Math.floor(100000 + Math.random() * 900000) + "";

    const token = await client.token.create({
        data: {
            payload,
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
    if (phone) {
        const message = await twilioClient.messages.create({
            messagingServiceSid: process.env.TWILIO_MESSAGE_ID,
            to: process.env.PHONE_NUMBER!,
            body: `확인 번호 [${payload}]`
        })
        console.log(message)
    }

    console.log(token)

    return res.json({
        ok: true,
    });
}

export default withHandler("POST", handler);