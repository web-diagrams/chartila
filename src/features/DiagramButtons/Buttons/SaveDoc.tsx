import { FaRegSave } from "react-icons/fa"
import styles from '../DiagramButtons.module.scss';

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
  return (
    <button
      onClick={onSave}
      title="save"
      className={styles.control}
    >
      <FaRegSave size={15} />
    </button>
  )
}