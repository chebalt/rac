import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nameFamilyName, email, message, phoneNumber, inquiryType } = req.body;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_SERVER_USERNAME,
        pass: process.env.SMTP_SERVER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    transporter.verify(function (error, success) {
      if (error) {
        console.error('SMTP Connection Error:', error);
        res.status(500).json({ message: 'SMTP connection failed', error });
        return;
      } else {
        console.log('SMTP Connection Success');
      }
    });

    try {
      const emailResponse = await transporter.sendMail({
        from: `${email}`,
        to: process.env.SITE_MAIL_RECIEVER,
        subject: `${inquiryType}`,
        text: `${nameFamilyName} (${email})\n\n${message}`,
        html: `
                <p>Full Name:</p>
                <p>${nameFamilyName}</p>
                <p>Email:</p>
                <p>${email}</p>
                <p>Phone Number :</p>
                <p>${phoneNumber}</p>
                <p>Message:</p>
                <p>${message}</p>
              `,
        headers: {
          'X-PM-Message-Stream': 'outbound',
        },
      });

      console.log('Email Response:', emailResponse);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error Sending Email:', error);
      res.status(500).json({ message: 'Error sending email', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
