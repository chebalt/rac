import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const secret = process.env.RECAPTCHA_PRIVATE_SECRET_KEY;
    const { response } = req.query;
    const fetchQuery = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const apiResponse = await fetchQuery.json();
    console.log(apiResponse);
    res.status(200).json({ success: apiResponse?.success });
  } catch (error: any) {
    res.status(500).json({ success: false });
  }
}
