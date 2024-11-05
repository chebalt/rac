import SectionPaddingWrapper from '../shared-components/SectionPaddingWrapper';
import ChevronRight from 'assets/icons/ChevronRight';
import Home from 'assets/icons/Home';
import useIsClient from 'src/hooks/useIsClient';

interface BreadcrumbProps {
  params: { [key: string]: string };
  fields: {
    data: {
      currentItem: {
        url: {
          path: string;
        };
      };
    };
  };
}

const getLanguageSegment = (pathname: string): string => {
  // Regular expression to match /xx-xx/ at the beginning of the pathname
  const languageSegmentRegex = /^\/[a-z]{2}(?:-[a-z]{2})?\//i;
  const match = pathname.match(languageSegmentRegex);
  return match ? match[0] : '/';
};

const Breadcrumbs = ({ params, fields }: BreadcrumbProps) => {
  const isClient = useIsClient();
  const { currentItem } = fields.data || {};
  const id = params?.RenderingIdentifier || undefined;
  const maxBreadcrumbLength = 48;

  const pathFromWindow = typeof window !== 'undefined' ? window.location.pathname : '';
  const firstSegment = pathFromWindow.split('/').filter(Boolean)[0] || '';

  const sitecorePath = currentItem?.url?.path || '';
  let segments = sitecorePath.split('/').filter(Boolean);

  segments = segments.filter((segment, index) => segments.indexOf(segment) === index);

  const homePath = getLanguageSegment(`/${firstSegment}/`);

  if (!isClient) {
    return null;
  }

  return (
    <SectionPaddingWrapper className="py-[1.5rem] max-xl:mt-[72px]">
      <ul className="flex items-center space-x-2" id={id}>
        <li key="home" className="flex items-center">
          <a
            href={homePath}
            className="text-icon-action-secondary-default hover:text-icon-action-secondary-hover active:text-icon-action-secondary-press focus:outline-none focus:ring-2 focus:ring-border-action-focus"
          >
            <Home className="w-6 h-6" />
          </a>
        </li>
        {segments.map((segment, index) => {
          const decodedSegment = decodeURIComponent(segment);
          const segmentLabel = decodedSegment.replace(/-/g, ' ');
          const segmentLabelFormatted =
            segmentLabel.length > maxBreadcrumbLength
              ? `${segmentLabel.substring(0, maxBreadcrumbLength)}...`
              : segmentLabel;
          let segmentPath = segments.slice(0, index + 1).join('/');
          segmentPath = homePath !== '/' ? `${homePath}${segmentPath}` : `/${segmentPath}`;
          const isLast = index === segments.length - 1;
          return (
            <li className="flex items-center" key={segment}>
              <ChevronRight className="w-5 h-5 mr-2 text-text-secondary" />

              <a
                href={segmentPath}
                className={`${
                  isLast
                    ? 'text-body-small-regular cursor-default'
                    : 'text-body-small-light hover:border-background'
                } text-text-secondary border-b border-background hover:border-border-action-primary-hover active:outline active:outline-1 active:outline-border-action-primary-press focus:outline-none focus:ring-2 focus:ring-border-action-focus`}
              >
                {segmentLabelFormatted}
              </a>
            </li>
          );
        })}
      </ul>
    </SectionPaddingWrapper>
  );
};

export default Breadcrumbs;
