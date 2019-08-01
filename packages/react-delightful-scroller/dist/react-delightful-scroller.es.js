import React, { useState, useRef, useEffect, memo } from 'react';
import useWindowSize from '@rehooks/window-size';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import throttle from 'lodash.throttle';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var getBatchedItems = function getBatchedItems(items) {
  var batchSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var batched = []; // Faster that clone and splice

  for (var index = 0; index < items.length; index += batchSize) {
    var chunk = items.slice(index, index + batchSize); // Do something if you want with the group

    batched.push(chunk);
  }

  return batched;
};

var Wrapper = React.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      as = _ref$as === void 0 ? "div" : _ref$as,
      style = _ref.style,
      children = _ref.children;
  return React.createElement(as, {
    ref: ref,
    style: style
  }, children);
});
Wrapper.displayName = "Wrapper";

// node won't update when other props on Render item changes
// Might create memory leak/closure issues in react hooks

var RenderItemWrapper = React.memo(function (_ref) {
  var item = _ref.item,
      index = _ref.index,
      RenderItem = _ref.RenderItem;
  return React.createElement(RenderItem, {
    item: item,
    index: index
  });
});
RenderItemWrapper.displayName = "RenderItemWrapper";

var BatchRenderer = React.memo(function (_ref) {
  var batch = _ref.batch,
      index = _ref.index,
      getItemKey = _ref.getItemKey,
      batchSize = _ref.batchSize,
      wrapperElement = _ref.wrapperElement,
      removeFromDOM = _ref.removeFromDOM,
      dimensions = _ref.dimensions,
      setDimension = _ref.setDimension,
      RenderItem = _ref.RenderItem,
      visible = _ref.visible,
      itemHeight = _ref.itemHeight;
  var hasFixedHeightItems = !!itemHeight;
  var batchWrapper = null;

  if (visible || !removeFromDOM) {
    var items = batch.map(function (item, idx) {
      var actualIndex = batchSize * index + idx;
      var key = getItemKey(item, actualIndex);
      return React.createElement(RenderItemWrapper, {
        key: key,
        item: item,
        index: actualIndex,
        RenderItem: RenderItem
      });
    });
    var itemsBatch = React.createElement(Wrapper, {
      "data-iscroller-batch": index,
      as: wrapperElement,
      style: !removeFromDOM ? {
        visibility: visible ? "visible" : "hidden"
      } : {}
    }, items);
    batchWrapper = hasFixedHeightItems ? // No need to add resize observer to batch of fixed height items
    itemsBatch : // Add resize observer to batch of dynamic items
    React.createElement(Measure // ScrollHeight is actual height of batch including content margins
    , {
      scroll: true,
      onResize: function onResize(contentRect) {
        setDimension(index, contentRect);
      }
    }, function (_ref2) {
      var measureRef = _ref2.measureRef;
      return React.cloneElement(itemsBatch, {
        ref: measureRef
      });
    });
  } else {
    batchWrapper = React.createElement("div", {
      style: {
        height: dimensions.height
      }
    });
  }

  return batchWrapper;
}, function (_ref3, _ref4) {
  var prevBatch = _ref3.batch,
      prevVisible = _ref3.visible;
  var batch = _ref4.batch,
      visible = _ref4.visible;
  var batchItemsHaveSameRef = prevBatch.length === batch.length && prevBatch.every(function (e, i) {
    return e === batch[i];
  });
  return batchItemsHaveSameRef && prevVisible === visible;
});
BatchRenderer.displayName = "BatchRenderer";

var useDimensions = function useDimensions() {
  var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _useState = useState(initialValue),
      _useState2 = _slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimension = _useState2[1]; // Set state is async, we need a ref to store intermediate value


  var intermediate = useRef(null);

  var wrappedSetDimensions = function wrappedSetDimensions(index, dimension) {
    var newDimensions = _toConsumableArray(intermediate && intermediate.current || dimensions);

    var _dimension$scroll = dimension.scroll,
        width = _dimension$scroll.width,
        height = _dimension$scroll.height;
    newDimensions[index] = {
      width: width,
      height: height
    };
    intermediate.current = newDimensions;
    setDimension(newDimensions);
  };

  return [dimensions, wrappedSetDimensions];
};

function initializeDimensions(_ref) {
  var axis = _ref.axis,
      itemHeight = _ref.itemHeight,
      averageItemHeight = _ref.averageItemHeight,
      batchSize = _ref.batchSize,
      itemsCount = _ref.itemsCount;
  return function () {
    var totalBatches = Math.ceil(itemsCount / batchSize);
    var estimatedEmptyBatchHeight = axis === "y" ? Math.ceil((itemHeight || averageItemHeight) * batchSize) : // TODO - handle other directions
    0;
    var initial = [];

    for (var i = 0; i < totalBatches; i += 1) {
      initial[i] = {
        height: estimatedEmptyBatchHeight,
        width: null
      };
    }

    return initial;
  };
}

