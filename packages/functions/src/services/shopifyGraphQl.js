import {addNotifications} from '../repositories/notificationsRepository';
const axios = require('axios');

export async function getListOrderShopifyGrapQl(shop) {
  try {
    const {id: shopId, shopifyDomain, accessToken} = shop;
    const query = `{
      orders(first: 30 , sortKey: CREATE_AT , reverse:true) {
        edges {
          node {
            id
            createdAt
            shippingAddress {
              id
              firstName
              city
              country
            }
            lineItems(first:1){
              edges{
                node{
                  product{
                    id
                    title
                    handle
                  }
                  image{
                    url
                  }
                }
              }
            }
          }
        }
      }
    }`;
    const url = `https://${shopifyDomain}/admin/api/2023-10/graphql.json`;
    const response = await axios.post(
      url,
      {query: query},
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        }
      }
    );

    const orderList = response.data.data.orders.edges;

    const results = orderList.map(order => {
      const {shippingAddress, lineItems, createdAt, id} = order?.node;
      const {product, image} = lineItems?.edges[0]?.node;

      return {
        orderId: Number(id.split('/').slice(-1)[0]) || '',
        firstName: shippingAddress.firstName || '',
        city: shippingAddress.city || '',
        country: shippingAddress.country || '',
        timestamp: createdAt || new Date(),
        productName: product.title,
        productId: Number(product.id.split('/').slice(-1)[0]) || '',
        productImage: image.url || '',
        shopifyDomain: shopifyDomain || '',
        shopId: shopId || ''
      };
    });
    // console.log('results', results);
    await addNotifications(results);
  } catch (error) {
    console.error('Error shopify graphql:', error.message);
  }
}
