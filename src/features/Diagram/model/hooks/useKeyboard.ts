import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useKey } from './../../../../shared/hooks/useKey';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useReactFlow } from 'reactflow';
import { v1 } from 'uuid';

interface KeyboardProps {
  onSave: () => void;
}

export const useKeyboard = ({
  onSave,
}: KeyboardProps) => {
  const dispatch = useAppDispatch();
  const { screenToFlowPosition } = useReactFlow();
  const { pages, currentPageId } = useGetDocState();
  const currentPage = useCurrentPage(pages, currentPageId);

  useKey(async (event) => {
    if (event.ctrlKey) {

      if (event.key === 's') {
        event.preventDefault();
        onSave();
      }

      if (event.key === 'c') {
        event.preventDefault();
        if (currentPage) {
          const selectedNodes = currentPage.nodes.filter((node) => node.selected);
          const selectedEdges = currentPage.edges.filter((edge) => edge.selected);

          const dataToCopy = {
            nodes: selectedNodes,
            edges: selectedEdges,
          };

          try {
            await navigator.clipboard.writeText(JSON.stringify(dataToCopy, null, 2));
          } catch (error) {
            console.error('Ошибка при копировании:', error);
          }
        }
      }

      if (event.key === 'v') {
        event.preventDefault();
        try {
          const clipboardText = await navigator.clipboard.readText();
          const parsedData = JSON.parse(clipboardText);

          if (parsedData.nodes && parsedData.edges) {
            const centerPosition = screenToFlowPosition({
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
            });

            const minX = Math.min(...parsedData.nodes.map((node: any) => node.position.x));
            const minY = Math.min(...parsedData.nodes.map((node: any) => node.position.y));

            const idMap = new Map<string, string>();

            const adjustedNodes = parsedData.nodes.map((node: any) => {
              const newId = v1();
              idMap.set(node.id, newId);
              return {
                ...node,
                id: newId,
                position: {
                  x: node.position.x - minX + centerPosition.x,
                  y: node.position.y - minY + centerPosition.y,
                },
                data: {
                  ...node.data,
                  selected: true,
                  id: newId,
                }
              };
            });

            const adjustedEdges = parsedData.edges.map((edge: any) => ({
              ...edge,
              id: v1(),
              source: idMap.get(edge.source) || edge.source,
              target: idMap.get(edge.target) || edge.target,
            }));

            dispatch(docActions.onPasteChanges({
              nodes: adjustedNodes,
              edges: adjustedEdges,
            }));
          }
        } catch (error) {
          console.error('Ошибка при вставке данных из буфера:', error);
        }
      }
    }
  });
}