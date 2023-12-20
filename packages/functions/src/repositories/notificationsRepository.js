import {Firestore} from '@google-cloud/firestore';
import moment from 'moment';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('notifications');

export async function getListNotificationRepo({shopId, sort = 'desc', limit = 10}) {
  try {
    let query = collection.where('shopId', '==', shopId);

    if (sort) {
      query = query.orderBy('timestamp', sort);
    }
    if (limit) {
      query = query.limit(Number(limit));
    }

    const {docs: notifications} = await query.get();

    return notifications.map(notification => {
      const time = notification.data().timestamp.toDate();

      return {
        id: notification.id,
        ...notification.data(),
        timestamp: time
      };
    });
  } catch (error) {
    console.error(error);
  }
}
