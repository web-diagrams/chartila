import { FaRedo, FaUndo } from "react-icons/fa"
import styles from '../DiagramButtons.module.scss';

interface UndoRedoProps {
  onUndo: () => void;
  onRedo: () => void;
  step: number;
  historyLength: number;
}

/**
 * Кнопки для отмены и повтора действий
 * @param onUndo - функция для отмены последнего действия
 * @param onRedo - функция для повтора последнего действия
 * @param step - текущий шаг истории
 * @param historyLength - количество сохраненных шагов истории
 * @returns 
 */
export const UndoRedo = ({
  onUndo,
  onRedo,
  step,
  historyLength,
}: UndoRedoProps) => {

  return (
    <>
      <button
        onClick={onUndo}
        title="undo"
        className={styles.control}
        disabled={step === 0}
      >
        <FaUndo size={12} />
      </button>
      <button
        onClick={onRedo}
        title="redo"
        className={styles.control}
        disabled={!(historyLength > step + 1)}
      >
        <FaRedo size={12} />
      </button>
    </>
  )
}