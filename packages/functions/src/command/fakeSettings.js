const admin = require('firebase-admin');

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
/** @type CollectionReference */

const serviceAccount = require('../../serviceAccounts.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const settingsRef = db.collection('settings');

function createSettings() {
  return {
    position: 'bottom-left',
    hideTimeAgo: true,
    truncateProductName: false,
    displayDuration: 15,
    firstDelay: 40,
    popsInterval: 51,
    maxPopsDisplay: 29,
    includedUrls: '',
    excludedUrls: '',
    allowShow: 'all',
    shopId: 'aO5zYyNMkj0coExntBTF'
  };
}

const settingsData = createSettings();

(async () => {
  try {
    const res = await settingsRef.add(settingsData);
    console.log('Document added with ID:', res.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
})();
