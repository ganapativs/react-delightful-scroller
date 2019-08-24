import React, { useState, useRef } from "react";
import DelightfulScroller from "react-delightful-scroller";
import { storiesOf } from "@storybook/react";
import { getItems } from "../utils/helpers";
import { RenderItem } from "../shared/RenderItem";
import { configureStory } from "../shared/base";
import { Container } from "../shared/Container";
import { CustomScrollContainer } from "../shared/CustomScrollContainer";

const CustomContainerScroller = () => {
  const scrollRef = useRef(null);
  const [items, setItems] = useState(getItems(100));
  const ItemRenderer = props => (
    <RenderItem {...props} items={items} setItems={setItems} />
  );

  return (
    <CustomScrollContainer ref={scrollRef}>
      <Container>
        <DelightfulScroller
          items={items}
          RenderItem={ItemRenderer}
          itemsCount={items.length}
          averageItemHeight={50} // Average item height should be 1px
          root={() => scrollRef.current}
        />
      </Container>
    </CustomScrollContainer>
  );
};

configureStory(storiesOf("Custom scroll container", module)).add(
  "Minimal usage",
  () => <CustomContainerScroller />
);
