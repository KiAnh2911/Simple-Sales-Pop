import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {resolveAll} from '../helpers/resolveAll';
import {initShopify} from '../helpers/utils/initShopify';
import {createWebhookOrder} from '../helpers/utils/webhook';
import {addDefaultSettings, deleteSetting} from '../repositories/settingsRepository';
import {deleteNotifications} from '../repositories/notificationsRepository';
import {syncNotifications} from './shopifyGraphQl';

export async function installService(ctx) {
  try {
    const {shop: shopifyDomain, accessToken} = ctx.state.shopify;
    const {id: shopId} = await getShopByShopifyDomain(shopifyDomain);
    const shopify = initShopify({shopifyDomain, accessToken});
    await resolveAll([
      syncNotifications({shopId, shopifyDomain, accessToken}),
      addDefaultSettings(shopId),
      createWebhookOrder(shopify)
    ]);
  } catch (error) {
    console.error('Error Install Service: ', error);
  }
}

export async function uninstallService(ctx) {
  try {
    const shopDomain = ctx.state.shopify.shop;
    const {id: shopId} = await getShopByShopifyDomain(shopDomain);

    await resolveAll([deleteNotifications(shopId), deleteSetting(shopId)]);

    return (ctx.body = {
      success: true
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      message: error.message
    });
  }
}
