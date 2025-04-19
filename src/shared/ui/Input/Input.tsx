import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({
  ...props
}: InputProps) => {
  return (
    <input className={styles.input} {...props} />
  )
}