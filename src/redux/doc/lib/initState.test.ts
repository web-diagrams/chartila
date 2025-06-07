import { initState } from './initState';
import { DocState, Page } from '../interfaces/docStateInterfaces';

// Mock lodash cloneDeep
jest.mock('lodash', () => ({
  cloneDeep: jest.fn((obj) => JSON.parse(JSON.stringify(obj)))
}));

describe('initState utility function', () => {
  let mockState: DocState;

  beforeEach(() => {
    mockState = {
      currentState: {
        pages: [],
        currentPageId: '',
        selectedNodes: [],
        isUpdated: false,
        docName: 'Default Doc'
      },
      history: [
        {
          pages: [],
          currentPageId: '',
          selectedNodes: [],
          isUpdated: false,
          docName: 'Default Doc'
        }
      ],
      step: 0,
      isInited: false
    };
  });

  test('should initialize state with default page when no pages provided', () => {
    const pageId = 'test-page-id';
    
    initState(mockState, pageId);
    
    expect(mockState.currentState.pages).toHaveLength(1);
    expect(mockState.currentState.pages[0].id).toBe(pageId);
    expect(mockState.currentState.pages[0].pageName).toBe('New page');
    expect(mockState.currentState.pages[0].nodes).toEqual([]);
    expect(mockState.currentState.pages[0].edges).toEqual([]);
    expect(mockState.currentState.currentPageId).toBe(pageId);
    expect(mockState.isInited).toBe(true);
  });

  test('should initialize state with provided pages', () => {
    const pageId = 'test-page-id';
    const customPages: Page[] = [
      {
        id: 'custom-page-1',
        pageName: 'Custom Page 1',
        nodes: [],
        edges: []
      },
      {
        id: 'custom-page-2',
        pageName: 'Custom Page 2',
        nodes: [],
        edges: []
      }
    ];
    
    initState(mockState, pageId, undefined, customPages);
    
    expect(mockState.currentState.pages).toEqual(customPages);
    expect(mockState.currentState.currentPageId).toBe(pageId);
    expect(mockState.isInited).toBe(true);
  });

  test('should set document name when provided', () => {
    const pageId = 'test-page-id';
    const docName = 'Custom Document Name';
    
    initState(mockState, pageId, docName);
    
    expect(mockState.currentState.docName).toBe(docName);
    expect(mockState.isInited).toBe(true);
  });

  test('should not change document name when not provided', () => {
    const pageId = 'test-page-id';
    const originalDocName = mockState.currentState.docName;
    
    initState(mockState, pageId);
    
    expect(mockState.currentState.docName).toBe(originalDocName);
  });

  test('should handle empty pages array', () => {
    const pageId = 'test-page-id';
    const emptyPages: Page[] = [];
    
    initState(mockState, pageId, undefined, emptyPages);
    
    expect(mockState.currentState.pages).toEqual([]);
    expect(mockState.currentState.currentPageId).toBe(pageId);
    expect(mockState.isInited).toBe(true);
  });

  test('should handle complex pages with nodes and edges', () => {
    const pageId = 'test-page-id';
    const complexPages: Page[] = [
      {
        id: 'page-1',
        pageName: 'Complex Page',
        nodes: [
          {
            id: 'node-1',
            type: 'customNode',
            position: { x: 100, y: 200 },
            data: {
              id: 'node-1',
              text: 'Test node',
              color: 'white',
              nodeType: 'stringNode'
            }
          }
        ],
        edges: [
          {
            id: 'edge-1',
            source: 'node-1',
            target: 'node-2'
          }
        ]
      }
    ];
    
    initState(mockState, pageId, 'Complex Doc', complexPages);
    
    expect(mockState.currentState.pages).toEqual(complexPages);
    expect(mockState.currentState.docName).toBe('Complex Doc');
    expect(mockState.currentState.currentPageId).toBe(pageId);
    expect(mockState.isInited).toBe(true);
  });

  test('should preserve other state properties', () => {
    const pageId = 'test-page-id';
    const originalSelectedNodes = ['node-1', 'node-2'];
    const originalIsUpdated = true;
    
    mockState.currentState.selectedNodes = originalSelectedNodes;
    mockState.currentState.isUpdated = originalIsUpdated;
    
    initState(mockState, pageId);
    
    expect(mockState.currentState.selectedNodes).toEqual(originalSelectedNodes);
    expect(mockState.currentState.isUpdated).toBe(originalIsUpdated);
  });
});
