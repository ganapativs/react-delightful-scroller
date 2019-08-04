import React from 'react';
import { storiesOf } from '@storybook/react';
import { getItems } from './utils/helpers';
import { RenderItem } from './shared/RenderItem';
import { Container } from './shared/Container';
import Iscroller from '../src/iscroller';

const LocalRenderItem = (item, index) => (
  <RenderItem key={item} item={item} index={index} />
);

const items = getItems(1000);

const WindowScroller = () => (
  <Container>
    <Iscroller
      /* d */ ref={r => console.log('TCL: App -> render -> r', r)}
      /* d */ items={items}
      /* d */ renderItem={LocalRenderItem}
      /* d */ getItemKey={(item, index) => item + index}
      /* d */ wrapperElement="div"
      /* d */ removeFromDOM
      /** Percentage of the target's visibility the observer's callback should be executed */
      threshold={0}
      /** Scroll parent - should be an element */
      root={null}
      /** Margin around the root */
      rootMargin={'0px 0px 0px 0px'}
      itemsCount={items.length}
      averageItemHeight={50} // Average item height should be 1px
      itemHeight={null} // Dynamic item height
      axis="y"
      fetchItems={() => {}}
      loader={() => 'Loading...'}
      itemsBuffer={2} // Extra items to render on each side in both directions
    />
  </Container>
);

storiesOf('Window scroller', module).add('Default options', () => (
  <WindowScroller />
));
