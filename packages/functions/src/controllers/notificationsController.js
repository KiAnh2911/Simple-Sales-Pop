import {getCurrentShop} from '../helpers/auth';
import {getListNotificationRepo} from '../repositories/notificationsRepository';

export async function getListNotification(ctx) {
  const shopId = getCurrentShop(ctx);
  const {limit, sort} = ctx.query;
  const notification = await getListNotificationRepo({shopId, limit, sort});

  ctx.body = {
    data: notification,
    success: true
  };
}
