import styles from './Modal.module.scss';
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface Props {
  title: string;
}

export const Modal = ({
  title,
  children,
}: PropsWithChildren<Props>) => {
  return createPortal(
    (
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {children}
        </div>
      </div>
    ),
    document.body,
  )
}