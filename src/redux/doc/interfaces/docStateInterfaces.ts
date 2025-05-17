import { Edge, Node } from 'reactflow';

export type DocState = {
  history: FlowState[];
  currentState: FlowState;
  /** index используемого элемента истории */
  step: number;
  isInited: boolean;
};

export interface FlowState {
  pages: Page[];
  currentPageId: string;
  selectedNodes: string[];
  isUpdated: boolean;
  docName: string;
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

export type Language = 'Javascript' | 'Java' | 'Python';
export type CodeNodeData = {
  nodeType: 'codeNode';
  language?: Language;
} & customData;
