import React from 'react';
import styles from './styles.module.scss';

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}
const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.buttonContainer}>
      {children}
    </button>
  );
};

export default Button;
