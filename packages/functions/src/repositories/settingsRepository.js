import {Firestore} from '@google-cloud/firestore';
import {defaultSettings} from '../helpers/defaultSettings';

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
 *
 * @param {*} shopId
 * @returns {Settings}
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

/**
 *
 * @param {*} settings
 * @returns {Settings}
 */

export async function updateSettingsRepo(settings) {
  try {
    return await collection.doc(settings.id).update(settings);
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 *
 * @param {*} shop
 * @returns {Settings}
 */
export async function addDefaultSettings(shopId) {
  try {
    return collection.add({...defaultSettings, shopId});
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteSetting(shopId) {
  const setting = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  return await setting.docs[0].ref.delete();
}
