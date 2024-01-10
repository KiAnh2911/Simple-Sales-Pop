import {addNotifications} from '../repositories/notificationsRepository';

export async function syncNotifications({shopify, shopifyDomain, shopId}) {
  try {
    const orders = await shopify.order.list({limit: 30});
    const listProductIds = orders.map(order => order.line_items[0].product_id);
    const products = await shopify.product.list({
      ids: [...new Set(listProductIds)].toString()
    });
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
        shopifyDomain: shopifyDomain || '',
        shopId: shopId || ''
      };
    });

    await addNotifications(notifications);
  } catch (e) {
    console.error('Error Shopify Services ', e);
  }
}
