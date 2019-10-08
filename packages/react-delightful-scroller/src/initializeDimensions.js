export function initializeDimensions({
  axis,
  averageItemWidth,
  itemWidth,
  averageItemHeight,
  itemHeight,
  batchSize,
  itemsCount,
}) {
  return () => {
    const totalBatches = Math.ceil(itemsCount / batchSize);
    const initial = [];
    for (let i = 0; i < totalBatches; i += 1) {
      initial[i] = {
        height:
          axis === 'y'
            ? Math.ceil((itemHeight || averageItemHeight) * batchSize)
            : null,
        width:
          axis === 'x'
            ? Math.ceil((itemWidth || averageItemWidth) * batchSize)
            : null,
      };
    }
    return initial;
  };
}
