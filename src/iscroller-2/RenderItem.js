import { useContext } from 'react';
import IScrollerContext from './context';

export const RenderItem = ({ item, index }) => {
  const { renderItem } = useContext(IScrollerContext);
  return renderItem(item, index);
};
