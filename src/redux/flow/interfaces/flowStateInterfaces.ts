import { Edge, Node } from 'reactflow';

export interface FlowState {
  pages: Page[];
  currentPageId: string;
  selectedNodes: string[];
}

export interface Page {
  id: string;
  pageName: string;
  nodes: Node<CommonNodeDataType>[];
  edges: Edge[];
}

export interface customData {
  id: string;
  text: string;
  color: string;
}

export type CommonNodeDataType = TextNodeData | CodeNodeData;

export type TextNodeData = {
  nodeType: 'stringNode';
} & customData;

export type CodeNodeData = {
  nodeType: 'codeNode';
  isWrapped: boolean;
} & customData;
