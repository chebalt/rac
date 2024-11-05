import ArrowInCircle from 'assets/icons/ArrowInCircle';
import clsx from 'clsx';
const ArrowGroup = ({
  nextBtnClassName,
  prevBtnClassName,
  arrowWidth,
  arrowHeight,
  customArrowClass,
}: {
  nextBtnClassName: string;
  prevBtnClassName: string;
  arrowWidth?: string;
  arrowHeight?: string;
  customArrowClass?: string;
}) => {
  const hoverAnimation = 'transition-opacity duration-500 ease-in-out opacity-70 hover:opacity-100';
  return (
    <div className="w-full flex gap-2 justify-between text-[0.67rem]">
      <div className={clsx('cursor-pointer rotate-180', hoverAnimation, prevBtnClassName)}>
        <ArrowInCircle className={customArrowClass} width={arrowWidth} height={arrowHeight} />
      </div>
      <div className={clsx('cursor-pointer', hoverAnimation, nextBtnClassName)}>
        <ArrowInCircle className={customArrowClass} width={arrowWidth} height={arrowHeight} />
      </div>
    </div>
  );
};

export default ArrowGroup;
