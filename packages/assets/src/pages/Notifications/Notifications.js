import {Card, Layout, Page, ResourceItem, ResourceList, Stack, TextStyle} from '@shopify/polaris';
import React, {useState} from 'react';
import {NotificationPopup} from '../../components/NotificationPopup/NotificationPopup';

/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const items = [
    {
      id: '1',
      firstName: 'John Doe',
      city: 'New York',
      country: 'United States',
      productName: 'Puffer Jacket With Hidden Hood',
      productImage:
        'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '5',
      firstName: 'John Doe',
      city: 'New York',
      country: 'United States',
      productName: 'Puffer Jacket With Hidden Hood',
      productImage:
        'https://images.pexels.com/photos/5730956/pexels-photo-5730956.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '2',
      firstName: 'John Doe 2',
      city: 'New York 2',
      country: 'United States 2',
      productName: 'Puffer Jacket With Hidden Hood 2',
      productImage:
        'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '3',
      firstName: 'John Doe 3',
      city: 'New York 3',
      country: 'United States 3',
      productName: 'Puffer Jacket With Hidden Hood 3',
      productImage:
        'https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

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
      content: 'Complete',
      onAction: () => {}
    },
    {
      content: 'Delete',
      onAction: () => {}
    }
  ];

  return (
    <Page title="Notifications" subtitle="List of sales notifcation from Shopify" fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
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

function renderItem(item) {
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
        />
        <TextStyle>From March 8, 2021</TextStyle>
      </Stack>
    </ResourceItem>
  );
}
