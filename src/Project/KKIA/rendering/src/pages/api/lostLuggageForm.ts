import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const now = new Date();
      const {
        firstName,
        lastName,
        selectedIDType,
        idNumber,
        category,
        subCategory,
        email,
        phoneNumber,
        terminal,
        lossDate,
        uploadedDocuments,
        additionalInformation,
      } = req.body;
      console.log('API data', req.body);
      const data = JSON.stringify(
        {
          lostDateTime: lossDate,
          attachment: uploadedDocuments,
          attachmentFileName: uploadedDocuments?.fileName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          idType: selectedIDType,
          idNumber: idNumber,
          category: category,
          subCategory: subCategory,
          officeName: 'KKIA',
          location: '7HP8XMHR+PH',
          timestamp: now.toLocaleString(),
          requestId: process.env.NEXT_PUBLIC_LOST_LUGGAGE_REQUEST_ID,
          additionalInfo: additionalInformation,
        },
        (key, value) => {
          return value === null || value === undefined || value === '' ? undefined : value;
        }
      );
      console.log('API data', data);
      const headers = new Headers({
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json',
        Originator: 'KKIA_v2.0',
        api_key: `${process.env.Lost_Found_API_KEY}`,
      });
      const response = await fetch(process.env.Lost_Found_API_URL || '', {
        method: 'POST',
        headers: Object.fromEntries(headers),
        body: data,
      });
      console.log('API response', response);
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        const errorText = await response.text();
        console.error(`Error response: ${errorText}`);
        return res.status(response.status).json({ status: 'error', message: errorText });
      }
      const resText = await response.text();
      const message = resText || 'no message received';
      console.log(`Received message: ${resText}`);
      res.status(200).json({ status: 'success', message: `${message}` });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
