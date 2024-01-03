export async function createWebhookOrder(shopify) {
  return shopify.webhook.create({
    address: 'https://7a3a-2402-800-6105-161a-9fd6-a242-9bfd-aac0.ngrok-free.app/webhook/order/new',
    topic: 'orders/create',
    format: 'json'
  });
}
