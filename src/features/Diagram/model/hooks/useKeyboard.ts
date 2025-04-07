import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useKey } from './../../../../shared/hooks/useKey';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useReactFlow } from 'reactflow';
import { saveStateToClipboard } from '../libs/saveStateToClipboard';
import { getStateFromClipboard } from '../libs/getStateFromClipboard';

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
          saveStateToClipboard(currentPage)
        }
      }

      if (event.key === 'v') {
        event.preventDefault();
        try {
          const data = await getStateFromClipboard(screenToFlowPosition);

          if (!data) return;

          const { nodes, edges } = data;
          dispatch(docActions.onPasteChanges({
            nodes,
            edges,
          }));
        } catch (error) {
          console.error('Ошибка при вставке данных из буфера:', error);
        }
      }
    }
  });
}