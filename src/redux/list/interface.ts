import { Edge, Node } from 'reactflow';

export interface InitialState {
  id: string;
  pages: Page[];
}

export interface Page {
  id: string;
  pageName: string;
  nodes: Node[];
  edges: Edge[];
}
