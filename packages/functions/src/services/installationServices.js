import {getShopById, getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import {resolveAll} from '../helpers/resolveAll';
import {addNotificationServices} from './shopifyServices';
import {addDefaultSettings} from '../repositories/settingsRepository';

export async function afterInstall(ctx) {
  try {
    const shopDomain = ctx.state.shopify.shop;
    const {id} = await getShopByShopifyDomain(shopDomain);
    const shopData = await getShopById(id);

    const shopify = new Shopify({
      accessToken: shopData.accessToken,
      shopName: shopData.shopifyDomain
    });

    await resolveAll([addNotificationServices({shopify, shopData}), addDefaultSettings(shopData)]);
  } catch (error) {
    console.error('error', error);
  }
}
