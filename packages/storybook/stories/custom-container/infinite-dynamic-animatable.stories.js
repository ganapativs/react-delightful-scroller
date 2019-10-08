import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseDynamicHeightInfiniteAnimated } from '../base-components/BaseDynamicHeightInfiniteAnimated';
import { CustomScrollContainer } from '../shared/CustomScrollContainer';

const CustomContainerScroller = () => {
  const scrollRef = useRef(null);

  return (
    <CustomScrollContainer ref={scrollRef}>
      <BaseDynamicHeightInfiniteAnimated root={() => scrollRef.current} />
    </CustomScrollContainer>
  );
};

configureStory(storiesOf('Custom scroll container', module)).add(
  'Infinite scroll - animated dynamic height items',
  () => <CustomContainerScroller />,
);
