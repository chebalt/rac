import Button from 'components/atoms/Button';
import NewsCard from 'components/molecules/NewsCard';
import ArrowRight from 'components/icons/ArrowRight';
import {
  Text as JssText,
  LinkField,
  TextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type News = {
  Title: TextField;
  introText: TextField;
  date: TextField;
  timeToRead: TextField;
  link: LinkField;
  type: TextField;
  image: ImageField;
};

export interface NewsAndAnnouncementsProps {
  fields: {
    title: TextField;
    link: LinkField;
    news: {
      url: string;
      fields: News;
    }[];
  };
}

export default function NewsAndAnnouncements({ fields }: NewsAndAnnouncementsProps) {
  return (
    <div className="mx-auto flex max-w-[1248px] flex-col gap-10 px-4 py-14">
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
        <JssText tag="h2" className="text-headline-h2 text-text-primary" field={fields.title} />
        <Button
          rightIcon={<ArrowRight />}
          className="!justify-start !pl-0"
          field={fields.link}
          variant="tertiary"
        />
      </div>
      <div className="flex flex-col gap-10 md:gap-8 lg:flex-row">
        <div className="lg:w-1/2">
          <NewsCard fields={fields.news[0]} firstNews={true} />
        </div>
        <div className="flex flex-col gap-6 lg:w-1/2">
          {fields.news?.slice(1, 5).map((item, index) => (
            <NewsCard key={index} fields={item} firstNews={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
