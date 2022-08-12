import Ably from "ably/promises";
import { parseCookies } from "nookies";

export default async function handler(req, res) {
    const client = new Ably.Realtime(process.env.ABLY_API_KEY);
    const jwt = parseCookies()
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: jwt.OursiteJWT });
    res.status(200).json(tokenRequestData);
};