export async function createScripttag(shopify) {
  const scriptTags = shopify.scriptTag.create({
    event: 'onload',
    src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
  });
  console.log('scriptTags', scriptTags);
}
