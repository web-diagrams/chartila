import { useDocsQuery } from "@/app/api/docsApi";
import { DocLink } from "./DocLink";
import styles from './Doc.module.scss';

export const DocsPage = () => {
  const { data } = useDocsQuery(undefined)

  return (
    <div>
      <h1>Docs Page</h1>
      <ul>
        {data && data.map((doc) => (
          <DocLink key={doc.id} doc={doc} />
        ))}
        <li className={styles.docLink}>Создать новый</li>
      </ul>
    </div>
  );
}