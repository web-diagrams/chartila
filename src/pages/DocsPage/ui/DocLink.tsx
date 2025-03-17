import { getDocPagePath } from "@/shared/config/routePaths";
import { DocInfoDto } from "@/shared/types/doc"
import { useNavigate } from "react-router-dom";
import styles from './Doc.module.scss';

interface DocProps {
  doc: DocInfoDto;
}

export const DocLink = ({
  doc
}: DocProps) => {
  const navigate = useNavigate();
  const onLinkClick = () => {
    navigate(getDocPagePath(doc.id));
  }

  return (
    <li className={styles.docLink} onClick={onLinkClick}>{doc.name}</li>
  )
}