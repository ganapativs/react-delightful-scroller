import React, { useRef } from 'react';
import { decorators, parameters } from '../utils/story-base-config';
import { BaseDefaultStory } from '../base-components/BaseDefaultStory';
import { BaseDynamicHeightInfiniteAnimated } from '../base-components/BaseDynamicHeightInfiniteAnimated';
import { BaseDynamicHeightInfinite } from '../base-components/BaseDynamicHeightInfinite';
import { BaseFixedHeightInfinite } from '../base-components/BaseFixedHeightInfinite';
import { CustomScrollContainer } from '../shared/CustomScrollContainer';

export default { title: 'Custom scroll container - y', decorators, parameters };

const CustomContainerScroller = () => {
  const scrollRef = useRef(null);

  return (
    <CustomScrollContainer ref={scrollRef}>
      <BaseDefaultStory axis="y" root={() => scrollRef.current} />
    </CustomScrollContainer>
  );
};

export const MinimalUsage = () => <CustomContainerScroller />;

MinimalUsage.story = {
  name: 'Minimal Usage',
};

const CustomContainerScrollerAnimated = () => {
  const scrollRef = useRef(null);

  return (
    <CustomScrollContainer ref={scrollRef}>
      <BaseDynamicHeightInfiniteAnimated
        axis="y"
        root={() => scrollRef.current}
      />
    </CustomScrollContainer>
  );
};

export const Animated = () => <CustomContainerScrollerAnimated />;

Animated.story = {
  name: 'Infinite scroll - animated dynamic height items',
};

const CustomContainerScrollerDynamicHeight = () => {
  const scrollRef = useRef(null);

  return (
    <CustomScrollContainer ref={scrollRef}>
      <BaseDynamicHeightInfinite axis="y" root={() => scrollRef.current} />
    </CustomScrollContainer>
  );
};

export const DynamicHeight = () => <CustomContainerScrollerDynamicHeight />;

DynamicHeight.story = {
  name: 'Infinite scroll - dynamic height items',
};

const CustomContainerScrollerFixedHeight = () => {
  const scrollRef = useRef(null);

  return (
    <CustomScrollContainer ref={scrollRef}>
      <BaseFixedHeightInfinite axis="y" root={() => scrollRef.current} />
    </CustomScrollContainer>
  );
};

export const FixedHeight = () => <CustomContainerScrollerFixedHeight />;

FixedHeight.story = {
  name: 'Infinite scroll - fixed height items',
};
