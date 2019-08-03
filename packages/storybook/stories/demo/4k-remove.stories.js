import React, { useState, useEffect, useRef } from "react";
import DelightfulScroller from "react-delightful-scroller";
import { storiesOf } from "@storybook/react";
import { getItems } from "../utils/helpers";
import { RenderItem } from "../shared/RenderItem";
import { RenderContainer } from "../shared/RenderContainer";
import { RenderLoader } from "../shared/RenderLoader";
import { configureStory } from "../shared/base";
import { Container } from "../shared/Container";

const WindowScroller = () => {
  const [items, setItems] = useState(getItems(1000));
  const ref = useRef(null);
  const loading = useRef(false);
  const timer = useRef(false);
  const ItemRenderer = props => (
    <RenderItem {...props} items={items} setItems={setItems} />
  );

  useEffect(() => {
    console.log("Container reference: ", ref);
  }, []);

  useEffect(() => {
    if (loading.current) {
      loading.current = false;
    }
    return () => clearTimeout(timer.current);
  });

  // eslint-disable-next-line no-unused-vars
  const onFetchMore = ({ size, itemsCount, batchSize }) => {
    if (!loading.current) {
      loading.current = true;
      timer.current = setTimeout(() => {
        const newItems = getItems(1000);
        setItems([...items, ...newItems]);
      }, 1000);
    }
  };

  return (
    <Container>
      <DelightfulScroller
        ref={ref}
        items={items}
        RenderItem={ItemRenderer}
        RenderContainer={RenderContainer}
        itemsCount={5000}
        batchSize={10}
        removeFromDOM={true}
        averageItemHeight={50} // Average item height should be 1px
        fetchMoreBufferDistance={1000}
        onFetchMore={onFetchMore}
        RenderLoader={RenderLoader}
      />
    </Container>
  );
};

configureStory(storiesOf("Demo", module)).add("4k - remove", () => (
  <WindowScroller />
));
