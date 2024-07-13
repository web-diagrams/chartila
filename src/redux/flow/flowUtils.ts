import { v1 } from 'uuid';
import { NodeData } from './constants/constants';
import { FlowState } from './interfaces/flowStateInterfaces';
import { XYPosition } from 'reactflow';

type CreateNode = {
  state: FlowState;
  type: NodeData;
  position?: XYPosition;
};

export const createNode = ({ state, type, position = { x: 300, y: 50 } }: CreateNode) => {
  const currentPage = state.pages.find((page) => page.id === state.currentPageId);
  switch (type) {
    case NodeData.STRING_NODE: {
      const id = v1();
      currentPage.nodes.push({
        id: id,
        type: 'customNode',
        data: { text: '', id: id, color: 'white', nodeType: 'stringNode' },
        position,
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
        position,
      });
    }
  }
};
