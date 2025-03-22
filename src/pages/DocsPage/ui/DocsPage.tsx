import { useDocsQuery } from "@/app/api/docsApi";
import { DocLink } from "./DocLink";
import styles from './Doc.module.scss';
import { useStartNewDoc } from "@/hooks/useStartNewDoc";

export const DocsPage = () => {
  const { data } = useDocsQuery(undefined)
  const { onStartNewProject } = useStartNewDoc();

  return (
    <div>
      <h1>Docs Page</h1>
      <ul>
        {data && data.map((doc) => (
          <DocLink key={doc.id} doc={doc} />
        ))}
        <li className={styles.docLink} onClick={onStartNewProject} >Создать новый</li>
      </ul>
    </div>
  );
}