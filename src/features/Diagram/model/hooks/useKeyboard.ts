import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useReactFlow } from 'reactflow';
import { saveStateToClipboard } from '../libs/saveStateToClipboard';
import { getStateFromClipboard } from '../libs/getStateFromClipboard';
import { useHotkeys } from 'react-hotkeys-hook';

interface KeyboardProps {
  onSave: () => void;
}

/**
 * Хук, отвечающий за работу с клавиатурой
 * @param onSave функция, которая вызывается при нажатии ctrl+s
 */
export const useKeyboard = ({
  onSave,
}: KeyboardProps) => {
  const dispatch = useAppDispatch();
  const { screenToFlowPosition } = useReactFlow();
  const { pages, currentPageId } = useGetDocState();
  const currentPage = useCurrentPage(pages, currentPageId);

  useHotkeys('ctrl+s', onSave, { preventDefault: true });

  useHotkeys('ctrl+z', () => dispatch(docActions.undo()));
  useHotkeys('ctrl+shift+z', () => dispatch(docActions.redo()));

  useHotkeys('ctrl+c', () => {
    if (currentPage) {
      saveStateToClipboard(currentPage);
    }
  });

  useHotkeys('ctrl+v', async () => {
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
  });
}