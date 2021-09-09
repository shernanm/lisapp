import React, { useRef, useMemo } from 'react';
import { string } from 'prop-types';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import Switch from '../Switch';

import { validateState } from './utilis';
import styles from './styles.module.scss';
import StatePost from './components/StatePost';

function Card({
  image,
  description,
  userInfoStateLost,
  userInfoStateDelivered,
  id,
  state: stateCard,
  onClick,
  expand,
  nextStep,
  onChangeState
}) {
  const cardRef = useRef();
  const user = useSelector((state) => state.auth.email);
  const validatedState = useMemo(() => validateState(user, userInfoStateLost), [user, userInfoStateLost]);

  return (
    <article
      className={cn(styles.article, { [styles.expand]: expand })}
      ref={cardRef}
      onClick={onClick && (() => onClick(id, cardRef))}
    >
      <div className={styles.imgContainer}>
        <img src={image} alt="foto item" />
      </div>

      {expand && (
        <div className={cn(styles.stateContainer, { 'row end': !validatedState[stateCard] })}>
          <StatePost state={stateCard} expand />
          {validatedState[stateCard] && <Switch onClick={onChangeState} message={nextStep} />}
        </div>
      )}

      <div className={styles.content}>
        {expand && <h1>Descripcion:</h1>}
        <p>{description}</p>
      </div>

      <footer className={styles.footerItem}>
        <div className={styles.infoContainer}>
          {expand && <h2 className={styles.titleExpand}>Reportado:</h2>}
          {userInfoStateLost && <h6>{userInfoStateLost.replace(/@[^@]+$/, '')}</h6>}
        </div>
        {expand && userInfoStateDelivered && (
          <div className={styles.infoContainer}>
            <h2 className={styles.titleExpand}>Reclamado:</h2>
            <h6>{userInfoStateDelivered.replace(/@[^@]+$/, '')}</h6>
          </div>
        )}
        {expand || <StatePost state={stateCard} />}
      </footer>
    </article>
  );
}

Card.propTypes = {
  description: string,
  image: string,
  state: string,
  userInfoStateDelivered: string,
  userInfoStateLost: string
};

export default Card;
