import React from 'react';
import { storiesOf } from '@storybook/react';
import { getItems, Card, Container } from './components/helpers';
import Iscroller from '../src/iscroller';

const items = getItems(50);
const itemRenderer = (item, index) => (
  <Card key={item}>
    <p>
      <b>Index: </b>
      {index}
    </p>
    <p>{item}</p>
  </Card>
);

const WindowScroller = () => (
  <Container>
    <Iscroller
      /* d */ ref={r => console.log('TCL: App -> render -> r', r)}
      /* d */ items={items}
      /* d */ renderItem={itemRenderer}
      /* d */ getItemKey={(item, index) => item + index}
      /* d */ wrapperElement="div"
      /* d */ removeFromDOM
      /* d */ itemContainerRenderer={({ children, ref }) => (
        <div ref={ref}>{children}</div>
      )}
      /** Percentage of the target's visibility the observer's callback should be executed */
      threshold={0}
      /** Scroll parent - should be an element */
      root={null}
      /** Margin around the root */
      rootMargin={'0px 0px 0px 0px'}
      itemsCount={items.length}
      minItemHeight={1} // Min item height should be 1px
      itemHeight={null} // Dynamic item height
      axis="y"
      fetchItems={() => {}}
      loader={() => 'Loading...'}
      cardBuffer={null}
    />
  </Container>
);

storiesOf('Window scroller', module).add('Default options', () => (
  <WindowScroller />
));
