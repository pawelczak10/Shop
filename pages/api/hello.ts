// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import type { NextApiHandler } from "next";
import { responsePathAsArray } from "graphql";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.setHeader("Allow", "POST").status(405).json({});
  }
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
  const email = req.body.email;

  if (typeof email !== "string") {
    return res.status(400).json({});
  }
  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    return res.status(500).json({ error: `Something went wrong!` });
  }
  console.log("TEST")
  console.log(MAILERLITE_API_KEY);
  console.log(MAILERLITE_GROUP_ID);

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-MailerLite-ApiKey": MAILERLITE_API_KEY,
    },
    body: JSON.stringify({
      email,
    }),
  };

  const response = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`,
    options
  );
  console.log(response);
  if (!response.ok) {
    return res.status(500).json({
      error: "Pojawił sie problem",
    });
  }
  return res.status(201).json({});
  // const json = await response.json();
};

export default handler;
