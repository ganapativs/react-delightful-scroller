import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseDynamicHeightInfiniteAnimated } from '../base-components/BaseDynamicHeightInfiniteAnimated';
import { CustomScrollContainer } from '../shared/CustomScrollContainer';

const CustomContainerScroller = () => {
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

configureStory(storiesOf('Custom scroll container - y', module)).add(
  'Infinite scroll - animated dynamic height items',
  () => <CustomContainerScroller />,
);
