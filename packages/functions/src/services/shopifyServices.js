import {resolveAll} from '../helpers/resolveAll';
import {addNotifications} from '../repositories/notificationsRepository';

export async function syncNotifications({shopify, shop}) {
  try {
    const [orders, products] = await resolveAll([
      shopify.order.list({limit: 30}),
      shopify.product.list()
    ]);

    const notifications = orders.map(order => {
      const lineItems = order?.line_items[0];
      const shippingAddress = order?.shipping_address;
      const matchingProduct = products.find(product => product.id === lineItems?.product_id);

      return {
        orderId: order.id || '',
        firstName: shippingAddress.first_name || '',
        city: shippingAddress.city || '',
        country: shippingAddress.country || '',
        timestamp: new Date(order?.created_at) || new Date(),
        productName: matchingProduct.title || '',
        productId: lineItems?.product_id || '',
        productImage: matchingProduct?.image?.src || '',
        shopifyDomain: shop.shopifyDomain || '',
        shopId: shop.id || ''
      };
    });

    await addNotifications(notifications);
  } catch (e) {
    console.error('Error Shopify Services ', e);
  }
}