function useVisibility() {
  var initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _useState = useState(initial),
      _useState2 = _slicedToArray(_useState, 2),
      visibility = _useState2[0],
      setVisibility = _useState2[1];

  var wrappedSetVisibility = function wrappedSetVisibility(newVisibility) {
    setVisibility(newVisibility);
  };

  return [visibility, wrappedSetVisibility];
}

function initializeInitialVisibility(_ref) {
  var axis = _ref.axis,
      containerHeight = _ref.containerHeight,
      itemHeight = _ref.itemHeight,
      averageItemHeight = _ref.averageItemHeight,
      batchSize = _ref.batchSize,
      itemsCount = _ref.itemsCount;
  return function () {
    var totalBatches = Math.ceil(itemsCount / batchSize);
    var estimatedInitialBatches = axis === "y" ? Math.ceil(containerHeight / ((itemHeight || averageItemHeight) * batchSize)) : // TODO - handle other directions
    0;
    var initial = [];

    for (var i = 0; i < totalBatches; i += 1) {
      initial[i] = i < estimatedInitialBatches;
    }

    return initial;
  };
}

var getScrollOffset = function getScrollOffset(element, axis) {
  var scrollTop = element.scrollTop,
      scrollY = element.scrollY;

  if (axis === "y") {
    if (scrollTop !== undefined) {
      return scrollTop;
    }

    return scrollY;
  }

  return 0;
};

var useScroll = function useScroll(_ref) {
  var root = _ref.root,
      axis = _ref.axis;
  var timeout = useRef(null);

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      scrollOffset = _useState2[0],
      setScrollOffset = _useState2[1];

  useEffect(function () {
    var element = root || window;
    var handler = throttle(function () {
      // If there's a timer, cancel it
      if (timeout.current) {
        window.cancelAnimationFrame(timeout.current);
      } // Setup the requestAnimationFrame


      timeout.current = window.requestAnimationFrame(function () {
        return setScrollOffset(getScrollOffset(element, axis));
      });
    }, 100);
    element.addEventListener("scroll", handler, {
      capture: false,
      passive: true
    });
    return function () {
      if (handler.cancel) {
        handler.cancel();
      }

      window.cancelAnimationFrame(timeout.current);
      element.removeEventListener("scroll", handler);
    };
  }, [axis, root]);
  return scrollOffset;
};

// B starts after A starts but before A finishes.
// B starts before A starts and finishes after A starts.

function areOverlapping(A, B) {
  if (B[0] < A[0]) {
    return B[1] > A[0];
  }

  return B[0] < A[1];
}

var useVisibilityAndDimension = function useVisibilityAndDimension(_ref) {
  var root = _ref.root,
      axis = _ref.axis,
      containerHeight = _ref.containerHeight,
      itemsCount = _ref.itemsCount,
      itemHeight = _ref.itemHeight,
      averageItemHeight = _ref.averageItemHeight,
      batchSize = _ref.batchSize,
      batchBufferDistance = _ref.batchBufferDistance;

  var _useDimensions = useDimensions(initializeDimensions({
    itemsCount: itemsCount,
    axis: axis,
    itemHeight: itemHeight,
    averageItemHeight: averageItemHeight,
    batchSize: batchSize
  })),
      _useDimensions2 = _slicedToArray(_useDimensions, 2),
      dimensions = _useDimensions2[0],
      setDimension = _useDimensions2[1];

  var _useVisibility = useVisibility(initializeInitialVisibility({
    itemsCount: itemsCount,
    axis: axis,
    containerHeight: containerHeight,
    itemHeight: itemHeight,
    averageItemHeight: averageItemHeight,
    batchSize: batchSize
  })),
      _useVisibility2 = _slicedToArray(_useVisibility, 2),
      visibility = _useVisibility2[0],
      setVisibility = _useVisibility2[1];

  var scrollOffset = useScroll({
    root: root,
    axis: axis
  });
  useEffect(function () {
    var renderWindow = [scrollOffset - batchBufferDistance, scrollOffset + containerHeight + batchBufferDistance];
    var totalBatches = Math.ceil(itemsCount / batchSize);
    var nextTotal = 0;
    var nextVisibility = [];

    for (var i = 0; i < totalBatches; i += 1) {
      var currentHeight = nextTotal;
      var nextHeight = nextTotal + dimensions[i].height;
      nextVisibility[i] = areOverlapping(renderWindow, [currentHeight, nextHeight]);
      nextTotal = nextHeight;
    }

    var visibilityChanged = nextVisibility.some(function (e, i) {
      return e !== visibility[i];
    });

    if (visibilityChanged) {
      setVisibility(nextVisibility);
    }
  }, [batchSize, containerHeight, setVisibility, dimensions, itemsCount, scrollOffset, visibility, batchBufferDistance]);
  return [dimensions, visibility, setDimension];
};

