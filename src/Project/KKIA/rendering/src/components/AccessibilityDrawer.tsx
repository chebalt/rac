import React from 'react';
import { useI18n } from 'next-localization';

const ComponentContent = () => {
  const { t } = useI18n();

  // Function to send a message to the parent window
  const callParentFunction = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('onChange event fired'); // Debugging log for the onChange event
    const selectedOption = event.target.value;
    console.log('Selected Option:', selectedOption); // Debugging log for the selected value

    // Check if activateAccessibility is defined before calling it
    if (typeof window.activateAccessibility === 'function') {
      window.activateAccessibility(selectedOption);
    } else {
      console.error('activateAccessibility function is not defined');
    }
  };

  return (
    <div>
      <div className="component-content">
        <p>Accessibility Drawer</p>
        <p>Numbered as on the task image</p>
        <p>Drawer Title - 1: {t('accessibility-drawerTitle')}</p>
        <p>Options Text - 2: {t('accessibility-optionsText')}</p>
        <select onChange={callParentFunction}>
          <option value="biggerText">Bigger Text - 3: {t('accessibility-biggerText')}</option>
          <option value="smallerText">Smaller Text - 4: {t('accessibility-smallerText')}</option>
          <option value="signLanguage">Sign Language - 5: {t('accessibility-signLanguage')}</option>
          <option value="websiteReader">
            Website Reader - 6: {t('accessibility-websiteReader')}
          </option>
          <option value="assistUsingSite">
            Assist Using Site - 7: {t('accessibility-assistUsingSite')}
          </option>
          <option value="colorInversion">
            Color Inversion - 8: {t('accessibility-colorInversion')}
          </option>
        </select>
      </div>
    </div>
  );
};

export const Default = (): JSX.Element => {
  return <ComponentContent />;
};
