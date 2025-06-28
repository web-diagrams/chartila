import { useCurrentPage } from '@/hooks/useCurrentPage';
import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';
import { useAppDispatch } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useReactFlow } from 'reactflow';
import { saveStateToClipboard } from '../libs/saveStateToClipboard';
import { getStateFromClipboard } from '../libs/getStateFromClipboard';
import { useHotkeys } from 'react-hotkeys-hook';

// Определяем, работаем ли мы на macOS
const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

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

  // Сохранение - поддержка Windows/Linux и macOS
  useHotkeys('ctrl+s', onSave, { preventDefault: true });
  useHotkeys('meta+s', onSave, { preventDefault: true, enabled: isMac });

  // Отмена - поддержка Windows/Linux и macOS
  useHotkeys('ctrl+z', () => dispatch(docActions.undo()), { preventDefault: true });
  useHotkeys('meta+z', () => dispatch(docActions.undo()), { preventDefault: true, enabled: isMac });

  // Повтор - поддержка Windows/Linux и macOS
  useHotkeys('ctrl+shift+z', () => dispatch(docActions.redo()), { preventDefault: true });
  useHotkeys('meta+shift+z', () => dispatch(docActions.redo()), { preventDefault: true, enabled: isMac });

  // Копирование - поддержка Windows/Linux и macOS
  useHotkeys('ctrl+c', () => {
    if (currentPage) {
      saveStateToClipboard(currentPage);
    }
  }, { preventDefault: true });
  useHotkeys('meta+c', () => {
    if (currentPage) {
      saveStateToClipboard(currentPage);
    }
  }, { preventDefault: true, enabled: isMac });

  // Вставка - поддержка Windows/Linux и macOS
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
  }, { preventDefault: true });
  useHotkeys('meta+v', async () => {
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
  }, { preventDefault: true, enabled: isMac });
}
