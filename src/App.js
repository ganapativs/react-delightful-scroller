import { Card, Container } from './helpers';
import React, { Component } from 'react';
import generateFakeText from './fakeText';
import IScroller from './iscroller';

const items = new Array(50)
  .fill(true)
  .map(() => generateFakeText(Math.ceil(Math.random() * 3)));

const itemRenderer = (item, index) => (
  <Card key={item}>
    <p>
      <b>Index: </b>
      {index}
    </p>
    <p>{item}</p>
  </Card>
);

class App extends Component {
  render() {
    return (
      <Container>
        <IScroller
          /* d */ ref={r => console.log('TCL: App -> render -> r', r)}
          /* d */ items={items}
          /* d */ renderItem={itemRenderer}
          /* d */ getItemKey={(item, index) => item + index}
          /* d */ wrapperElement="div"
          /* d */ removeFromDOM
          /* d */ itemContainerRenderer={({ children, ref }) => (
            <div ref={ref}>{children}</div>
          )}
          itemsCount={items.length}
          minItemHeight={1} // Min item height should be 1px
          itemHeight={null} // Dynamic item height
          axis="y"
          threshold={0}
          root={null} // Scroll parent
          rootMargin={null} // Margin around the root
          fetchItems={() => {}}
          loader={() => 'Loading...'}
        />
      </Container>
    );
  }
}

export default App;
