import { v1 } from 'uuid';
import { NodeData } from './constants/constants';
import { FlowState } from './interfaces/flowStateInterfaces';

export const createNode = (state: FlowState, type: NodeData) => {
  const currentPage = state.pages.find((page) => page.id === state.currentPageId);
  switch (type) {
    case NodeData.STRING_NODE: {
      const id = v1();
      currentPage.nodes.push({
        id: id,
        type: 'customNode',
        data: { text: '', id: id, color: 'white', nodeType: 'stringNode' },
        position: { x: 300, y: 50 },
      });
      break;
    }
    case NodeData.CODE_NODE: {
      const id = v1();
      currentPage.nodes.push({
        id: id,
        type: 'customNode',
        data: {
          text: '',
          id: id,
          color: 'white',
          nodeType: 'codeNode',
          isWrapped: false,
        },
        position: { x: 300, y: 50 },
      });
    }
  }
};
