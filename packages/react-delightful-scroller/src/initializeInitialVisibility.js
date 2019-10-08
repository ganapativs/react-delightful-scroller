export function initializeInitialVisibility({
  axis,
  containerWidth,
  averageItemWidth,
  itemWidth,
  containerHeight,
  averageItemHeight,
  itemHeight,
  batchSize,
  itemsCount,
}) {
  return () => {
    const totalBatches = Math.ceil(itemsCount / batchSize);
    let estimatedInitialBatches = 0;
    if (axis === 'y') {
      estimatedInitialBatches = Math.ceil(
        containerHeight / ((itemHeight || averageItemHeight) * batchSize),
      );
    } else if (axis === 'x') {
      estimatedInitialBatches = Math.ceil(
        containerWidth / ((itemWidth || averageItemWidth) * batchSize),
      );
    }
    const initial = [];
    for (let i = 0; i < totalBatches; i += 1) {
      initial[i] = i < estimatedInitialBatches;
    }
    return initial;
  };
}
