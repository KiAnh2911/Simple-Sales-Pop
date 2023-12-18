import React, {useCallback, useState} from 'react';
import {Card, Layout, Page, Tabs} from '@shopify/polaris';
import {defaultSettings} from '../../helpers/defaultSettings';
import DisplayDesktopPostion from './Display/DisplayDesktopPostion';
import Restriction from './Triggers/Restriction';
import {NotificationPopup} from '../../components/NotificationPopup/NotificationPopup';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [valueSetting, setValueSetting] = useState(defaultSettings);
  const items = {
    id: '3',
    firstName: 'John Doe 3',
    city: 'New York 3',
    country: 'United States 3',
    timestamp: 'a day ago',
    productName: 'Puffer Jacket With Hidden Hood 3',
    productImage:
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
  };

  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

  const onChangeInput = (key, value) =>
    setValueSetting(prev => ({
      ...prev,
      [key]: value
    }));

  const handleSaveSettings = () => {
    console.log('save');
    console.log(valueSetting);
  };

  const tabs = [
    {
      id: 'display',
      content: 'Display',
      panelID: 'display',
      contentTab: <DisplayDesktopPostion settings={valueSetting} onChangeInput={onChangeInput} />
    },
    {
      id: 'triggers',
      content: 'Triggers',
      panelID: 'triggers',
      contentTab: <Restriction settings={valueSetting} onChangeInput={onChangeInput} />
    }
  ];

  return (
    <Page
      title="Settings"
      fullWidth
      subtitle="Decide how your notifications will display"
      primaryAction={{content: 'Save', onAction: () => handleSaveSettings()}}
    >
      <Layout>
        <Layout.Section oneThird>
          <Card sectioned>
            <NotificationPopup
              city={items.city}
              country={items.country}
              firstName={items.firstName}
              productImage={items.productImage}
              productName={items.productName}
              timestamp={items.timestamp}
            ></NotificationPopup>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              {tabs[selected].contentTab}
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
