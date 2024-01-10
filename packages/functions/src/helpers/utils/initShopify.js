import Shopify from 'shopify-api-node';

export function initShopify({shopifyDomain, accessToken}) {
  return new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });
}
