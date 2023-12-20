const {initializeApp, cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');
const serviceAccount = require('../../serviceAccounts.json');
const {faker} = require('@faker-js/faker');

initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();
const collection = db.collection('notifications');

async function addNotifications() {
  const promise = [];
  for (i = 0; i < 5; i++) {
    collection.add({
      firstName: faker.person.firstName(),
      city: faker.location.city(),
      productName: faker.commerce.productName(),
      country: faker.location.country(),
      productId: faker.string.uuid(),
      timestamp: faker.date.anytime(),
      productImage: faker.image.url(),
      shopId: 'aO5zYyNMkj0coExntBTF'
    });
  }
  await Promise.all(promise);
}

addNotifications();
