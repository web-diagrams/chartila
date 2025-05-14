import { ReactNode } from 'react';
import { XYPosition } from 'reactflow';

export type StateType = {
  isOpen: boolean;
  style: React.CSSProperties;
  nodePosition: XYPosition;
  isNode: boolean; // контекстное меню ноды
};

export type ContextOption = {
  icon?: ReactNode;
  label?: string;
  onClick: () => void;
  type: 'button' | 'divider';
}