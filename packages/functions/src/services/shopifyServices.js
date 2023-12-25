import {addNotification} from '../repositories/notificationsRepository';

export async function addNotificationServices({shopify, shopData}) {
  try {
    const shopId = shopData.id;
    const shopifyDomain = shopData.shopifyDomain;
    const notifications = await shopify.order.list({limit: 30});

    const results = await Promise.all(
      notifications.map(async notification => {
        const {shipping_address, line_items} = notification;
        const firstName = shipping_address.first_name;
        const country = shipping_address.country;
        const city = shipping_address.city;
        const product_id = line_items[0].product_id;
        const products = await shopify.product.get(product_id);
        const productName = products.title;
        const productId = product_id;
        const timestamp = notification.created_at;
        const productImage = products.images[0].src;

        return {
          firstName,
          country,
          city,
          productName,
          productId,
          timestamp,
          productImage,
          shopifyDomain,
          shopId
        };
      })
    );

    await addNotification(results);
  } catch (e) {
    console.error('error', e);
  }
}
