// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";

const stripeWebhook: NextApiHandler = async (req, res) => {

    console.log(req.body)

    res.status(204).end()
}
export default stripeWebhook;
