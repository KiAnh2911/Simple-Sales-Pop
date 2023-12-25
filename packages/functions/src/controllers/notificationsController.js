import {getCurrentShop} from '../helpers/auth';
import {getListNotificationRepo} from '../repositories/notificationsRepository';

export async function getListNotification(ctx) {
  const shopId = getCurrentShop(ctx);
  const {limit, sort, page} = ctx.query;
  const {notifications, pageInfo} = await getListNotificationRepo({shopId, limit, sort, page});

  ctx.body = {
    data: notifications,
    pageInfo,
    success: true
  };
}
