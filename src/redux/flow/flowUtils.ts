import { v1 } from 'uuid';
import { NodeData } from './constants/constants';
import { CommonNodeDataType, FlowState, HistoryState } from './interfaces/flowStateInterfaces';
import { XYPosition } from 'reactflow';
import { Node } from 'reactflow';
import { cloneDeep } from 'lodash';

type CreateNode = {
  type: NodeData;
  position: XYPosition;
};

const HISTORY_LIMIT = 10;

export const stateToHistory = (state: HistoryState) => {
  /**Если внесены изменения, то очищаем шаги для redo  */
  if (state.history[state.step + 1]) {
    state.history = state.history.filter((_, index) => index <= state.step);
  }
  state.history.push(cloneDeep(releaseNodes(state)));
  // превышает ли количество элементов в стеке лимит?
  if (state.step + 1 >= HISTORY_LIMIT) {
    state.history = state.history.filter((el, index, array) => index > array.length - HISTORY_LIMIT - 1);
  } else {
    state.step += 1;
  }
};

export const getNewNode = ({ type, position }: CreateNode): Node<CommonNodeDataType> => {
  switch (type) {
    case NodeData.STRING_NODE: {
      const id = v1();
      return {
        id: id,
        type: 'customNode',
        data: { text: '', id: id, color: 'white', nodeType: 'stringNode' },
        position,
      };
    }
    case NodeData.CODE_NODE: {
      const id = v1();
      return {
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
      };
    }
  }
};

export const getCurrentPage = (state: HistoryState) => {
  const currentState = state.currentState;
  return currentState.pages.find((page) => page.id === currentState.currentPageId);
};

function releaseNodes(state: HistoryState): FlowState {
  return {
    ...state.currentState,
    selectedNodes: [],
    pages: state.currentState.pages.map((page) => ({
      ...page,
      nodes: page.nodes.map((node) => ({
        ...node,
        selected: false,
      })),
    })),
  };
}
