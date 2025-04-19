import { getDocPagePath } from "@/shared/config/routePaths";
import { DocInfoDto } from "@/shared/types/doc"
import { useNavigate } from "react-router-dom";
import styles from './Doc.module.scss';
import { FaRegTrashAlt, FaRegFolderOpen } from "react-icons/fa";
interface DocProps {
  doc: DocInfoDto;
  onDeleteDoc: (id: string) => void;
  isLoading: boolean;
}

export const DocLink = ({
  doc, onDeleteDoc, isLoading,
}: DocProps) => {
  const navigate = useNavigate();
  const onLinkClick = () => {
    navigate(getDocPagePath(doc.id));
  }

  const onDeleteDocCb = () => {
    onDeleteDoc(doc.id)
  }

  return (
    <li className={styles.docCard}>
      <div className={styles.label}>{doc.name}</div>
      <div className={styles.buttons}>
        <button
          className={styles.openBtn}
          onClick={onLinkClick}
          title="Открыть диаграмму"
        >
          <FaRegFolderOpen size={15} />
        </button>
        <button
          className={styles.deleteBtn}
          onClick={onDeleteDocCb}
          disabled={isLoading}
          title="Удалить диаграмму"
        >
          <FaRegTrashAlt size={15} />
        </button>
      </div>
    </li>
  );
}