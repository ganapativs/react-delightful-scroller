import React, { Component } from 'react';
import generateFakeText from './fakeText';
import IScroller from './iscroller';

const items = new Array(1000)
  .fill(true)
  .map(() => generateFakeText(Math.ceil(Math.random() * 3)));

const itemRenderer = (item, index) => (
  <pre
    key={item}
    style={{
      whiteSpace: 'pre-wrap',
      // backgroundColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
      borderBottom: '1px solid #ccc',
    }}>
    {item}
  </pre>
);

class App extends Component {
  render() {
    return (
      <IScroller
        /* d */ items={items}
        /* d */ renderItem={itemRenderer}
        ref={r => console.log('TCL: App -> render -> r', r)}
        itemsCount={items.length}
        minItemHeight={1} // Min item height should be 1px
        itemHeight={null} // Dynamic item height
        removeFromDOM
        axis="y"
        threshold={0}
        rootElement={null} // Scroll parent
        fetchItems={() => {}}
        loader={() => 'Loading...'}
      />
    );
  }
}

export default App;
