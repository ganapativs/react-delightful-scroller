import React, { useState, useEffect, useRef } from "react";
import DelightfulScroller from "react-delightful-scroller";
import { storiesOf } from "@storybook/react";
import { getItems } from "../utils/helpers";
import { RenderItem } from "../shared/RenderItem";
import { RenderContainer } from "../shared/RenderContainer";
import { RenderLoader } from "../shared/RenderLoader";
import { configureStory } from "../shared/base";
import { Container } from "../shared/Container";

const threshold = [];
for (let i = 0; i <= 1.0; i += 0.01) {
  threshold.push(i);
}

const WrappedRenderItem = props => {
  const ref = useRef(null);

  const callback = ([entry]) => {
    // Chrome triggering intersectionRatio greater than 1 🙆‍♂️
    // https://github.com/w3c/IntersectionObserver/issues/147
    if (entry.isIntersecting) {
      const ratio = Math.min(entry.intersectionRatio, 1);
      ref.current.style.opacity = ratio;
      ref.current.style.filter = `blur(${10 - 10 * ratio}px) grayscale(${1 -
        ratio})`;
      ref.current.style.transform = `scaleX(${1 - (0.2 - 0.2 * ratio)})`;
    }
  };

  useEffect(() => {
    const targetNode = ref.current;
    const options = {
      threshold
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(targetNode);

    return () => {
      observer.unobserve(targetNode);
    };
  }, []);

  return (
    <div ref={ref}>
      <RenderItem {...props} />
    </div>
  );
};

const WindowScroller = () => {
  const [items, setItems] = useState([]);
  const ref = useRef(null);
  const loading = useRef(false);
  const timer = useRef(false);
  const ItemRenderer = props => (
    <WrappedRenderItem {...props} items={items} setItems={setItems} />
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
      />
    </Container>
  );
};

configureStory(storiesOf("Window scroller", module)).add(
  "Infinite scroll - animated dynamic height items",
  () => <WindowScroller />
);
