import {Firestore} from '@google-cloud/firestore';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('notifications');

export async function getListNotificationRepo(
  shopId,
  {sort = 'createdAt:desc', limit = 30, page = 1}
) {
  try {
    let query = collection.where('shopId', '==', shopId);
    const {docs: notificationDocs} = await collection.where('shopId', '==', shopId).get();

    if (sort) {
      query = query.orderBy('timestamp', sort.split(':')[1]);
    }
    if (limit) {
      const offset = (Number(page) - 1) * Number(limit);
      query = query.limit(Number(limit)).offset(offset);
    }

    const {docs: notifications} = await query.get();

    const hasPre = page > 1;
    const hasNext =
      Math.ceil(notificationDocs.length / Number(limit)) === Number(page) ? false : true;

    return {
      notifications: notifications.map(notification => {
        const timestamp = notification.data().timestamp.toDate();

        return {
          id: notification.id,
          ...notification.data(),
          timestamp
        };
      }),
      pageInfo: {
        hasPre,
        hasNext
      }
    };
  } catch (error) {
    console.error(error);
  }
}

export async function addNotifications(notifications) {
  try {
    const addNotification = notifications.map(notification => collection.add(notification));
    return Promise.all(addNotification);
  } catch (error) {
    console.error('Error Add Notifications', error);
  }
}

export async function addNotification(notification) {
  try {
    const addedNotification = await collection.add(notification);
    return addedNotification;
  } catch (error) {
    console.error('Error Add Notification', error);
  }
}

export async function deleteManyNotification(notificationsId) {
  const batch = firestore.batch();

  notificationsId.forEach(id => {
    const notificationRef = collection.doc(id);
    batch.delete(notificationRef);
  });

  await batch.commit();
}
