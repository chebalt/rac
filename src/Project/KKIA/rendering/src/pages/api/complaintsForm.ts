import type { NextApiRequest, NextApiResponse } from 'next';

type authData = {
  access_token: string;
  token_type: string;
  expires_in: string;
  scope: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  //TODO add to .env file
  // const token = process.env.PRIVATE_TOKEN;
  const username = 'KKIATest';
  const password = 'kkia@nT36t';
  const encodedCredentials = btoa(`${username}:${password}`);
  let token = '';
  let clientId = '';
  let ticketId = '';
  const url =
    'https://oauthasservices-z42d7h252y.sa1.hana.ondemand.com/oauth2/api/v1/token?grant_type=client_credentials';
  const createCustomerUrl =
    'https://l650375-iflmap.hcisbp.sa1.hana.ondemand.com/http/IndividualCustomer';
  const ticketUrl = 'https://l650375-iflmap.hcisbp.sa1.hana.ondemand.com/http/Ticket';

  try {
    const headers = new Headers({
      Authorization: `Basic ${encodedCredentials}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: Object.fromEntries(headers),
    });
    const data: authData = await response.json();
    token = data.access_token;
    if (token) {
      const customerheaders = new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json',
      });
      const raw = JSON.stringify({
        RoleCode: 'CRM000',
        FirstName: 'Abhimanyu',
        LastName: 'Raj',
        GenderCode: '1',
        CountryCode: 'AE',
        Phone: '+918788824012',
        Email: 'araj@rac.sa',
      });
      const customerResponse = await fetch(createCustomerUrl, {
        method: 'POST',
        headers: Object.fromEntries(customerheaders),
        body: raw,
      });
      const xmlText = await customerResponse.text();
      const regexPattern = /<d:CustomerID>(.*?)<\/d:CustomerID>/g;
      const matches = xmlText.match(regexPattern);
      matches?.forEach((match) => {
        clientId = match.replace(/<d:CustomerID>|<\/d:CustomerID>/g, '');
      });
      if (clientId && token) {
        const tiketheaders = new Headers({
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, text/plain',
          'Content-Type': 'application/json',
        });
        const raw = JSON.stringify({
          ProcessingTypeCode: 'SRRQ',
          Name: 'CPI Test',
          BuyerPartyID: '1161254',
          ReportedPartyID: '8000000013',
          ServiceIssueCategoryID: 'CA_1',
        });
        const ticketResponse = await fetch(ticketUrl, {
          method: 'POST',
          headers: Object.fromEntries(tiketheaders),
          body: raw,
        });
        const xmlText = await ticketResponse.text();
        const regexPattern = /<d:ID>(.*?)<\/d:ID>/g;
        const matches = xmlText.match(regexPattern);
        matches?.forEach((match) => {
          ticketId = match.replace(/<d:ID>|<\/d:ID>/g, '');
        });
      }
      res.status(200).json({ ticketId });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return res.status(500).json({ message: 'Error occurred: ' + message });
  }
}
