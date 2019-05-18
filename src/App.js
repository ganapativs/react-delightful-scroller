import { Card, Container } from './helpers';
import React, { Component } from 'react';
import generateFakeText from './fakeText';
import IScroller from './iscroller';

const items = new Array(1000)
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
      </Container>
    );
  }
}

export default App;
