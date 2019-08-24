# Welcome to react-delightful-scroller 👋

<p>
  <img alt="Version" src="https://img.shields.io/npm/v/react-delightful-scroller.svg">
  <a href="https://greenkeeper.io/">
    <img alt="Greenkeeper badge" src="https://badges.greenkeeper.io/ganapativs/react-delightful-scroller.svg" target="_blank" />
  </a>
  <a href="https://github.com/ganapativs/react-delightful-scroller#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/ganapativs/react-delightful-scroller/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/ganapativs/react-delightful-scroller/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://app.netlify.com/sites/react-delightful-scroller/deploys">
    <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/78aa47e6-80f3-4372-aeba-b2fb6bf491bf/deploy-status" target="_blank" />
  </a>
  <a href="https://twitter.com/ganapativs">
    <img alt="Twitter: ganapativs" src="https://img.shields.io/twitter/follow/ganapativs.svg?style=social" target="_blank" />
  </a>
</p>

A delightful, virtualized modern infinite scroller 🎉

Find demos and more usage examples at **[react-delightful-scroller.netlify.com](https://react-delightful-scroller.netlify.com/)**

```jsx
// Basic usage
import React from "react";
import DelightfulScroller from "react-delightful-scroller";

const items = Array.from({ length: 100 })
  .fill(true)
  .map((_, i) => i + 1);

const VirtualizedItems = () => (
  <DelightfulScroller
    items={items}
    RenderItem={({ item }) => <div>{item}</div>}
    itemsCount={items.length}
    averageItemHeight={10}
  />
);
```

## Features

- Provides delightful infinite scrolling experience for thousands of items
- Uses batching and virtualization techniques to reduce DOM nodes
- Handles fixed and dynamic height elements automatically
- Smooth, aims to achieve 60fps
- Fully customizable
- Uses modern web APIs/features
- Supports vertical scrolling on window (More axis and custom element scroll support soon)
- Tiny library(Around **7kb gzip**)
- Many more

## Component props

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| items | Array | ✓ | Items to render, can be array of strings, objects or numbers etc. |
| itemsCount | Number | ✓ | Total number of items to render, this can be larger than number of `items`, in that case a sentinel is added at the bottom(infinite scroll) of rendered items and `onFetchMore` is triggered when page is scrolled to bottom until the number of `items` are equal to the `itemsCount`. |
| RenderItem | Component | ✓ | Component which renders each item. Gets `item` and `index` as prop. |
| RenderContainer | Component |  | Component which renders scroll container. Gets `children` and `forwardRef` as prop. |
| removeFromDOM | Boolean |  | Should remove/add items from DOM while virtualizing and replace with empty node of same height of item. If set to `false`, items will be set to `visibility: hidden;` if not visible in the viewport. Default: `true`. |
| root | Function |  | A function returning scroll parent node. Scroll listener will be attached to this element(if provided) instead of `window`. Default: `null`(indicates `window`/viewport is the scroll parent). |
| averageItemHeight | Number |  | Average item height if the items are dynamic. Default: `10`. |
| itemHeight | Number |  | Fixed item height if the items height is fixed. This takes more priority over `averageItemHeight` if specified. Default: `null`. |
| getItemKey | Function |  | Specify custom `key` prop while rendering each item. function receives `item` and `index` as argument. |
| wrapperElement | String |  | HTML tag used to wrap each rendered item and sentinel. Default: `div`. |
| axis | String |  | Scroll axis. Default: `y`. |
| batch | Boolean |  | Should batch items(check `batchSize`) or not. Default: `true`. |
| batchSize | Number |  | Batch of items to render at once when virtualizing. Default: `10`. |
| batchBufferDistance | Number |  | Buffer distance of batch from both side of viewport/scrollable node. the batch is only rendered if the batch overlaps with this offset. Default: `250`. |
| fetchMoreBufferDistance | Number |  | Buffer distance to trigger `onFetchMore`. Default: `500`. |
| onFetchMore | Function |  | Function called when sentinel is near the viewport(when it crosses `fetchMoreBufferDistance`). The function receives `{size, itemsCount, batchSize}` as argument. |
| RenderLoader | Component |  | Component which renders loader when sentinel triggers `onFetchMore`(basically, more items are loading). Gets `items`, `itemsCount` and `batchSize` as prop. |

## Install

This project uses yarn workspaces. You need to have `yarn` installed.

```sh
yarn
```

## Usage

```sh
# Develop
yarn watch
```

```sh
# Build and serve
yarn build
yarn serve
```

## TODO

- [x] Custom container support
- [ ] Support more axis - x, y-reverse & x-reverse
- [ ] Scroll restoration
- [ ] More stories
- [ ] Test cases

## Author

👤 **Ganapati V S [<meetguns.com>](meetguns.com)**

* Twitter: [@ganapativs](https://twitter.com/ganapativs)
* Github: [@ganapativs](https://github.com/ganapativs)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ganapativs/react-delightful-scroller/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Ganapati V S <meetguns.com>](https://github.com/ganapativs).<br />
This project is [MIT](https://github.com/ganapativs/react-delightful-scroller/blob/master/LICENSE) licensed.
