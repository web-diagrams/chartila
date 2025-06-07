import { saveStateToClipboard } from './saveStateToClipboard';
import { Page } from '@/redux/doc/interfaces/docStateInterfaces';

// Mock navigator.clipboard
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText
  }
});

// Mock console.error
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

describe('saveStateToClipboard utility function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  test('should save selected nodes and edges to clipboard', async () => {
    const mockPage: Page = {
      id: 'page-1',
      pageName: 'Test Page',
      nodes: [
        {
          id: 'node-1',
          type: 'customNode',
          position: { x: 100, y: 200 },
          selected: true,
          data: { text: 'Selected Node 1', nodeType: 'stringNode', id: 'node-1', color: 'white' }
        },
        {
          id: 'node-2',
          type: 'customNode',
          position: { x: 300, y: 400 },
          selected: false,
          data: { text: 'Unselected Node', nodeType: 'stringNode', id: 'node-2', color: 'white' }
        },
        {
          id: 'node-3',
          type: 'customNode',
          position: { x: 500, y: 600 },
          selected: true,
          data: { text: 'Selected Node 2', nodeType: 'codeNode', id: 'node-3', color: 'blue' }
        }
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-3',
          selected: true
        },
        {
          id: 'edge-2',
          source: 'node-2',
          target: 'node-3',
          selected: false
        }
      ]
    };

    mockWriteText.mockResolvedValue(undefined);

    await saveStateToClipboard(mockPage);

    expect(mockWriteText).toHaveBeenCalledTimes(1);
    
    const clipboardData = JSON.parse(mockWriteText.mock.calls[0][0]);
    
    expect(clipboardData.nodes).toHaveLength(2);
    expect(clipboardData.edges).toHaveLength(1);
    
    // Check that only selected nodes are included
    expect(clipboardData.nodes[0].id).toBe('node-1');
    expect(clipboardData.nodes[1].id).toBe('node-3');
    
    // Check that only selected edges are included
    expect(clipboardData.edges[0].id).toBe('edge-1');
  });

  test('should handle page with no selected nodes or edges', async () => {
    const mockPage: Page = {
      id: 'page-1',
      pageName: 'Test Page',
      nodes: [
        {
          id: 'node-1',
          type: 'customNode',
          position: { x: 100, y: 200 },
          selected: false,
          data: { text: 'Unselected Node', nodeType: 'stringNode', id: 'node-1', color: 'white' }
        }
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
          selected: false
        }
      ]
    };

    mockWriteText.mockResolvedValue(undefined);

    await saveStateToClipboard(mockPage);

    const clipboardData = JSON.parse(mockWriteText.mock.calls[0][0]);
    
    expect(clipboardData.nodes).toHaveLength(0);
    expect(clipboardData.edges).toHaveLength(0);
  });

  test('should handle empty page', async () => {
    const mockPage: Page = {
      id: 'page-1',
      pageName: 'Empty Page',
      nodes: [],
      edges: []
    };

    mockWriteText.mockResolvedValue(undefined);

    await saveStateToClipboard(mockPage);

    const clipboardData = JSON.parse(mockWriteText.mock.calls[0][0]);
    
    expect(clipboardData.nodes).toHaveLength(0);
    expect(clipboardData.edges).toHaveLength(0);
  });

  test('should format JSON with proper indentation', async () => {
    const mockPage: Page = {
      id: 'page-1',
      pageName: 'Test Page',
      nodes: [
        {
          id: 'node-1',
          type: 'customNode',
          position: { x: 100, y: 200 },
          selected: true,
          data: { text: 'Test Node', nodeType: 'stringNode', id: 'node-1', color: 'white' }
        }
      ],
      edges: []
    };

    mockWriteText.mockResolvedValue(undefined);

    await saveStateToClipboard(mockPage);

    const clipboardText = mockWriteText.mock.calls[0][0];
    
    // Check that JSON is formatted with 2-space indentation
    expect(clipboardText).toContain('  "nodes":');
    expect(clipboardText).toContain('  "edges":');
  });

  test('should handle clipboard write failure', async () => {
    const mockPage: Page = {
      id: 'page-1',
      pageName: 'Test Page',
      nodes: [
        {
          id: 'node-1',
          type: 'customNode',
          position: { x: 100, y: 200 },
          selected: true,
          data: { text: 'Test Node', nodeType: 'stringNode', id: 'node-1', color: 'white' }
        }
      ],
      edges: []
    };

    const clipboardError = new Error('Clipboard write failed');
    mockWriteText.mockRejectedValue(clipboardError);

    await saveStateToClipboard(mockPage);

    expect(mockConsoleError).toHaveBeenCalledWith('Ошибка при копировании:', clipboardError);
  });

  test('should preserve all node properties in clipboard data', async () => {
    const mockPage: Page = {
      id: 'page-1',
      pageName: 'Test Page',
      nodes: [
        {
          id: 'node-1',
          type: 'customNode',
          position: { x: 100, y: 200 },
          selected: true,
          data: { 
            text: 'Complex Node',
            nodeType: 'codeNode',
            id: 'node-1',
            color: 'red',
            language: 'Python'
          },
          width: 150,
          height: 100
        }
      ],
      edges: []
    };

    mockWriteText.mockResolvedValue(undefined);

    await saveStateToClipboard(mockPage);

    const clipboardData = JSON.parse(mockWriteText.mock.calls[0][0]);
    const savedNode = clipboardData.nodes[0];
    
    expect(savedNode.id).toBe('node-1');
    expect(savedNode.type).toBe('customNode');
    expect(savedNode.position).toEqual({ x: 100, y: 200 });
    expect(savedNode.data.text).toBe('Complex Node');
    expect(savedNode.data.nodeType).toBe('codeNode');
    expect(savedNode.data.color).toBe('red');
    expect(savedNode.data.language).toBe('Python');
    expect(savedNode.width).toBe(150);
    expect(savedNode.height).toBe(100);
  });
});
