import React from 'react';
import { decorators, parameters } from '../utils/story-base-config';
import { BaseDefaultStory } from '../base-components/BaseDefaultStory';
import { BaseDynamicHeightInfiniteAnimated } from '../base-components/BaseDynamicHeightInfiniteAnimated';
// import { BaseDynamicHeightInfinite } from '../base-components/BaseDynamicHeightInfinite';
// import { BaseFixedHeightInfinite } from '../base-components/BaseFixedHeightInfinite';

export default { title: 'Window scroller - x', decorators, parameters };

export const MinimalUsage = () => <BaseDefaultStory axis="x" />;

MinimalUsage.story = {
  name: 'Minimal Usage',
};

export const Animated = () => <BaseDynamicHeightInfiniteAnimated axis="x" />;

Animated.story = {
  name: 'Infinite scroll - animated dynamic height items',
};

// export const DynamicHeight = () => <BaseDynamicHeightInfinite axis="x" />;

// DynamicHeight.story = {
//   name: 'Infinite scroll - dynamic height items',
// };

// export const FixedHeight = () => <BaseFixedHeightInfinite axis="x" />;

// FixedHeight.story = {
//   name: 'Infinite scroll - fixed height items',
// };
