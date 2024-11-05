import { Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

export default function Item({
  title,
  value,
  icon,
}: {
  title: string;
  value: TextField;
  icon: JSX.Element;
}) {
  return (
    <div className="h-[104px] w-full bg-jade-light p-6 flex items-center mt-6 xl:mt-0">
      <div className="text-primary-dark-green text-2xl mr-6 w-12 h-12 bg-white rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h6 className="font-normal text-base text-muted-darkest">{title}</h6>
        <h5>
          <Text field={value} />
        </h5>
      </div>
    </div>
  );
}
