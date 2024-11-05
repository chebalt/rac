// Import necessary libraries
import React from 'react';
import { Text14 } from 'src/shared-components/Texts';

type LinkListItem = {
  name: string;
  displayName: string;
  fields: {
    Value: {
      value: string;
    };
  };
};

interface LinkListProps {
  items?: LinkListItem[];
  label: string;
  changeInquiryType: (name: string, value?: string) => void;
}

// Implement the LinkList component
const LinkListItem: React.FC<LinkListProps> = ({ items, label, changeInquiryType }) => {
  return (
    <div className="w-full">
      <Text14>{label}</Text14>
      <select
        className="mb-6 py-1 w-full px-2 mt-1 bg-background-dark"
        onChange={(e) => {
          const selectedItem = items?.find((item) => item.fields.Value.value === e.target.value);
          if (selectedItem) {
            changeInquiryType(selectedItem.name, selectedItem.fields?.Value?.value);
          }
        }}
      >
        {items?.map((item, index) => (
          <option key={index} value={item.fields?.Value?.value}>
            {item?.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LinkListItem;
