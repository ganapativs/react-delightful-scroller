import React from 'react';
import { storiesOf } from '@storybook/react';
import { getItems, Card, Container } from './components/helpers';
import Iscroller from '../src/iscroller';

const items = getItems(100);
const itemRenderer = ({ item, index }) => {
  return (
    <Card key={item} style={{ background: item.gradient }}>
      <p>
        <b>Index: </b>
        {index}
      </p>
      <p>{item.text}</p>
      <input defaultValue={item.text} />
    </Card>
  );
};

const WindowScroller = () => (
  <Container>
    <Iscroller
      /* d */ ref={r => console.log('TCL: App -> render -> r', r)}
      /* d */ items={items}
      /* d */ RenderItem={itemRenderer}
      /* d */ getItemKey={(item, index) => item + index}
      /* d */ wrapperElement="div"
      /* d */ removeFromDOM={false}
      /* d */ RenderContainer={({ children, forwardRef }) => (
        <div ref={forwardRef}>{children}</div>
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

storiesOf('Window Scroller', module).add('Default options', () => (
  <WindowScroller />
));
