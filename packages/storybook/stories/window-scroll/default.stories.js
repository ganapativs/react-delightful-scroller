import React, { useState } from "react";
import DelightfulScroller from "react-delightful-scroller";
import { storiesOf } from "@storybook/react";
import { getItems } from "../utils/helpers";
import { RenderItem } from "../shared/RenderItem";
import { configureStory } from "../shared/base";
import { Container } from "../shared/Container";

const WindowScroller = () => {
  const [items, setItems] = useState(getItems(100));
  const ItemRenderer = props => (
    <RenderItem {...props} items={items} setItems={setItems} />
  );

  return (
    <Container>
      <DelightfulScroller
        items={items}
        RenderItem={ItemRenderer}
        itemsCount={items.length}
        averageItemHeight={50} // Average item height should be 1px
      />
    </Container>
  );
};

configureStory(storiesOf("Window scroller", module)).add(
  "Minimal usage",
  () => <WindowScroller />
);
