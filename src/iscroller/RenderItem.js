import { memo } from 'react';

const Render = ({ item, index, renderItem }) => renderItem(item, index);

export const RenderItem = memo(
  Render,
  ({ item: prevItem }, { item }) => prevItem === item,
);
