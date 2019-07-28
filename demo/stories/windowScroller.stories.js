import React from 'react';
import { storiesOf } from '@storybook/react';
import { getItems, Container } from './components/helpers';
import Iscroller from '../../o/src/iscroller';
import { RenderItem } from './shared/RenderItem';
import { RenderContainer } from './shared/RenderContainer';

const items = getItems(100);

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
  return (
    <Container>
      <Iscroller
        ref={r => console.log('TCL: App -> render -> r', r)}
        items={items}
        RenderItem={RenderItem}
        getItemKey={(item, index) => item.text + index}
        wrapperElement="div"
        removeFromDOM
        RenderContainer={RenderContainer}
        /** Scroll parent - should be an element */
        root={null}
        itemsCount={items.length}
        averageItemHeight={50} // Average item height should be 1px
        itemHeight={null} // Dynamic item height
        axis="y"
      />
    </Container>
  );
};

storiesOf('Window Scroller', module).add('Default options', () => (
  <WindowScroller />
));
