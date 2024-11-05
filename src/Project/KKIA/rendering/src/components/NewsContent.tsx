import {
  RichText as JssRichText,
  DateField as JssDateField,
  Text as JssText,
  ComponentRendering,
  RichTextField,
  LinkField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { format } from 'date-fns';

import ShareIcon from '../assets/icons/ShareIcon';
import FacebookIcon from '../assets/icons/FacebookIcon';
import TwitterIcon from '../assets/icons/TwitterIcon';
import LinkedInIcon from '../assets/icons/LinkedInIcon';
import { useEffect, useState } from 'react';

type NewsProps = {
  fields: {
    NewsContent: RichTextField;
    Link: LinkField;
    'Publication Date': {
      value?: string;
      editable?: string;
    };
    NewsAuthor: TextField;
  };
};

interface NewsContentProps {
  rendering: ComponentRendering;
  fields: {
    News: NewsProps;
  };
}

const NewsContent = (props: NewsContentProps): JSX.Element => {
  const { News } = props.fields;
  const { t } = useI18n();

  const [facebookLink, setFacebookLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');

  useEffect(() => {
    const currentUrl = window.location.href;
    setFacebookLink(`https://www.facebook.com/sharer.php?u=${currentUrl}`);
    setTwitterLink(`https://twitter.com/share?url=${currentUrl}`);
    setLinkedinLink(`https://www.linkedin.com/shareArticle?mini=true&amp;url=${currentUrl}`);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between pb-4 border-b border-border-primary w-[90%] md:w-full md:max-w-[1240px] mx-auto">
        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-text-secondary text-body-normal-regular">
              {t('kkia-news-content-publishedOn')}
            </p>
            <JssDateField
              field={props.fields.News.fields['Publication Date']}
              render={(date) => (date ? format(new Date(date), 'dd MMM yyyy').toUpperCase() : '')}
              className="text-text-secondary text-body-small-bold"
            />
            <JssText
              field={props.fields.News.fields.NewsAuthor}
              tag="p"
              className="text-text-secondary text-body-small-bold"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-text-secondary text-body-normal-regular">
            {t('kkia-news-content-shareVia')}
          </p>
          <div className="flex flex-row gap-6">
            <a href={facebookLink}>
              <FacebookIcon className="w-5 h-5 cursor-pointer text-icon-primary" />
            </a>
            <a href={twitterLink}>
              <TwitterIcon className="w-5 h-5 cursor-pointer text-icon-primary" />
            </a>
            <a href={linkedinLink}>
              <LinkedInIcon className="w-5 h-5 cursor-pointer text-icon-primary" />
            </a>
            <div className="h-5 border-l border-border-primary"></div>
            <ShareIcon className="w-5 h-5 cursor-pointer text-icon-primary" />
          </div>
        </div>
      </div>
      <div className="w-[90%] md:w-full md:max-w-[1240px] mx-auto pb-10 md:pb-14">
        <div className="w-full md:max-w-[816px] mx-auto">
          <JssRichText field={News.fields.NewsContent} />
        </div>
      </div>
    </div>
  );
};

export default NewsContent;
