import { RouteData } from '@sitecore-jss/sitecore-jss-nextjs';
import Layout from 'src/Layout';
import DestinationLayout from 'src/DestinationDetailLayout';
import FlightDetailLayout from 'src/FlightDetailLayout';

const layoutMap = new Map();
layoutMap.set('{88A4771B-DBCC-4281-84A1-C672276A341B}', DestinationLayout);
layoutMap.set('{5EA8E580-9B31-4947-8D25-38C07ACBC509}', FlightDetailLayout);
layoutMap.set('default', Layout);

export function resolveLayout(routeData: RouteData) {
  const layoutId = `{${routeData?.layoutId?.toUpperCase()}}`;
  const layout = layoutMap.get(layoutId);
  return layout || layoutMap.get('default');
}
