import React, { memo } from 'react';

const Render = ({ item, index, renderItem, wrapperElement }) => {
  return React.createElement(wrapperElement, null, renderItem(item, index));
};

export const RenderItem = memo(
  Render,
  ({ item: prevItem }, { item }) => prevItem === item,
);
