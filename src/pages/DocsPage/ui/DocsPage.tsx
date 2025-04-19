import { useDocsQuery } from "@/app/api/docsApi";
import { DocLink } from "./DocLink";
import styles from './Doc.module.scss';
import { useStartNewDoc } from "@/hooks/useStartNewDoc";
import { useCallback } from "react";
import { useDeleteDocMutation } from "@/app/api/docsApi";
import { useNavigate } from "react-router-dom";
import { getStartPath } from "@/shared/config/routePaths";

export const DocsPage = () => {
  const navigate = useNavigate();
  const { data } = useDocsQuery(undefined);
  const { onStartNewProject } = useStartNewDoc();
  const [deleteDoc, { isLoading }] = useDeleteDocMutation();

  const onBack = () => {
    navigate(getStartPath());
  }

  const onDeleteDoc = useCallback((id: string) => {
    deleteDoc({ id });
  }, [deleteDoc]);

  return (
    <div className={styles.docPage}>
      <p className={styles.backLink} onClick={onBack}>← Главная страница</p>
      <h1 className={styles.title}>Мои диаграммы</h1>
      <ul className={styles.docList}>
        {data?.map((doc) => (
          <DocLink
            key={doc.id}
            doc={doc}
            onDeleteDoc={onDeleteDoc}
            isLoading={isLoading}
          />
        ))}
        <li className={styles.createNew} onClick={onStartNewProject}>
          + Создать новую диаграмму
        </li>
      </ul>
    </div>
  );
};
