import { v1 } from 'uuid';
import { NodeData } from './constants/constants';
import { CommonNodeDataType, DocState, FlowState } from './interfaces/docStateInterfaces';
import { Node, XYPosition } from 'reactflow';
import { cloneDeep } from 'lodash';

type CreateNode = {
  type: NodeData;
  position: XYPosition;
};

const HISTORY_LIMIT = 10;

/**
 * Adds current state to history for undo/redo functionality
 * @param state - Current document state to save to history
 */
export const stateToHistory = (state: DocState) => {
  state.currentState.isUpdated = true;

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

/**
 * Creates a new node based on the specified type and position
 * @param type - Type of node to create (STRING_NODE or CODE_NODE)
 * @param position - X,Y coordinates for the new node
 * @returns New node object with generated ID and default data
 */
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
          language: 'Javascript',
        },
        position,
      };
    }
  }
};

/**
 * Gets the currently active page from the document state
 * @param state - Document state containing pages and current page ID
 * @returns Current page object or undefined if not found
 */
export const getCurrentPage = (state: DocState) => {
  const currentState = state.currentState;
  return currentState.pages.find((page) => page.id === currentState.currentPageId);
};

function releaseNodes(state: DocState): FlowState {
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
