import { GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  itemId: string;
  language: string;
}
interface ItemUrlResponse {
  item: {
    url: {
      path: string;
    };
  };
}

interface ResponseData {
  url?: string | null;
  error?: string;
}

const query = `
  query GetItemUrl($path: String!, $language: String!) {
    item(path: $path, language: $language) {
      url {
        path
      }
    }
  }
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { itemId, language } = req.body as RequestBody;

  if (!itemId || !language) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const graphQLClient = new GraphQLClient(process.env.GRAPH_QL_ENDPOINT!, {
    method: 'POST',
  });
  graphQLClient.setHeader('Content-Type', 'application/json');
  graphQLClient.setHeader('sc_apikey', process.env.SITECORE_API_KEY!);

  const variables = { path: itemId, language };

  try {
    const data: ItemUrlResponse = await graphQLClient.request(query, variables);
    const url = data?.item?.url?.path || null;
    res.status(200).json({ url });
  } catch (error: any) {
    console.error('Error fetching item URL:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
