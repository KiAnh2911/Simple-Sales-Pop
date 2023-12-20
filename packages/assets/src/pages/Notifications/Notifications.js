import {Card, Layout, Page, ResourceItem, ResourceList, Stack, TextStyle} from '@shopify/polaris';
import React, {useState} from 'react';
import {NotificationPopup} from '../../components/NotificationPopup/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';
import moment from 'moment';

/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */

export default function Notifications() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const {data: valueSetting} = useFetchApi({
    url: '/settings'
  });

  const {data: items, loading} = useFetchApi({url: '/notifications'});

  const resourceName = {
    singular: 'product',
    plural: 'products'
  };

  const sortOptions = [
    {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
    {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
  ];

  const promotedBulkActions = [
    {
      content: 'Delete',
      onAction: () => {}
    }
  ];

  const renderItem = item => {
    const {id, firstName, city, country, productName, timestamp, productImage} = item;

    return (
      <ResourceItem id={id}>
        <Stack distribution={'equalSpacing'}>
          <NotificationPopup
            key={id}
            city={city}
            country={country}
            firstName={firstName}
            productImage={productImage}
            productName={productName}
            timestamp={timestamp}
            settings={valueSetting}
          />
          <Stack vertical>
            <TextStyle>From {moment(timestamp).format('MMM D')}</TextStyle>
            <TextStyle>{moment(timestamp).format('YYYY')}</TextStyle>
          </Stack>
        </Stack>
      </ResourceItem>
    );
  };

  return (
    <Page title="Notifications" subtitle="List of sales notifcation from Shopify" fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              loading={loading}
              resourceName={resourceName}
              items={items}
              renderItem={renderItem}
              selectedItems={selectedProducts}
              promotedBulkActions={promotedBulkActions}
              onSelectionChange={setSelectedProducts}
              sortOptions={sortOptions}
              onSortChange={selected => {
                setSortValue(selected);
                console.log(`Sort option changed to ${selected}.`);
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
