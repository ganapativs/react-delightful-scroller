import React from "react";
import DelightfulScroller from "react-delightful-scroller";
import { storiesOf } from "@storybook/react";
import { getItems, Container } from "../components/helpers";
import { RenderItem } from "../shared/RenderItem";
import { configureStory } from "../shared/base";

const items = getItems(100);

const WindowScroller = () => {
  return (
    <Container>
      <DelightfulScroller
        items={items}
        RenderItem={RenderItem}
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
