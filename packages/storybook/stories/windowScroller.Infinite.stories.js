import React, { useState, useEffect, useRef } from "react";
import { storiesOf } from "@storybook/react";
import DelightfulScroller from "react-delightful-scroller";
import { getItems, Container } from "./components/helpers";
import { RenderItem } from "./shared/RenderItem";
import { RenderContainer } from "./shared/RenderContainer";
import { RenderLoader } from "./shared/RenderLoader";

const WindowScroller = () => {
  const [items, setItems] = useState([]);
  const ref = useRef(null);
  const loading = useRef(false);

  useEffect(() => {
    if (loading.current) {
      loading.current = false;
    }
  });

  // eslint-disable-next-line no-unused-vars
  const onFetchMore = ({ items: i, itemsCount, batchSize }) => {
    if (!loading.current) {
      loading.current = true;
      const newItems = getItems(100);
      setItems([...i, ...newItems]);
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
        RenderLoader={RenderLoader}
      />
    </Container>
  );
};

storiesOf("Window Scroller", module).add("Infinite scroll", () => (
  <WindowScroller />
));
