import { getCurrentPage, getNewNode, stateToHistory } from './docUtils';
import { DocState, FlowState } from './interfaces/docStateInterfaces';
import { NodeData } from './constants/constants';
import { v1 } from 'uuid';

// Mock uuid
jest.mock('uuid', () => ({
  v1: jest.fn(() => 'mocked-uuid')
}));

// Mock lodash cloneDeep
jest.mock('lodash', () => ({
  cloneDeep: jest.fn((obj) => JSON.parse(JSON.stringify(obj)))
}));

describe('docUtils functions', () => {
  describe('stateToHistory', () => {
    let mockState: DocState;

    beforeEach(() => {
      mockState = {
        currentState: {
          pages: [
            {
              id: 'page-1',
              pageName: 'Test Page',
              nodes: [],
              edges: []
            }
          ],
          currentPageId: 'page-1',
          selectedNodes: [],
          isUpdated: false,
          docName: 'Test Doc'
        },
        history: [
          {
            pages: [],
            currentPageId: '',
            selectedNodes: [],
            isUpdated: false,
            docName: ''
          }
        ],
        step: 0,
        isInited: true
      };
    });

    test('should mark current state as updated', () => {
      stateToHistory(mockState);
      expect(mockState.currentState.isUpdated).toBe(true);
    });

    test('should add current state to history', () => {
      const initialHistoryLength = mockState.history.length;
      stateToHistory(mockState);
      expect(mockState.history.length).toBe(initialHistoryLength + 1);
    });

    test('should clear future history when not at the end', () => {
      // Add some future history
      mockState.history.push({} as FlowState, {} as FlowState);
      mockState.step = 0; // Not at the end
      
      stateToHistory(mockState);
      expect(mockState.history.length).toBe(2); // Should keep only up to current step + new state
    });

    test('should increment step when adding to history', () => {
      const initialStep = mockState.step;
      stateToHistory(mockState);
      expect(mockState.step).toBe(initialStep + 1);
    });

    test('should limit history size to HISTORY_LIMIT', () => {
      // Fill history beyond limit
      for (let i = 0; i < 15; i++) {
        stateToHistory(mockState);
      }
      expect(mockState.history.length).toBeLessThanOrEqual(10);
    });
  });

  describe('getNewNode', () => {
    const mockPosition = { x: 100, y: 200 };

    test('should create a string node with correct properties', () => {
      const node = getNewNode({ type: NodeData.STRING_NODE, position: mockPosition });
      
      expect(node.id).toBe('mocked-uuid');
      expect(node.type).toBe('customNode');
      expect(node.position).toEqual(mockPosition);
      expect(node.data.nodeType).toBe('stringNode');
      expect(node.data.text).toBe('');
      expect(node.data.color).toBe('white');
    });

    test('should create a code node with correct properties', () => {
      const node = getNewNode({ type: NodeData.CODE_NODE, position: mockPosition });
      
      expect(node.id).toBe('mocked-uuid');
      expect(node.type).toBe('customNode');
      expect(node.position).toEqual(mockPosition);
      expect(node.data.nodeType).toBe('codeNode');
      expect(node.data.text).toBe('');
      expect(node.data.color).toBe('white');
      expect(node.data).toHaveProperty('language', 'Javascript');
    });

    test('should generate unique IDs for multiple nodes', () => {
      const mockV1 = v1 as jest.MockedFunction<typeof v1>;
      mockV1.mockReturnValueOnce('uuid-1').mockReturnValueOnce('uuid-2');

      const node1 = getNewNode({ type: NodeData.STRING_NODE, position: mockPosition });
      const node2 = getNewNode({ type: NodeData.CODE_NODE, position: mockPosition });
      
      expect(node1.id).toBe('uuid-1');
      expect(node2.id).toBe('uuid-2');
    });

    test('should preserve position coordinates', () => {
      const customPosition = { x: 500, y: 750 };
      const node = getNewNode({ type: NodeData.STRING_NODE, position: customPosition });
      
      expect(node.position).toEqual(customPosition);
    });
  });

  describe('getCurrentPage', () => {
    let mockState: DocState;

    beforeEach(() => {
      mockState = {
        currentState: {
          pages: [
            {
              id: 'page-1',
              pageName: 'Page 1',
              nodes: [],
              edges: []
            },
            {
              id: 'page-2',
              pageName: 'Page 2',
              nodes: [],
              edges: []
            }
          ],
          currentPageId: 'page-1',
          selectedNodes: [],
          isUpdated: false,
          docName: 'Test Doc'
        },
        history: [],
        step: 0,
        isInited: true
      };
    });

    test('should return the current page when it exists', () => {
      const currentPage = getCurrentPage(mockState);
      
      expect(currentPage).toBeDefined();
      expect(currentPage?.id).toBe('page-1');
      expect(currentPage?.pageName).toBe('Page 1');
    });

    test('should return undefined when current page does not exist', () => {
      mockState.currentState.currentPageId = 'non-existent-page';
      
      const currentPage = getCurrentPage(mockState);
      expect(currentPage).toBeUndefined();
    });

    test('should return correct page when currentPageId changes', () => {
      mockState.currentState.currentPageId = 'page-2';
      
      const currentPage = getCurrentPage(mockState);
      expect(currentPage?.id).toBe('page-2');
      expect(currentPage?.pageName).toBe('Page 2');
    });

    test('should handle empty pages array', () => {
      mockState.currentState.pages = [];
      
      const currentPage = getCurrentPage(mockState);
      expect(currentPage).toBeUndefined();
    });

    test('should handle empty currentPageId', () => {
      mockState.currentState.currentPageId = '';
      
      const currentPage = getCurrentPage(mockState);
      expect(currentPage).toBeUndefined();
    });
  });
});
