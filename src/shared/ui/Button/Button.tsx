import React from 'react';
import styles from './styles.module.scss';
import { classNames } from '@/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  withoutBG?: boolean;
  withoutPadding?: boolean;
}
export const Button = ({ children, withoutBG, withoutPadding, disabled, ...other }: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.buttonContainer,
        {
          [styles.withoutBG]: !!withoutBG,
          [styles.withoutPadding]: !!withoutPadding,
          [styles.disabled]: !!disabled,
        }
      )}
      disabled={disabled}
      {...other}
    >
      {children}
    </button>
  );
};
