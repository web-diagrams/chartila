import { v1 } from 'uuid';
import { CommonNode, FlowState } from '@/redux/flow/interfaces/flowStateInterfaces';

export const createNode = (state: FlowState, type: CommonNode) => {
  const currentPage = state.pages.find((page) => page.id === state.currentPageId);
  switch (type.data.nodeType) {
    case 'stringNode': {
      const id = v1();
      currentPage.nodes.push({
        id: id,
        type: 'customNode',
        data: { value: '', id: id, color: 'black', nodeType: 'stringNode' },
        position: { x: 300, y: 50 },
      });
      break;
    }
    case 'codeNode': {
      const id = v1();
      currentPage.nodes.push({
        id: id,
        type: 'customNode',
        data: {
          value: '',
          id: id,
          color: 'black',
          nodeType: 'codeNode',
          isWrapped: false,
        },
        position: { x: 300, y: 50 },
      });
    }
  }
};
