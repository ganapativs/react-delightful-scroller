import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { configureStory } from "../shared/base";
import { BaseFixedHeightInfinite } from "../base-components/BaseFixedHeightInfinite";
import { CustomScrollContainer } from "../shared/CustomScrollContainer";

const CustomContainerScroller = () => {
  const scrollRef = useRef(null);

  return (
    <CustomScrollContainer ref={scrollRef}>
      <BaseFixedHeightInfinite root={() => scrollRef.current} />
    </CustomScrollContainer>
  );
};

configureStory(storiesOf("Custom scroll container", module)).add(
  "Infinite scroll - fixed height items",
  () => <CustomContainerScroller />
);
