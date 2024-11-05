import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  TextField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import Tag from 'components/atoms/Tag';
import Button from 'components/atoms/Button';
import Container from 'components/atoms/Container';

interface HeroProps {
  props: {
    fields: {
      title?: TextField;
      image?: ImageField;
      tags?: TextField[];
      content?: TextField;
      label?: TextField;
      link?: LinkField;
    };
  };

  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
}

export default function Hero({ props, variant }: HeroProps) {
  if (variant === 'primary') {
    return (
      <Container className="flex flex-col gap-10 py-10 md:flex-row-reverse md:justify-between md:py-14">
        <JssImage
          field={props.fields.image}
          width={620}
          height={320}
          className="h-[320px] w-full object-fill md:max-w-[532px]"
        />
        <div className="flex w-full flex-col gap-6 md:max-w-[532px]">
          <div className="flex flex-col gap-4">
            {props.fields.label && (
              <JssText
                tag="p"
                className="text-body-small-regular uppercase text-text-secondary"
                field={props.fields.label}
              />
            )}
            <JssText
              tag="h1"
              className="text-headline-h1-2 text-text-primary"
              field={props.fields.title}
            />
            {props.fields.content && (
              <JssText
                tag="p"
                className="text-body-medium-regular text-text-secondary"
                field={props.fields.content}
              />
            )}
          </div>
          {props.fields.link ? <Button field={props.fields.link} variant="primary" /> : null}
        </div>
      </Container>
    );
  }

  if (variant === 'secondary') {
    return (
      <div className="relative h-[400px] w-full md:h-[372px]">
        <JssImage
          field={props.fields.image}
          width={1440}
          height={372}
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
        <div className="bg-blue-overlay-3 relative z-10 h-full w-full">
          <Container className="flex h-full w-full py-10 md:py-14">
            <div className="flex w-full flex-col justify-end gap-6">
              {props.fields.tags && (
                <div className="flex flex-wrap gap-2">
                  {props.fields.tags.map((tag, index) => (
                    <Tag key={index} label={tag} variant="default" size="small" />
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-4">
                <JssText
                  tag="h1"
                  className="text-headline-h1 w-fit text-text-invert"
                  field={props.fields.title}
                />
                {props.fields.content && (
                  <JssText
                    tag="p"
                    className="text-body-medium-regular text-text-invert"
                    field={props.fields.content}
                  />
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
  if (variant === 'tertiary') {
    return (
      <div className="relative h-[400px] w-full md:h-[372px]">
        <JssImage
          field={props.fields.image}
          width={1440}
          height={372}
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
        <div className="bg-blue-overlay-3 relative z-10 h-full w-full">
          <Container className="flex h-full w-full py-10 md:py-14">
            <div className="flex w-full flex-col items-center justify-center gap-6">
              {props.fields.tags && (
                <div className="flex flex-wrap gap-2">
                  {props.fields.tags.map((tag, index) => (
                    <Tag key={index} label={tag} variant="default" size="small" />
                  ))}
                </div>
              )}
              <div className="flex max-w-[716px] flex-col gap-4">
                <JssText
                  tag="h1"
                  className="text-headline-h1 w-fit text-text-invert"
                  field={props.fields.title}
                />
                {props.fields.content && (
                  <JssText
                    tag="p"
                    className="text-body-medium-regular text-text-invert"
                    field={props.fields.content}
                  />
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }

  if (variant === 'quaternary') {
    return (
      <div className="bg-surface-secondary relative w-full h-[330px] md:h-[435px] flex flex-col items-center">
        <div className="flex flex-col items-center gap-6 p-14">
          {props.fields.tags && (
            <>
              <div className="hidden flex-wrap gap-2 md:flex">
                {props.fields.tags.map((tag, index) => (
                  <Tag key={index} label={tag} variant="invert" size="large" />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 md:hidden">
                {props.fields.tags.map((tag, index) => (
                  <Tag key={index} label={tag} variant="invert" size="small" />
                ))}
              </div>
            </>
          )}
          <JssText
            tag="h1"
            className="text-headline-h1 w-fit text-text-primary md:text-headline-h1-2"
            field={props.fields.title}
          />
        </div>
        <JssImage
          field={props.fields.image}
          width={1440}
          height={372}
          className="absolute left-[50%] translate-x-[-50%] top-[50%] h-full w-full md:max-w-[1248px] object-cover"
        />
      </div>
    );
  }

  return <div></div>;
}
