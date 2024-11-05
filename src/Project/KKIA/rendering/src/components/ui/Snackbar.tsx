import DangerIconSvg from 'assets/icons/DangerIconSvg';
import InfoCircleSvg from 'assets/icons/InfoCircleSvg';
import WarningSvg from 'assets/icons/WarningSvg';
import SuccessSvg from 'assets/icons/SuccessSvg';
import CloseSvg from 'assets/icons/CloseSvg';
import { useState } from 'react';

interface SnackbarProps {
  variant: 'error' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
}

const Snackbar = ({ variant, title, description }: SnackbarProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'error':
        return {
          container: 'border border-border-error bg-surface-error',
          title: 'text-body-normal-bold text-text-error',
          description: 'text-body-normal-regular text-text-error',
          icon: 'text-icon-error fill-icon-error w-[22px] h-[22px] flex-shrink-0',
          closeIcon: 'text-icon-error fill-icon-error w-6 h-6 hidden md:block',
          IconComponent: DangerIconSvg,
        };
      case 'warning':
        return {
          container: 'border border-border-warning bg-surface-warning',
          title: 'text-body-normal-bold text-text-warning',
          description: 'text-body-normal-regular text-text-warning',
          icon: 'text-icon-warning fill-icon-warning w-[22px] h-[22px] flex-shrink-0',
          closeIcon: 'text-icon-warning fill-icon-warning w-6 h-6 hidden md:block',
          IconComponent: WarningSvg,
        };
      case 'info':
        return {
          container: 'border border-border-info bg-surface-info',
          title: 'text-body-normal-bold text-text-info',
          description: 'text-body-normal-regular text-text-info',
          icon: 'text-icon-info fill-icon-info w-[22px] h-[22px] flex-shrink-0',
          closeIcon: 'text-icon-info fill-icon-info w-6 h-6 hidden md:block',
          IconComponent: InfoCircleSvg,
        };
      case 'success':
        return {
          container: 'border border-border-success bg-surface-success',
          title: 'text-body-normal-bold text-text-success',
          description: 'text-body-normal-regular text-text-success',
          icon: 'text-icon-success fill-icon-success w-[22px] h-[22px] flex-shrink-0',
          closeIcon: 'text-icon-success fill-icon-success w-6 h-6 hidden md:block',
          IconComponent: SuccessSvg,
        };
      default:
        return {
          container: '',
          title: '',
          description: '',
          icon: '',
          closeIcon: '',
          IconComponent: null,
        };
    }
  };

  const styles = getVariantStyles(variant);
  const IconComponent = styles.IconComponent;

  if (!isVisible) return null;

  return (
    <div className={`w-full p-4 ${styles.container}`}>
      <div className="flex justify-between">
        <div className="flex gap-3">
          {IconComponent && <IconComponent className={styles.icon} />}
          <div className="flex flex-col gap-3">
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
        <button className={styles.closeIcon} onClick={() => setIsVisible(false)}>
          <CloseSvg />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
