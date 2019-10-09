import React from 'react';
import { storiesOf } from '@storybook/react';
import { configureStory } from '../shared/base';
import { BaseFixedHeightInfinite } from '../base-components/BaseFixedHeightInfinite';

configureStory(storiesOf('Window scroller - y', module)).add(
  'Infinite scroll - fixed height items',
  () => <BaseFixedHeightInfinite axis="y" />,
);
