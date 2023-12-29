import {getCurrentShop} from '../helpers/auth';
import {
  deleteManyNotification,
  getListNotificationRepo
} from '../repositories/notificationsRepository';

export async function getListNotification(ctx) {
  const shopId = getCurrentShop(ctx);
  const {limit, sort, page} = ctx.query;
  const {notifications, pageInfo} = await getListNotificationRepo(shopId, {limit, sort, page});

  ctx.body = {
    data: notifications,
    pageInfo,
    success: true
  };
}

export async function deleteNotificatons(ctx) {
  try {
    const {data: notificationsId} = ctx.req.body;
    const notifications = await deleteManyNotification(notificationsId);
    return (ctx.body = {
      data: notifications,
      success: true
    });
  } catch (error) {
    console.error('Error Delete Notifications: ', error);
    return (ctx.body = {
      success: false
    });
  }
}
