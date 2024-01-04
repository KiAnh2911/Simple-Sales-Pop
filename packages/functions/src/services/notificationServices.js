export async function getNotification(shopify, id, data) {
  try {
    const product = await shopify.product.get(data.line_items[0].product_id);

    return {
      orderId: data.id,
      firstName: data.billing_address.first_name || '',
      city: data.billing_address.city || '',
      country: data.billing_address.country || '',
      timestamp: new Date(data.created_at) || new Date(),
      productName: data.line_items[0].title || '',
      productId: data.line_items[0].product_id || null,
      productImage: product.image.src || '',
      shopId: id || '',
      shopifyDomain: shopify.options.shopName || ''
    };
  } catch (error) {
    console.log(error);
    return {};
  }
}
