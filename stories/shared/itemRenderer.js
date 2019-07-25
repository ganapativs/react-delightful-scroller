import React from 'react';
import { Card, Input, DarkLayer } from '../components/helpers';

export const itemRenderer = ({ item, index }) => {
  return (
    <Card key={item} style={{ background: item.gradient }}>
      <DarkLayer>
        <p>{item.text}</p>
        <Input defaultValue={index} type="number" />
      </DarkLayer>
    </Card>
  );
};
