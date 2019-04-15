import { memo } from 'react';

export const RenderItem = memo(
  ({ item, index, renderItem }) => renderItem(item, index),
  ({ item: prevItem }, { item }) => prevItem === item,
);
