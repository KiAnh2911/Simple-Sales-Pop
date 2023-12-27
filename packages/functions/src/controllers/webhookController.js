import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {initShopify} from '../helpers/utils/initShopify';
import {limitedToListNotificationsShopId} from '../repositories/notificationsRepository';
import {getNotification} from '../services/notificationServices';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = initShopify(shop);

    const notification = await getNotification(shopify, shop.id, orderData);
    await limitedToListNotificationsShopId(shop, notification);

    return (ctx.body = {
      success: true
    });
  } catch (error) {
    console.error('Listen New Order ', error);
  }
}