var getVisibleIndexes = function getVisibleIndexes(visibility) {
  var start;
  var end;

  for (var i = 0; i < visibility.length; i += 1) {
    var v = visibility[i];

    if (start !== undefined && end !== undefined && !v) {
      break;
    }

    if (start === undefined && v) {
      start = i;
    }

    if (start !== undefined && v) {
      end = i;
    }
  }

  return [start, end];
};

var Sentinel = function Sentinel(_ref) {
  var fetchMoreBufferDistance = _ref.fetchMoreBufferDistance,
      onFetchMore = _ref.onFetchMore,
      RenderLoader = _ref.RenderLoader,
      wrapperElement = _ref.wrapperElement,
      items = _ref.items,
      itemsCount = _ref.itemsCount,
      batchSize = _ref.batchSize,
      root = _ref.root,
      axis = _ref.axis;
  var ref = useRef(null);
  useEffect(function () {
    var targetNode = ref.current;
    var options = {
      root: root,
      rootMargin: axis === "y" ? "0px 0px ".concat(fetchMoreBufferDistance, "px 0px") : "0px",
      threshold: 0
    };

    var callback = function callback(_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
          isIntersecting = _ref3[0].isIntersecting;

      if (isIntersecting) {
        onFetchMore({
          items: items,
          itemsCount: itemsCount,
          batchSize: batchSize
        });
      }
    };

    var observer = new IntersectionObserver(callback, options);

    if (targetNode) {
      observer.observe(targetNode);
    }

    return function () {
      // Stop watching all of its target elements for visibility changes
      observer.disconnect();
    };
  }, [axis, fetchMoreBufferDistance, batchSize, items, onFetchMore, root, itemsCount]);
  return React.createElement(wrapperElement, {
    ref: ref
  }, React.createElement(RenderLoader, {
    items: items,
    itemsCount: itemsCount,
    batchSize: batchSize
  }));
};

var DefaultRenderContainer = function DefaultRenderContainer(_ref) {
  var children = _ref.children,
      forwardRef = _ref.forwardRef;
  return React.createElement("div", {
    ref: forwardRef
  }, children);
};
DefaultRenderContainer.displayName = "DefaultRenderContainer"; // eslint-disable-next-line no-unused-vars

var DefaultRenderItem = function DefaultRenderItem(_ref2) {
  var item = _ref2.item,
      index = _ref2.index;
  return item;
};
DefaultRenderItem.displayName = "DefaultRenderItem"; // eslint-disable-next-line no-unused-vars

var DefaultRenderLoader = function DefaultRenderLoader(_ref3) {
  var items = _ref3.items,
      itemsCount = _ref3.itemsCount,
      batchSize = _ref3.batchSize;
  return null;
};
DefaultRenderLoader.displayName = "DefaultRenderLoader";

