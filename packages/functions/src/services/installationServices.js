import {getShopById, getShopByShopifyDomain} from '@avada/shopify-auth';
import {resolveAll} from '../helpers/resolveAll';
import {initShopify} from '../helpers/utils/initShopify';
import {createWebhookOrder} from '../helpers/utils/webhook';
import {addDefaultSettings} from '../repositories/settingsRepository';
import {getListOrderShopifyGrapQl} from './shopifyGraphQl';

export async function afterInstall(ctx) {
  try {
    const shopDomain = ctx.state.shopify.shop;
    const {id} = await getShopByShopifyDomain(shopDomain);
    const shop = await getShopById(id);
    const shopify = initShopify(shop);

    await resolveAll([
      getListOrderShopifyGrapQl(shop),
      addDefaultSettings(shop),
      createWebhookOrder(shopify)
    ]);
  } catch (error) {
    console.error('error', error);
  }
}
