import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseDynamicHeightInfinite } from '../base-components/BaseDynamicHeightInfinite';
import { CustomScrollContainer } from '../shared/CustomScrollContainer';

const CustomContainerScroller = () => {
  const scrollRef = useRef(null);

  return (
    <CustomScrollContainer ref={scrollRef}>
      <BaseDynamicHeightInfinite root={() => scrollRef.current} />
    </CustomScrollContainer>
  );
};

configureStory(storiesOf('Custom scroll container', module)).add(
  'Infinite scroll - dynamic height items',
  () => <CustomContainerScroller />,
);
