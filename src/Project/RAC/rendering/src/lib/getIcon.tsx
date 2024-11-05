import * as Icons from '../components/icons/icons';

export const getIcon = (icon: string) => {
  const IconComponent = Icons[icon as keyof typeof Icons];
  return IconComponent ? <IconComponent /> : null;
};
