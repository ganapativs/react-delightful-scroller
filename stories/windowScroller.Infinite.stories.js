import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { getItems, Container } from './components/helpers';
import Iscroller from '../src/iscroller';
import { itemRenderer } from './shared/itemRenderer';

/**
 *
 Updating item(s)
      const it = [...items];
      it[0] = { ...it[0], text: 'hoi' };
      setItems(it);

  Appending items
    useEffect(() => {
      setTimeout(() => {
        console.log('set');
        s([...i, ...i]);
      }, 4000);
  }, []);
 */

const WindowScroller = () => {
  const [items, setItems] = useState(getItems(100));

  const onFetchMore = ({ items, itemsCount, batchSize }) => {
    console.log('Fetch more', items);

    const newItems = getItems(100);
    setItems([...items, ...newItems]);
  };

  return (
    <Container>
      <Iscroller
        ref={r => {
          debugger;
          console.log('TCL: App -> render -> r', r);
        }}
        items={items}
        RenderItem={itemRenderer}
        getItemKey={(item, index) => item.text + index}
        wrapperElement="div"
        removeFromDOM
        RenderContainer={({ children, forwardRef }) => {
          return (
            <div id="Test" ref={forwardRef}>
              {children}
            </div>
          );
        }}
        /** Scroll parent - should be an element */
        root={null}
        itemsCount={300}
        averageItemHeight={50} // Average item height should be 1px
        itemHeight={null} // Dynamic item height
        axis="y"
        fetchMoreBufferDistance={1000}
        onFetchMore={onFetchMore}
        RenderLoader={({ items, itemsCount, batchSize }) => (
          <div style={{ textAlign: 'center' }}>{`Loading page ${items.length /
            batchSize +
            1}...`}</div>
        )}
      />
    </Container>
  );
};

storiesOf('Window Scroller', module).add('Infinite scroll', () => (
  <WindowScroller />
));
