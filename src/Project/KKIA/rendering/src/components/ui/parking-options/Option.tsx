import { ParkingPageFields } from 'components/ParkingOptions';
import { useI18n } from 'next-localization';
import CustomCard from 'src/shared-components/CustomCard';

export default function Option({
  fields,
  itemUrl,
}: {
  fields: ParkingPageFields;
  itemUrl: string;
}): JSX.Element {
  const { t } = useI18n();
  return (
    <CustomCard
      title={fields.Name}
      routesGuides={fields['Route Guides']}
      image={fields.Image}
      location={fields.Location}
      infoList={fields.Information}
      btnText={t('parkingoptions-readMore')}
      btnUrl={itemUrl}
    />
  );
}
