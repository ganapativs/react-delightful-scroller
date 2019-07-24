export function initializeDimensions({
  axis,
  itemHeight,
  averageItemHeight,
  batchSize,
  itemsCount,
}) {
  return () => {
    console.log({
      axis,
      itemHeight,
      averageItemHeight,
      batchSize,
      itemsCount,
    });
    const totalBatches = Math.ceil(itemsCount / batchSize);
    const estimatedEmptyBatchHeight =
      axis === 'y'
        ? Math.ceil((itemHeight || averageItemHeight) * batchSize)
        : // TODO - handle other directions
          0;
    const initial = [];
    for (let i = 0; i < Array.from({ length: totalBatches }).length; i++) {
      initial[i] = { scroll: { height: estimatedEmptyBatchHeight } };
    }
    return initial;
  };
}
