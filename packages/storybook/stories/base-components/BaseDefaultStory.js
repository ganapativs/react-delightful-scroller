import React, { useState } from 'react';
import DelightfulScroller from 'react-delightful-scroller';
import { getItems } from '../utils/helpers';
import { RenderItem } from '../shared/RenderItem';
import { Container } from '../shared/Container';

export const BaseDefaultStory = props => {
  const [items, setItems] = useState(getItems(100));
  const ItemRenderer = p => (
    <RenderItem
      {...p}
      items={items}
      setItems={setItems}
      showQuotes={props.axis === 'y'}
    />
  );

  return (
    <Container axis={props.axis}>
      <DelightfulScroller
        items={items}
        RenderItem={ItemRenderer}
        itemsCount={items.length}
        averageItemHeight={50} // Average item height should be 1px
        {...props}
      />
    </Container>
  );
};
