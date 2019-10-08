import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { CustomScrollContainer } from '../shared/CustomScrollContainer';
import { BaseDefaultStory } from '../base-components/BaseDefaultStory';

const CustomContainerScroller = () => {
  const scrollRef = useRef(null);

  return (
    <CustomScrollContainer ref={scrollRef}>
      <BaseDefaultStory root={() => scrollRef.current} />
    </CustomScrollContainer>
  );
};

configureStory(storiesOf('Custom scroll container', module)).add(
  'Minimal usage',
  () => <CustomContainerScroller />,
);
