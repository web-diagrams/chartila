import { Edge, Node } from 'reactflow';

export interface FlowState {
  pages: Page[];
  currentPageId: string;
}

export interface Page {
  id: string;
  pageName: string;
  nodes: Node[];
  edges: Edge[];
}

export interface IStringNode extends Node {
  value: string;
}

export interface ICodeNode extends Node {
  value: string;
  isWrapped: boolean;
}
