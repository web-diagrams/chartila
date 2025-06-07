import { getStateFromClipboard } from './getStateFromClipboard';
import { v1 } from 'uuid';

// Mock uuid
jest.mock('uuid', () => ({
  v1: jest.fn()
}));

// Mock navigator.clipboard
const mockReadText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    readText: mockReadText
  }
});

describe('getStateFromClipboard utility function', () => {
  const mockScreenToFlowPosition = jest.fn((pos) => ({ x: pos.x - 50, y: pos.y - 50 }));
  const mockV1 = v1 as jest.MockedFunction<typeof v1>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockV1.mockReturnValue('new-uuid');
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
  });

  test('should parse valid clipboard data with nodes and edges', async () => {
    const clipboardData = {
      nodes: [
        {
          id: 'old-node-1',
          position: { x: 100, y: 200 },
          data: { text: 'Node 1', nodeType: 'stringNode' }
        },
        {
          id: 'old-node-2',
          position: { x: 300, y: 400 },
          data: { text: 'Node 2', nodeType: 'codeNode' }
        }
      ],
      edges: [
        {
          id: 'old-edge-1',
          source: 'old-node-1',
          target: 'old-node-2'
        }
      ]
    };

    mockReadText.mockResolvedValue(JSON.stringify(clipboardData));
    mockV1.mockReturnValueOnce('new-node-1')
          .mockReturnValueOnce('new-node-2')
          .mockReturnValueOnce('new-edge-1');

    const result = await getStateFromClipboard(mockScreenToFlowPosition);

    expect(result).toBeDefined();
    expect(result?.nodes).toHaveLength(2);
    expect(result?.edges).toHaveLength(1);
    
    // Check that IDs were updated
    expect(result?.nodes[0].id).toBe('new-node-1');
    expect(result?.nodes[1].id).toBe('new-node-2');
    expect(result?.edges[0].id).toBe('new-edge-1');
    
    // Check that edge references were updated
    expect(result?.edges[0].source).toBe('new-node-1');
    expect(result?.edges[0].target).toBe('new-node-2');
  });

  test('should adjust positions relative to center of screen', async () => {
    const clipboardData = {
      nodes: [
        {
          id: 'node-1',
          position: { x: 100, y: 200 },
          data: { text: 'Node 1' }
        },
        {
          id: 'node-2',
          position: { x: 300, y: 400 },
          data: { text: 'Node 2' }
        }
      ],
      edges: []
    };

    mockReadText.mockResolvedValue(JSON.stringify(clipboardData));
    mockV1.mockReturnValue('new-uuid');

    const result = await getStateFromClipboard(mockScreenToFlowPosition);

    // Center position should be (500, 400) -> screenToFlowPosition -> (450, 350)
    // Min position from nodes is (100, 200)
    // So offset should be (450-100, 350-200) = (350, 150)
    expect(result?.nodes[0].position).toEqual({ x: 450, y: 350 });
    expect(result?.nodes[1].position).toEqual({ x: 650, y: 550 });
  });

  test('should mark all nodes and edges as selected', async () => {
    const clipboardData = {
      nodes: [
        {
          id: 'node-1',
          position: { x: 100, y: 200 },
          data: { text: 'Node 1' }
        }
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2'
        }
      ]
    };

    mockReadText.mockResolvedValue(JSON.stringify(clipboardData));
    mockV1.mockReturnValue('new-uuid');

    const result = await getStateFromClipboard(mockScreenToFlowPosition);

    expect(result?.nodes[0].data.selected).toBe(true);
    expect(result?.edges[0].selected).toBe(true);
  });

  test('should handle empty nodes array', async () => {
    const clipboardData = {
      nodes: [],
      edges: []
    };

    mockReadText.mockResolvedValue(JSON.stringify(clipboardData));

    const result = await getStateFromClipboard(mockScreenToFlowPosition);

    expect(result?.nodes).toHaveLength(0);
    expect(result?.edges).toHaveLength(0);
  });

  test('should handle invalid JSON in clipboard', async () => {
    mockReadText.mockResolvedValue('invalid json');

    await expect(getStateFromClipboard(mockScreenToFlowPosition)).rejects.toThrow();
  });

  test('should return undefined for clipboard data without nodes and edges', async () => {
    const clipboardData = {
      someOtherData: 'value'
    };

    mockReadText.mockResolvedValue(JSON.stringify(clipboardData));

    const result = await getStateFromClipboard(mockScreenToFlowPosition);

    expect(result).toBeUndefined();
  });

  test('should handle clipboard read failure', async () => {
    mockReadText.mockRejectedValue(new Error('Clipboard access denied'));

    await expect(getStateFromClipboard(mockScreenToFlowPosition)).rejects.toThrow('Clipboard access denied');
  });

  test('should preserve node data properties', async () => {
    const clipboardData = {
      nodes: [
        {
          id: 'node-1',
          position: { x: 100, y: 200 },
          data: { 
            text: 'Test Node',
            color: 'blue',
            nodeType: 'codeNode',
            language: 'Python'
          }
        }
      ],
      edges: []
    };

    mockReadText.mockResolvedValue(JSON.stringify(clipboardData));
    mockV1.mockReturnValue('new-node-id');

    const result = await getStateFromClipboard(mockScreenToFlowPosition);

    expect(result?.nodes[0].data.text).toBe('Test Node');
    expect(result?.nodes[0].data.color).toBe('blue');
    expect(result?.nodes[0].data.nodeType).toBe('codeNode');
    expect(result?.nodes[0].data.language).toBe('Python');
    expect(result?.nodes[0].data.id).toBe('new-node-id');
  });
});
