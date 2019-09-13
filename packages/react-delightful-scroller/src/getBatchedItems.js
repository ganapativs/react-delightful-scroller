export const getBatchedItems = (items, batchSize = 1) => {
  const batched = [];

  // Faster than clone and splice
  for (let index = 0; index < items.length; index += batchSize) {
    const chunk = items.slice(index, index + batchSize);
    // Do something if you want with the group
    batched.push(chunk);
  }

  return batched;
};
