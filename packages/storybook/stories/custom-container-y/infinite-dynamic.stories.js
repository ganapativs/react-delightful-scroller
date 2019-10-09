import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseDynamicHeightInfinite } from '../base-components/BaseDynamicHeightInfinite';
import { CustomScrollContainer } from '../shared/CustomScrollContainer';

const CustomContainerScroller = () => {
  const scrollRef = useRef(null);

  return (
    <CustomScrollContainer ref={scrollRef}>
      <BaseDynamicHeightInfinite axis="y" root={() => scrollRef.current} />
    </CustomScrollContainer>
  );
};

configureStory(storiesOf('Custom scroll container - y', module)).add(
  'Infinite scroll - dynamic height items',
  () => <CustomContainerScroller />,
);
