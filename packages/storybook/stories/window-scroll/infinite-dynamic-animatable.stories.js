import React from "react";
import { storiesOf } from "@storybook/react";
import { configureStory } from "../shared/base";
import { BaseDynamicHeightInfiniteAnimated } from "../base-components/BaseDynamicHeightInfiniteAnimated";

const WindowScroller = BaseDynamicHeightInfiniteAnimated;

configureStory(storiesOf("Window scroller", module)).add(
  "Infinite scroll - animated dynamic height items",
  () => <WindowScroller />
);
