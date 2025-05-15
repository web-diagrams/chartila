import { ReactNode } from 'react';
import { XYPosition } from 'reactflow';

export type StateType = {
  style: React.CSSProperties;
  nodePosition: XYPosition;
};

export type ContextOption = {
  icon?: ReactNode;
  label?: string;
  onClick: () => void;
  type: 'button' | 'divider';
}