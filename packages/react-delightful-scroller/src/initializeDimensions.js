export function initializeDimensions({
  axis,
  itemHeight,
  averageItemHeight,
  batchSize,
  itemsCount,
}) {
  return () => {
    const totalBatches = Math.ceil(itemsCount / batchSize);
    const estimatedEmptyBatchHeight =
      axis === 'y'
        ? Math.ceil((itemHeight || averageItemHeight) * batchSize)
        : // TODO - handle other directions
          0;
    const initial = [];
    for (let i = 0; i < totalBatches; i += 1) {
      initial[i] = { height: estimatedEmptyBatchHeight, width: null };
    }
    return initial;
  };
}
