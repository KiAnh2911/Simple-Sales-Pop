import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {getListNotificationRepo} from '../repositories/notificationsRepository';
import {getSettingsRepoById} from '../repositories/settingsRepository';

export async function clientApiData(ctx) {
  const {shopifyDomain} = ctx.query;
  const {id: shopId} = await getShopByShopifyDomain(shopifyDomain);
  const {notifications} = await getListNotificationRepo(shopId, {});
  const settings = await getSettingsRepoById(shopId);
  return (ctx.body = {data: {notifications: notifications, settings: settings}, success: true});
}
