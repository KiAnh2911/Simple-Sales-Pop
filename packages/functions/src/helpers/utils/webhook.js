export async function createWebhookOrder(shopify) {
  return shopify.webhook.create({
    address: 'https://4666-2402-800-6105-161a-a73c-d584-5e4d-9dff.ngrok-free.app/webhook/order/new',
    topic: 'orders/create',
    format: 'json'
  });
}
