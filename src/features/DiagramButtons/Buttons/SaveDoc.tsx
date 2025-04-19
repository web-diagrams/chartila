import { FaRegSave } from "react-icons/fa"
import styles from '../DiagramButtons.module.scss';
import { useAppSelector } from "@/app/hooks";

interface SaveDocProps {
  onSave: () => void;
}

/**
 * Кнопка для сохранения документа
 * @param onSave - функция сохранения документа (локально или на сервере)
 */
export const SaveDoc = ({
  onSave
}: SaveDocProps) => {
  const { currentState } = useAppSelector((state) => state.doc);

  return (
    <button
      onClick={onSave}
      title="save"
      className={styles.control}
      disabled={!currentState.isUpdated}
    >
      <FaRegSave size={15} />
    </button>
  )
}