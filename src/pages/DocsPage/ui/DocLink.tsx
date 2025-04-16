import { getDocPagePath } from "@/shared/config/routePaths";
import { DocInfoDto } from "@/shared/types/doc"
import { useNavigate } from "react-router-dom";
import styles from './Doc.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";

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
    <li className={styles.linkContainer}>
      <p className={styles.docLink} onClick={onLinkClick}>{doc.name}</p>
      <button
        onClick={onDeleteDocCb}
        title="undo"
        className={styles.control}
        disabled={isLoading}
      >
        <FaRegTrashAlt size={12} />
      </button>
    </li>
  )
}