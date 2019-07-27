import React from 'react';
import { Card, Input, DarkLayer } from '../components/helpers';

export const RenderItem = ({ item, index }) => {
  return (
    <Card key={item.text} style={{ background: item.gradient }}>
      <DarkLayer>
        <p>{item.text}</p>
        <Input defaultValue={index} />
      </DarkLayer>
    </Card>
  );
};
