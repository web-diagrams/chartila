import { Edge, Node } from 'reactflow';

export interface FlowState {
  pages: Page[];
  currentPageId: string;
}

export interface Page {
  id: string;
  pageName: string;
  nodes: Node<SelfNode>[];
  edges: Edge[];
}

interface SelfNode extends Omit<Node, 'position' | 'data'> {
  value: string;
  color: string;
}

export interface IStringNode extends SelfNode { }

export interface ICodeNode extends SelfNode {
  isWrapped: boolean;
}
