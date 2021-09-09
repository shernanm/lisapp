import React, { useCallback } from 'react';

import Button from '../Button';

import styles from './styles.module.scss';

function DialogModal({ wrappRef, closeModal, handleAcceptButton, isLogOut, title }) {
  const handleCancelButton = useCallback(() => closeModal(false), [closeModal]);
  return (
    <div className={styles.container} ref={wrappRef}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.buttonsContainer}>
        <Button className={styles.exit} onClick={handleAcceptButton}>
          {isLogOut ? 'salir' : 'Aceptar'}
        </Button>
        <Button className={styles.cancel} onClick={handleCancelButton}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default DialogModal;
