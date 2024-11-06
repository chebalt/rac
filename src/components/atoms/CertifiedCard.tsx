import { ImageField, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

interface CertificationCardProps {
  field: {
    fields: {
      Image: ImageField;
    };
  };
}

export default function CertificationCard({ field }: CertificationCardProps) {
  return (
    <div className="relative flex h-[181px] w-[294px] items-center justify-center">
      <JssImage
        field={field.fields.Image}
        width={120}
        height={120}
        className="relative z-10 h-auto w-1/2"
      />
      <div className="absolute bottom-0 left-0 z-0 h-[115px] w-full bg-surface-secondary"></div>
    </div>
  );
}
