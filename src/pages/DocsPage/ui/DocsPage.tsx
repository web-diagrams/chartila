import { useDocsQuery } from "@/app/api/docsApi";
import { DocLink } from "./DocLink";
import styles from './Doc.module.scss';
import { useStartNewDoc } from "@/hooks/useStartNewDoc";
import { useCallback } from "react";
import { useDeleteDocMutation } from "@/app/api/docsApi";

export const DocsPage = () => {
  const { data } = useDocsQuery(undefined)
  const { onStartNewProject } = useStartNewDoc();
  const [deleteDoc, { isLoading }] = useDeleteDocMutation();

  const onDeleteDoc = useCallback((id: string) => {
    deleteDoc({ id })
  }, [deleteDoc]);

  return (
    <div>
      <h1>Docs Page</h1>
      <ul>
        {data && data.map((doc) => (
          <DocLink key={doc.id} doc={doc} onDeleteDoc={onDeleteDoc} isLoading={isLoading} />
        ))}
        <li className={styles.docLink} onClick={onStartNewProject} >Создать новый</li>
      </ul>
    </div>
  );
}