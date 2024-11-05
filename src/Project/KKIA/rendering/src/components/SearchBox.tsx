import { useState } from 'react';
import SectionPaddingWrapper from 'src/shared-components/SectionPaddingWrapper';

import SearchResultsWithLoadMore from './sitecore-search/SearchResultsWithLoadMore';

import { useRouter } from 'next/router';

const SearchBox = (): JSX.Element => {
  const router = useRouter();
  const { q } = router.query;
  const [searchQuery, setSearchQuery] = useState<string>((Array.isArray(q) ? q[0] : q) || '');

  return (
    <>
      <SectionPaddingWrapper className="py-10 md:py-14">
        <SearchResultsWithLoadMore
          rfkId="rfkid_7"
          defaultKeyphrase={searchQuery}
          defaultItemsPerPage={10}
        />
      </SectionPaddingWrapper>
    </>
  );
};

export default SearchBox;
