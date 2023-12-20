import React, {useCallback, useState} from 'react';
import {Card, Layout, Page, Tabs, SkeletonBodyText} from '@shopify/polaris';
import {NotificationPopup} from '../../components/NotificationPopup/NotificationPopup';
import {defaultSettings} from '../../helpers/defaultSettings';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';
import Triggers from './Triggers';
import Display from './Display';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const {data: valueSetting, handleChangeInput: onChangeInput, loading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });

  const {editing, handleEdit: handleSaveSettings} = useEditApi({
    url: '/settings',
    defaultState: false
  });

  const items = {
    id: '3',
    firstName: 'John Doe 3',
    city: 'New York 3',
    country: 'United States 3',
    timestamp: 'Tue Dec 5 2023 13:58:58 GMT+0700',
    productName: 'Puffer Jacket With Hidden Hood 3',
    productImage:
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
  };

  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

  const tabs = [
    {
      id: 'display',
      content: 'Display',
      panelID: 'display',
      contentTab: <Display settings={valueSetting} onChangeInput={onChangeInput} />
    },
    {
      id: 'triggers',
      content: 'Triggers',
      panelID: 'triggers',
      contentTab: <Triggers settings={valueSetting} onChangeInput={onChangeInput} />
    }
  ];

  if (loading)
    return (
      <Page title="Settings" fullWidth subtitle="Decide how your notifications will display">
        <Layout>
          <Layout.Section oneThird>
            <Card sectioned>
              <SkeletonBodyText lines={5} />
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <SkeletonBodyText lines={10} />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );

  return (
    <Page
      title="Settings"
      fullWidth
      subtitle="Decide how your notifications will display"
      primaryAction={{
        content: 'Save',
        onAction: () => {
          handleSaveSettings(valueSetting);
        },
        loading: editing
      }}
    >
      <Layout>
        <Layout.Section oneThird>
          <NotificationPopup
            city={items.city}
            country={items.country}
            firstName={items.firstName}
            productImage={items.productImage}
            productName={items.productName}
            timestamp={items.timestamp}
            settings={{
              hideTimeAgo: valueSetting.hideTimeAgo,
              truncateProductName: valueSetting.truncateProductName
            }}
          />
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
