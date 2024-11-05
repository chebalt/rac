import { TextField, Text as JssText } from '@sitecore-jss/sitecore-jss-nextjs';
import CarIconSvg from 'assets/icons/CarIconSvg';
import Image from 'next/image';

type PriceComponentProps = {
  title?: TextField;
  subtitle?: TextField;
  description?: TextField;
  rightBoxTitle?: TextField;
  rightBoxDescription?: TextField;
  t: (key: string) => string;
  price: boolean;
  revealPrices: () => void;
};

const chevronUp = (
  <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

const chevronDown = (
  <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

const PriceComponent: React.FC<PriceComponentProps> = ({
  title,
  subtitle,
  description,
  rightBoxTitle,
  rightBoxDescription,
  t,
  price,
  revealPrices,
}: PriceComponentProps) => {
  return (
    <div className="flex flex-row gap-[3.5rem] justify-between items-start max-xl:flex-wrap rtl:flex-row-reverse">
      <div className="flex flex-row gap-[1.5rem] items-start max-xl:flex-wrap max-xl:w-full rtl:flex-row-reverse">
        <img
          className="max-xl:max-h-[186px] max-xl:w-full max-xl:object-cover"
          src="/icons/parking-fee-car.svg"
          alt="parking fee car"
        />
        <div className="flex flex-col gap-[1.5rem]">
          <div className="flex flex-col gap-[1rem] rtl:items-end">
            <div className="flex gap-[0.5rem] items-center">
              <CarIconSvg />
              <h1 className="text-[0.875rem] text-muted-darker uppercase">
                <JssText field={title} />
              </h1>
            </div>
            <h2 className="text-[2rem] text-jade-darkest font-bold">
              <JssText field={subtitle} />
            </h2>
            <p className="text-[1.125rem] text-muted-darker">
              <JssText field={description} />
            </p>
          </div>
          <button
            onClick={revealPrices}
            className="text-primary-dark-green font-bold text-[1.125rem] w-fit flex items-center gap-[0.5rem] rtl:w-full rtl:justify-end"
          >
            {price ? <>Hide prices {chevronUp}</> : <>Check prices {chevronDown}</>}
          </button>
        </div>
      </div>
      <div className="max-xl:w-full p-[1.5rem] max-xl:p-[1rem]">
        <div className="flex flex-col gap-[1.875rem]">
          <div className="flex flex-row justify-start gap-[0.75rem] rtl:flex-row-reverse">
            <img
              className="h-fit"
              src="/icons/parking-fee-debit-card-icon.svg"
              alt="parking fee debit card icon"
            />
            <div className="flex flex-col gap-[0.5rem]">
              <h3 className="text-jade-darkest text-[0.875rem]">
                <JssText field={rightBoxTitle} />
              </h3>
              <p className="text-[0.75rem] text-muted-darker">
                <JssText field={rightBoxDescription} />
              </p>
            </div>
          </div>
          <div>
            <p className="uppercase text-label-regular mb-[0.5rem]">
              {t('parkingfeecalculator-paymentMethods')}
            </p>
            <div className="flex flex-row gap-[0.5rem] rtl:justify-end">
              <div className="border-[#D9D9D9] border rounded-[0.15625rem] flex justify-center items-center p-2 w-full">
                <Image src="/icons/visa-logo.svg" alt="visa icon" width={36} height={24} />
              </div>
              <div className="border-[#D9D9D9] border rounded-[0.15625rem] flex justify-center items-center p-2 w-full">
                <Image
                  src="/icons/mastercard-logo.svg"
                  alt="mastercard icon"
                  width={36}
                  height={24}
                />
              </div>
              <div className="border-[#D9D9D9] border rounded-[0.15625rem] flex justify-center items-center p-2 w-full">
                <Image src="/icons/applepay-logo.svg" alt="apple pay icon" width={36} height={24} />
              </div>
              <div className="border-[#D9D9D9] border rounded-[0.15625rem] flex justify-center items-center p-2 w-full">
                <Image src="/icons/mada-logo.svg" alt="mada icon" width={36} height={24} />
              </div>
              <div className="border-[#D9D9D9] border rounded-[0.15625rem] flex justify-center items-center p-2 w-full">
                <Image src="/icons/stc-logo.svg" alt="stc icon" width={36} height={24} />
              </div>
              <div className="border-[#D9D9D9] border rounded-[0.15625rem] flex justify-center items-center p-2 w-full">
                <Image src="/icons/urpay-logo.svg" alt="urpay icon" width={36} height={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceComponent;
