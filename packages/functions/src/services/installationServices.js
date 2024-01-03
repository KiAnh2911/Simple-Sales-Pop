import {getShopById, getShopByShopifyDomain} from '@avada/shopify-auth';
import {resolveAll} from '../helpers/resolveAll';
import {initShopify} from '../helpers/utils/initShopify';
import {createWebhookOrder} from '../helpers/utils/webhook';
import {addDefaultSettings} from '../repositories/settingsRepository';
// import * as shopifyGraphQl from './shopifyGraphQl';
import * as shopifyServices from './shopifyServices';
import {createScripttag} from '../helpers/utils/createScripttag';

export async function afterInstall(ctx) {
  try {
    const shopDomain = ctx.state.shopify.shop;
    const {id} = await getShopByShopifyDomain(shopDomain);
    const shop = await getShopById(id);
    const shopify = initShopify(shop);
    await resolveAll([
      // shopifyGraphQl.syncNotifications(shop),
      shopifyServices.syncNotifications({shopify, shop}),
      addDefaultSettings(shop),
      createWebhookOrder(shopify),
      createScripttag(shopify)
    ]);
  } catch (error) {
    console.error('error', error);
  }
}
