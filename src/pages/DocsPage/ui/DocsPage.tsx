import { useDocsQuery } from "@/app/api/docsApi";
import { DocLink } from "./DocLink";
import styles from './Doc.module.scss';
import { useStartNewDoc } from "@/hooks/useStartNewDoc";
import { useCallback } from "react";
import { useDeleteDocMutation } from "@/app/api/docsApi";

export const DocsPage = () => {
  const { data } = useDocsQuery(undefined);
  const { onStartNewProject } = useStartNewDoc();
  const [deleteDoc, { isLoading }] = useDeleteDocMutation();

  const onDeleteDoc = useCallback((id: string) => {
    deleteDoc({ id });
  }, [deleteDoc]);

  return (
    <div className={styles.docPage}>
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
