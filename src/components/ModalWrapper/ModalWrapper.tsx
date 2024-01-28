import React from 'react';
import styles from './styles.module.scss';
import { IoTextOutline } from 'react-icons/io5';
import { FaCode } from 'react-icons/fa6';

const ModalWrapper = () => {
  return (
    <div className={`${styles.modal_wrapper_container} nodrag`}>
      <div className={styles.icon_container}>
        <IoTextOutline />
      </div>
      <div className={styles.icon_container}>
        <FaCode />
      </div>
    </div>
  );
};

export default ModalWrapper;
