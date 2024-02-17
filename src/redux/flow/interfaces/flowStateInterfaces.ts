import { Edge, Node } from 'reactflow';

export interface FlowState {
  pages: Page[];
  currentPageId: string;
}

export interface Page {
  id: string;
  pageName: string;
  nodes: CommonNode[];
  edges: Edge[];
}

export interface customData {
  id: string;
  value: string;
  color: string;
}

export interface StringNode extends Omit<Node<customData>, 'data'> {
  data: StringNodeData;
}
export interface CodeNode extends Omit<Node<customData>, 'data'> {
  data: CodeNodeData;
}

export type CommonNode = StringNode | CodeNode;

export type StringNodeData = {
  nodeType: 'stringNode';
} & customData;
export type CodeNodeData = {
  nodeType: 'codeNode';
  isWrapped: boolean;
} & customData;
