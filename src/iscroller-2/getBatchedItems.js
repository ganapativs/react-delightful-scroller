export const getBatchedItems = (items, batchSize = 1) => {
  const itemsClone = [...items];
  let batched = [];
  while (itemsClone.length) {
    batched = [...batched, itemsClone.splice(0, batchSize)];
  }
  return batched;
};
