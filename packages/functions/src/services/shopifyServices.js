import {addNotifications} from '../repositories/notificationsRepository';
import {getNotification} from './notificationServices';

export async function addNotificationServices({shopify, shop}) {
  try {
    const notifications = await shopify.order.list({limit: 30});

    const results = await Promise.all(
      notifications.map(notification => getNotification(shopify, shop.id, notification))
    );

    await addNotifications(results);
  } catch (e) {
    console.error('error', e);
  }
}
