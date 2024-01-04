import * as functions from 'firebase-functions';
const {app} = functions.config();

export async function createWebhookOrder(shopify) {
  const listWebhook = await shopify.webhook.list();

  await Promise.all(
    listWebhook.map(async webhook => {
      await shopify.webhook.delete(webhook.id);
    })
  );

  return shopify.webhook.create({
    address: `https://${app.base_url}/webhook/order/new`,
    topic: 'orders/create',
    format: 'json'
  });
}
