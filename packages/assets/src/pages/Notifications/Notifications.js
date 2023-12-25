import {
  Card,
  Layout,
  Page,
  Pagination,
  ResourceItem,
  ResourceList,
  Stack,
  TextStyle
} from '@shopify/polaris';
import React, {useState} from 'react';
import {NotificationPopup} from '../../components/NotificationPopup/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';
import moment from 'moment';
import usePaginate from '../../hooks/api/usePaginate';

/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */

export default function Notifications() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortValue, setSortValue] = useState('createdAt:desc');

  const {data: valueSetting} = useFetchApi({
    url: '/settings'
  });

  const {data: items, loading, nextPage, prevPage, pageInfo} = usePaginate({
    url: '/notifications',
    defaultLimit: 1
  });
  console.log('pageInfo', pageInfo);

  const resourceName = {
    singular: 'product',
    plural: 'products'
  };

  const sortOptions = [
    {label: 'Newest update', value: 'createdAt:desc'},
    {label: 'Oldest update', value: 'createdAt:asc'}
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
        <Stack distribution={'equalSpacing'} alignment="leading">
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
          <Stack vertical alignment="trailing" spacing="extraTight">
            <TextStyle>From {moment(timestamp).format('MMM D')} ,</TextStyle>
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
        <Layout.Section>
          <Stack distribution="center">
            <Pagination
              hasPrevious={pageInfo.hasPre}
              onPrevious={prevPage}
              hasNext={pageInfo.hasNext}
              onNext={nextPage}
            />
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
