import React, { useState, useEffect, useRef } from "react";
import DelightfulScroller from "react-delightful-scroller";
import { getItems } from "../utils/helpers";
import { RenderItem } from "../shared/RenderItem";
import { RenderContainer } from "../shared/RenderContainer";
import { RenderLoader } from "../shared/RenderLoader";
import { Container } from "../shared/Container";

export const BaseDynamicHeightInfinite = props => {
  const [items, setItems] = useState([]);
  const ref = useRef(null);
  const loading = useRef(false);
  const timer = useRef(false);
  const ItemRenderer = p => (
    <RenderItem {...p} items={items} setItems={setItems} />
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
        const newItems = getItems(100);
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
        averageItemHeight={50} // Average item height should be 1px
        fetchMoreBufferDistance={1000}
        onFetchMore={onFetchMore}
        RenderLoader={RenderLoader}
        {...props}
      />
    </Container>
  );
};
