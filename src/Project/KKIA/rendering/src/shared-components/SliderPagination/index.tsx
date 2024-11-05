import Dot from './Dot';
import ProgressCircle from './ProgressCircle';

export default function SliderPagination({
  activePage,
  goToPage,
  progress,
  totalPages,
}: {
  progress: number;
  activePage: number;
  goToPage: (page: number) => void;
  totalPages: number;
}) {
  return (
    <div className="flex items-center text-current">
      {Array.from({ length: totalPages }).map((_, i) => (
        <div
          key={i}
          onClick={() => goToPage(i)}
          className="w-[1.5em] flex justify-center cursor-pointer"
        >
          {activePage === i ? (
            <ProgressCircle
              dotComponent={<Dot className="bg-primary-variant" />}
              progress={progress}
            />
          ) : (
            <Dot className="bg-muted-variant" />
          )}
        </div>
      ))}
    </div>
  );
}
