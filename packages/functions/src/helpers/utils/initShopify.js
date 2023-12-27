import Shopify from 'shopify-api-node';

export function initShopify(shop) {
  return new Shopify({
    shopName: shop.shopifyDomain,
    accessToken: shop.accessToken
  });
}