var BaseRenderer = function BaseRenderer(_ref) {
  var containerHeight = _ref.containerHeight,
      items = _ref.items,
      RenderItem = _ref.RenderItem,
      getItemKey = _ref.getItemKey,
      wrapperElement = _ref.wrapperElement,
      forwardRef = _ref.forwardRef,
      RenderContainer = _ref.RenderContainer,
      removeFromDOM = _ref.removeFromDOM,
      root = _ref.root,
      batchSize = _ref.batchSize,
      axis = _ref.axis,
      averageItemHeight = _ref.averageItemHeight,
      itemHeight = _ref.itemHeight,
      itemsCount = _ref.itemsCount,
      batchBufferDistance = _ref.batchBufferDistance,
      onFetchMore = _ref.onFetchMore,
      RenderLoader = _ref.RenderLoader,
      fetchMoreBufferDistance = _ref.fetchMoreBufferDistance;

  var _useVisibilityAndDime = useVisibilityAndDimension({
    root: root,
    axis: axis,
    containerHeight: containerHeight,
    itemsCount: itemsCount,
    itemHeight: itemHeight,
    averageItemHeight: averageItemHeight,
    batchSize: batchSize,
    batchBufferDistance: batchBufferDistance
  }),
      _useVisibilityAndDime2 = _slicedToArray(_useVisibilityAndDime, 3),
      dimensions = _useVisibilityAndDime2[0],
      visibility = _useVisibilityAndDime2[1],
      setDimension = _useVisibilityAndDime2[2];

  var batchedItems = getBatchedItems(items, batchSize);
  var current = batchedItems;
  var previous = [];
  var next = [];
  var prevHeight;
  var nextHeight;

  if (removeFromDOM) {
    var _getVisibleIndexes = getVisibleIndexes(visibility),
        _getVisibleIndexes2 = _slicedToArray(_getVisibleIndexes, 2),
        startIndex = _getVisibleIndexes2[0],
        endIndex = _getVisibleIndexes2[1];

    previous = batchedItems.slice(0, startIndex);
    current = batchedItems.slice(startIndex, endIndex + 1);
    next = batchedItems.slice(endIndex + 1, batchedItems.length);
    prevHeight = previous.reduce(function (p, c, i) {
      var index = i;
      var dimension = dimensions[index];
      return p + dimension.height;
    }, 0);
    nextHeight = next.reduce(function (p, c, i) {
      var index = previous.length + current.length + i;
      var dimension = dimensions[index];
      return p + dimension.height;
    }, 0);
  }

  var batchedElements = current.map(function (batch, i) {
    var index = previous.length + i;
    return React.createElement(BatchRenderer, {
      key: index,
      batch: batch,
      index: index,
      getItemKey: getItemKey,
      batchSize: batchSize,
      wrapperElement: wrapperElement,
      removeFromDOM: removeFromDOM,
      setDimension: setDimension,
      RenderItem: RenderItem,
      dimensions: dimensions[index],
      visible: visibility[index],
      itemHeight: itemHeight
    });
  });
  var Container = React.createElement(RenderContainer, {
    forwardRef: forwardRef
  }, prevHeight ? React.createElement("div", {
    style: {
      height: prevHeight,
      visibility: "hidden"
    }
  }) : null, batchedElements, nextHeight ? React.createElement("div", {
    style: {
      height: nextHeight,
      visibility: "hidden"
    }
  }) : null, axis === "y" && items.length < itemsCount ? React.createElement(Sentinel, {
    onFetchMore: onFetchMore,
    fetchMoreBufferDistance: fetchMoreBufferDistance,
    RenderLoader: RenderLoader,
    wrapperElement: wrapperElement,
    items: items,
    itemsCount: itemsCount,
    batchSize: batchSize,
    root: root,
    axis: axis
  }) : null);
  return Container;
};

BaseRenderer.displayName = "BaseRenderer";

var WindowContainer = function WindowContainer(props) {
  var _useWindowSize = useWindowSize(),
      innerWidth = _useWindowSize.innerWidth,
      innerHeight = _useWindowSize.innerHeight;

  return React.createElement(BaseRenderer, _extends({}, props, {
    containerWidth: innerWidth,
    containerHeight: innerHeight
  }));
};

var Entry = function Entry(props, ref) {
  if (!props.root) {
    return React.createElement(WindowContainer, _extends({}, props, {
      forwardRef: ref
    }));
  } // TODO - Custom container


  return null;
};

var DelightfulScroller = memo(React.forwardRef(Entry));
DelightfulScroller.defaultProps = {
  items: [],
  itemsCount: 0,
  RenderItem: DefaultRenderItem,
  getItemKey: function getItemKey(item, index) {
    return typeof item === "string" ? item : index;
  },
  wrapperElement: "div",
  RenderContainer: DefaultRenderContainer,
  removeFromDOM: true,
  root: null,
  averageItemHeight: 10,
  itemHeight: null,
  axis: "y",
  batchSize: 10,
  batchBufferDistance: 250,
  fetchMoreBufferDistance: 500,
  RenderLoader: DefaultRenderLoader,
  // eslint-disable-next-line no-unused-vars
  onFetchMore: function onFetchMore(_ref2) {
    var items = _ref2.items,
        itemsCount = _ref2.itemsCount,
        batchSize = _ref2.batchSize;
  }
};
DelightfulScroller.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  itemsCount: PropTypes.number,
  RenderItem: PropTypes.elementType,
  getItemKey: PropTypes.func,
  wrapperElement: PropTypes.string,
  RenderContainer: PropTypes.elementType,
  removeFromDOM: PropTypes.bool,
  root: PropTypes.element,
  averageItemHeight: PropTypes.number,
  itemHeight: PropTypes.number,
  axis: PropTypes.oneOf(["y"]),
  batchSize: PropTypes.number,
  batchBufferDistance: PropTypes.number,
  fetchMoreBufferDistance: PropTypes.number,
  RenderLoader: PropTypes.elementType,
  onFetchMore: PropTypes.func
};
DelightfulScroller.displayName = "DelightfulScroller";

export default DelightfulScroller;
//# sourceMappingURL=react-delightful-scroller.es.js.map
