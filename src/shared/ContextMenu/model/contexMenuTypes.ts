import { XYPosition } from 'reactflow';

export type StateType = {
  isOpen: boolean;
  style: React.CSSProperties;
  nodePosition: XYPosition;
  isNode: boolean; // контекстное меню ноды
};
