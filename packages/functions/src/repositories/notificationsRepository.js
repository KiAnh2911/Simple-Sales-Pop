import {presentDataFromDoc} from '@avada/firestore-utils';
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

export async function getListNotificationRepo({
  shopId,
  sort = 'createdAt:asc',
  limit = 10,
  page = 1
}) {
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
    const hasNext = notificationDocs.length === Number(page) ? false : true;

    return {
      notifications: notifications.map(doc => presentDataFromDoc(doc)),
      pageInfo: {
        hasPre,
        hasNext
      }
    };
  } catch (error) {
    console.error(error);
  }
}

export async function addNotification(notifications = []) {
  try {
    const addNotification = notifications.map(notification => collection.add(notification));
    return Promise.all(addNotification);
  } catch (error) {
    console.error('error', error);
  }
}
