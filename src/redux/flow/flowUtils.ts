import { v1 } from 'uuid';
import { FlowState, ICodeNode } from './interfaces/flowStateInterfaces';

export const createNode = (state: FlowState, type: 'stringNode' | 'codeNode') => {
  const currentPage = state.pages.find((page) => page.id === state.currentPageId);
  switch (type) {
    case 'stringNode': {
      const id = v1();
      currentPage.nodes.push({
        id: id,
        type: 'stringNode',
        data: { value: '', id: id, color: 'black' },
        position: { x: 300, y: 50 },
      });
      break;
    }
    case 'codeNode': {
      const id = v1();
      currentPage.nodes.push({
        id: id,
        type: 'codeNode',
        data: {
          value: '',
          id: id,
          color: 'black',
          isWrapped: false,
        } as ICodeNode,
        position: { x: 300, y: 50 },
      });
    }
  }
};
