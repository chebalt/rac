/**
 * Generates React boilerplate for a component under `src/components`
 * @param componentName - the component name
 * @returns component src boilerplate as a string
 */
function generateComponentSrc(componentName: string): string {
  return `import React from 'react';
import { Text, Field, RichText, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface ${componentName}Props {
  rendering: ComponentRendering;
  fields: {
    heading: Field<string>;
    body: Field<string>;
  };
}

const ${componentName} = (props: ${componentName}Props): JSX.Element => {
  return (
    <div className={\`component\`}>
      <div className="component-content">
        <p>${componentName} Component</p>
        <Text field={props.fields.heading} />
        <RichText field={props.fields.body} />
      </div>
    </div>
  );
};

export default ${componentName};
`;
}

export default generateComponentSrc;
