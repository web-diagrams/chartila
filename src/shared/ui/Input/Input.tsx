import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Reusable input component with custom styling
 * @param props - Standard HTML input props with optional label
 */
export const Input = ({
  ...props
}: InputProps) => {
  return (
    <input className={styles.input} {...props} />
  )
}
