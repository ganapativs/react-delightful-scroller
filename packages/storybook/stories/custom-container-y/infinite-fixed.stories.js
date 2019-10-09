import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseFixedHeightInfinite } from '../base-components/BaseFixedHeightInfinite';
import { CustomScrollContainer } from '../shared/CustomScrollContainer';

const CustomContainerScroller = () => {
  const scrollRef = useRef(null);

  return (
    <CustomScrollContainer ref={scrollRef}>
      <BaseFixedHeightInfinite axis="y" root={() => scrollRef.current} />
    </CustomScrollContainer>
  );
};

configureStory(storiesOf('Custom scroll container - y', module)).add(
  'Infinite scroll - fixed height items',
  () => <CustomContainerScroller />,
);
