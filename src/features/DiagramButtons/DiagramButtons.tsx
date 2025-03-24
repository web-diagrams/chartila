import { FaRedo, FaUndo, FaRegSave } from "react-icons/fa"
import styles from './DiagramButtons.module.scss';
import { useAppSelector } from "@/app/hooks";

interface DiagramButtonsProps {
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
}

export const DiagramButtons = ({
  onUndo, onRedo, onSave,
}: DiagramButtonsProps) => {
  const { step } = useAppSelector((state) => state.doc);
  return (
    <div className={styles.controlsContainer}>
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
        disabled={!(history?.length > step + 1)}
      >
        <FaRedo size={12} />
      </button>
      <button
        onClick={onSave}
        title="save"
        className={styles.control}
      >
        <FaRegSave size={15} />
      </button>
    </div>
  )
}