/**
 * TODO:
 * - Scroll to index
 * - Store visible items range
 * - Wrap elements in resize observer
 */
import React, { memo } from 'react';
import { RenderItem } from './RenderItem';
import { useDimensions } from './utils/useDimensions';

function IScroller({
  items,
  renderItem,
  getItemKey,
  wrapperElement,
  forwardRef,
  itemContainerRenderer,
}) {
  const [dimensions, setDimensions] = useDimensions();

  const Elements = items.map((item, index) => {
    const key = getItemKey(item, index);
    const dimension = dimensions.get(index);

    return (
      <RenderItem
        key={`${key}-${(dimension && dimension.top) || 'x'}`}
        wrapperElement={wrapperElement}
        item={item}
        index={index}
        renderItem={renderItem}
        setDimensions={setDimensions}
        dimension={dimension}
      />
    );
  });

  const Container = itemContainerRenderer({
    children: Elements,
    ref: forwardRef,
  });
  return Container;
}

IScroller.defaultProps = {
  /** Items to render */
  items: [],
  /** Total number of items to render */
  itemsCount: 0,
  /** Item renderer function */
  renderItem: item => item,
  /** Get unique key for every item, used to detect item value change */
  getItemKey: (item, index) => index,
  /** HTML tag used to wrap each rendered item */
  wrapperElement: 'div',
  /** Container node renderer */
  itemContainerRenderer: ({ children, ref }) => <div ref={ref}>{children}</div>,
  // minItemHeight={1} // Min item height should be 1px
  // itemHeight={null} // Dynamic item height
  // removeFromDOM
  // axis="y"
  // threshold={0}
  // root={null} // Scroll parent
  // rootMargin={null} // Margin around the root
  // fetchItems={() => {}}
  // loader={() => "Loading..."}
};

export default memo(
  React.forwardRef((props, ref) => <IScroller {...props} forwardRef={ref} />),
);
