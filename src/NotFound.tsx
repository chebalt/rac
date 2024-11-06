import Head from 'next/head';
import Button from 'components/atoms/Button';

/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: NotFound</title>
    </Head>
    <div className="flex h-[500px] w-full flex-col items-center justify-center gap-4">
      <p className="text-body-large-bold">Page not found</p>
      <Button url="/" label="Go back to the home page" variant="tertiary" />
    </div>
  </>
);

export default NotFound;
