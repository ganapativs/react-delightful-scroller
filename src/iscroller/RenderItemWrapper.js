import React from 'react';

export const RenderItemWrapper = React.memo(
  ({ item, index, RenderItem }) => {
    return <RenderItem item={item} index={index} />;
  },
  ({ item: prevItem }, { item }) => prevItem === item,
);
