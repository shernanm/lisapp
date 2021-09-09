import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

const states = {
  finded: 'Encontrado',
  lost: 'Perdido',
  delivered: 'Entregado',
  remitted: 'Remitido'
};

function StatePost({ state, expand }) {
  return (
    <div className={styles.container}>
      <span
        className={cn({
          [styles.finded]: state === 'finded',
          [styles.lost]: state === 'lost',
          [styles.delivered]: state === 'delivered',
          [styles.remitted]: state === 'remitted',
          [styles.expand]: expand
        })}
      >
        {expand && states[state]}
      </span>
    </div>
  );
}

export default StatePost;
