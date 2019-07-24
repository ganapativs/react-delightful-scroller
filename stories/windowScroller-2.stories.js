import React from 'react';
import { storiesOf } from '@storybook/react';
import { getItems, Card, Container } from './components/helpers';
import Iscroller from '../src/iscroller-2';

const items = getItems(10000);
const itemRenderer = (item, index) => (
  <Card key={item} style={{ background: item.gradient }}>
    <p>
      <b>Index: </b>
      {index}
    </p>
    <p>{item.text}</p>
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
      /** Scroll parent - should be an element */
      root={null}
      itemsCount={items.length}
      averageItemHeight={50} // Average item height should be 1px
      itemHeight={null} // Dynamic item height
      axis="y"
      fetchItems={() => {}}
      loader={() => 'Loading...'}
    />
  </Container>
);

storiesOf('Window scroller 2', module).add('Default options', () => (
  <WindowScroller />
));
