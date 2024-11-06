// This component was generated by @sitecore-search/cli on Tue Oct 29 2024 11:56:41 GMT+0100 (czas środkowoeuropejski standardowy)

type SearchLoadMoreProgressProps = { total: number; current: number };

const SearchLoadMoreProgress = ({ total, current }: SearchLoadMoreProgressProps) => (
  <div className="h-[10px] w-[200px] p-0 rounded bg-[#ddd]">
    <span
      className="bg-[#6a8ba3] block h-full rounded"
      style={{ width: `${(current / (total || 1)) * 100}%` }}
    />
  </div>
);

export default SearchLoadMoreProgress;