import { useGetDocState } from './../../../../redux/doc/hooks/useGetDocState';
import { useKey } from './../../../../shared/hooks/useKey';

interface KeyboardProps {
  onSave: () => void;
}

export const useKeyboard = ({
  onSave,
}: KeyboardProps) => {
  const { selectedNodes } = useGetDocState();

  useKey((event) => {
    if (event.ctrlKey) {

      if (event.key === 's') {
        event.preventDefault();
        onSave();
      }

      if (event.key === 'c') {
        event.preventDefault();
        // getSelectedNodes();
      }
    }
  });
}