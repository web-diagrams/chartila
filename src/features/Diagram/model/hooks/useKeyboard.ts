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

      switch (event.key) {
        case 's': {
          event.preventDefault();
          onSave();
          break;
        }

        case 'c': {
          event.preventDefault();
          if (currentPage) {
            saveStateToClipboard(currentPage)
          }
          break;
        }

        case 'v': {
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
          break;
        }

        case 'z': {
          event.preventDefault();
          dispatch(docActions.undo());
          break;
        }
      }
    }
  });
}