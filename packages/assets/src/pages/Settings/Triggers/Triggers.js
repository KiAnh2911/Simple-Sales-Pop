import React from 'react';
import {Card, Layout, Select, TextField, TextStyle} from '@shopify/polaris';

const Triggers = ({settings, onChangeInput}) => {
  const options = [
    {
      label: 'All pages',
      value: 'all',
      page: (
        <Layout sectioned>
          <TextField
            label="Excluded pages"
            multiline={4}
            value={settings.excludedUrls}
            onChange={value => onChangeInput('excludedUrls', value)}
            helpText="Page URLs NOT to the pop-up (separted by new lines)"
          />
        </Layout>
      )
    },
    {
      label: 'Specific pages',
      value: 'specific',
      page: (
        <Layout>
          <Layout.Section>
            <TextField
              label="Included pages"
              multiline={4}
              value={settings.includedUrls}
              onChange={value => onChangeInput('includedUrls', value)}
              helpText="Page URLs to the pop-up (separted by new lines)"
            />
          </Layout.Section>
          <Layout.Section>
            <TextField
              label="Excluded pages"
              multiline={4}
              value={settings.excludedUrls}
              onChange={value => onChangeInput('excludedUrls', value)}
              helpText="Page URLs NOT to the pop-up (separted by new lines)"
            />
          </Layout.Section>
        </Layout>
      )
    }
  ];

  return (
    <Card.Section title="Pages Restriction">
      <Select
        options={options}
        onChange={value => onChangeInput('allowShow', value)}
        value={settings.allowShow}
      />
      <div style={{marginBlock: '15px'}}>
        {options.find(option => option.value == settings.allowShow).page}
      </div>
    </Card.Section>
  );
};

export default Triggers;
