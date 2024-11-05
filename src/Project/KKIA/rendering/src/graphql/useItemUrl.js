import { useContext, useState, useEffect } from 'react';
import { SitecoreContextReactContext } from '@sitecore-jss/sitecore-jss-react';

export const useItemUrl = (itemId) => {
  const [urlData, setUrlData] = useState({ url: undefined, loading: true, error: null });
   const sitecoreContext = useContext(SitecoreContextReactContext);
   const language = sitecoreContext.sitecore?.context?.language || 'en';
  useEffect(() => {
    const fetchItemUrl = async () => {
      try {
        const response = await fetch('/api/itemUrl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId, language }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch item URL');
        }

        const data = await response.json();
        setUrlData({ url: data.url, loading: false, error: null });
      } catch (error) {
        console.error('Error fetching item URL:', error);
        console.error('GRAPH_QL_ENDPOINT:', process.env.GRAPH_QL_ENDPOINT);
        setUrlData({ url: undefined, loading: false, error });
      }
    };
    fetchItemUrl();
  }, [itemId, language]);
  return urlData;
};
