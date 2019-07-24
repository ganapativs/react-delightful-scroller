import React from 'react';

export const RenderItem = React.memo(
  ({ item, index, renderItem }) => {
    return renderItem(item, index);
  },
  ({ item: prevItem }, { item }) => prevItem === item,
);
