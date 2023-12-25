export async function resolveAll(promises) {
  return Promise.all(
    promises.map(p =>
      p.catch(e => {
        console.error(e);
        console.trace();
        console.log('Error while resolving promises', p);
      })
    )
  );
}
