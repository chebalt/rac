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
  title: TextField;
  description: TextField;
  date: TextField;
  timeToRead: TextField;
  link: LinkField;
  type: TextField;
  image: ImageField;
};

export interface NewsAndAnnouncementsProps {
  props: {
    fields: {
      title: TextField;
      link: LinkField;
      news: News[];
    };
  };
}

export default function NewsAndAnnouncements({ props }: NewsAndAnnouncementsProps) {
  return (
    <div className="mx-auto flex max-w-[1248px] flex-col gap-10 px-4 py-14">
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
        <JssText
          tag="h2"
          className="text-headline-h2 text-text-primary"
          field={props.fields.title}
        />
        <Button
          rightIcon={<ArrowRight />}
          className="!justify-start !pl-0"
          field={props.fields.link}
        />
      </div>
      <div className="flex flex-col gap-10 md:gap-8 lg:flex-row">
        <div className="lg:w-1/2">
          <NewsCard news={props.fields.news[0]} firstNews={true} />
        </div>
        <div className="flex flex-col gap-6 lg:w-1/2">
          {props.fields.news.slice(1, 5).map((item, index) => (
            <NewsCard key={index} news={item} firstNews={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
