export async function getNotification(shopify, id, data) {
  try {
    const product = await shopify.product.get(data.line_items[0].product_id);

    return {
      firstName: data.billing_address.first_name || '',
      city: data.billing_address.city || '',
      country: data.billing_address.country || '',
      shopId: id || '',
      timestamp: data.created_at || '',
      productName: data.line_items[0].title || '',
      productId: data.line_items[0].product_id || null,
      productImage: product.image.src,
      shopifyDomain: shopify.options.shopName
    };
  } catch (error) {
    console.log(error);
    return {};
  }
}
