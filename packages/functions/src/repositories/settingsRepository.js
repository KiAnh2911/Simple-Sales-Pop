import {Firestore} from '@google-cloud/firestore';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('settings');

/**
 * @param {string} id
 * @returns {Object}
 */
export async function getSettingsRepoById(shopId) {
  try {
    const settingDocs = await collection
      .where('shopId', '==', shopId)
      .limit(1)
      .get();

    if (settingDocs.exists) {
      return null;
    }

    const settingDoc = settingDocs.docs[0];

    return {id: settingDoc.id, ...settingDoc.data()};
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function updateSettingsRepo(settings) {
  try {
    const settingDocs = await collection.doc(settings.id).update(settings);

    if (settingDocs.exists) {
      return null;
    }

    const settingDoc = settingDocs.docs[0];

    return {id: settingDoc.id, ...settingDoc.data()};
  } catch (error) {
    console.error(error);
    return null;
  }
}
