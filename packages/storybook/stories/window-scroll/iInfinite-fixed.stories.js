import React, { useState, useEffect, useRef } from "react";
import DelightfulScroller from "react-delightful-scroller";
import { storiesOf } from "@storybook/react";
import { getItems, Container } from "../components/helpers";
import { RenderFixedHeightItem } from "../shared/RenderItem";
import { RenderContainer } from "../shared/RenderContainer";
import { RenderLoader } from "../shared/RenderLoader";
import { configureStory } from "../shared/base";

const WindowScroller = () => {
  const [items, setItems] = useState([]);
  const ref = useRef(null);
  const loading = useRef(false);

  useEffect(() => {
    console.log("Container reference: ", ref);
  }, []);

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
        RenderItem={RenderFixedHeightItem}
        RenderContainer={RenderContainer}
        itemsCount={300}
        itemHeight={76} // Average item height should be 1px
        fetchMoreBufferDistance={1000}
        onFetchMore={onFetchMore}
        RenderLoader={RenderLoader}
      />
    </Container>
  );
};

configureStory(storiesOf("Window scroller", module)).add(
  "Infinite scroll - fixed height items",
  () => <WindowScroller />
);
