import React, { useState, useEffect, useRef } from "react";
import { storiesOf } from "@storybook/react";
import DelightfulScroller from "react-delightful-scroller";
import { getItems, Container } from "./components/helpers";
import { RenderItem } from "./shared/RenderItem";
import { RenderContainer } from "./shared/RenderContainer";

const WindowScroller = () => {
  const [items, setItems] = useState([]);
  const ref = useRef(null);
  const loading = useRef(false);

  useEffect(() => {
    if (loading.current) {
      loading.current = false;
    }
  });

  const onFetchMore = ({ items, itemsCount, batchSize }) => {
    if (!loading.current) {
      loading.current = true;
      const newItems = getItems(100);
      setItems([...items, ...newItems]);
    }
  };

  return (
    <Container>
      <DelightfulScroller
        ref={ref}
        items={items}
        RenderItem={RenderItem}
        getItemKey={(item, index) => item.text + index}
        wrapperElement="div"
        removeFromDOM
        RenderContainer={RenderContainer}
        /** Scroll parent - should be an element */
        root={null}
        itemsCount={300}
        averageItemHeight={50} // Average item height should be 1px
        itemHeight={null} // Dynamic item height
        axis="y"
        fetchMoreBufferDistance={1000}
        onFetchMore={onFetchMore}
        RenderLoader={({ items, itemsCount, batchSize }) => (
          <div style={{ textAlign: "center" }}>{`Loading page ${items.length /
            batchSize +
            1}...`}</div>
        )}
      />
    </Container>
  );
};

storiesOf("Window Scroller", module).add("Infinite scroll", () => (
  <WindowScroller />
));
