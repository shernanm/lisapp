import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import Card from '../../../../components/Card';
import Portal from '../../../../components/Portal';
import DialogModal from '../../../../components/DialogModal';

import styles from './styles.module.scss';
import { GET_POST, NEXT_STATE, UPDATE_STATE } from './constants';

function DetailPost({
  location,
  history,
  match: {
    params: { id }
  }
}) {
  const [expand, setExpand] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef();
  const boxRef = useRef();
  const modalRef = useRef();

  const user = useSelector((state) => state.auth.email);

  const { data, loading } = useQuery(GET_POST, {
    variables: { id },
    fetchPolicy: 'cache-first'
  });

  const dataItem = useMemo(() => (data ? data.lostItems[0] : {}), [data]);

  const [updateItem, { loading: mutationLoading, error }] = useMutation(UPDATE_STATE, {
    refetchQueries: () => [{ query: GET_POST, variables: { id } }],
    awaitRefetchQueries: true,
    onCompleted: () => setShowModal(false)
  });

  const handleSubmit = () => {
    const nextStepUpdate = NEXT_STATE[dataItem.state].nextState;
    const variables = {
      id,
      state: nextStepUpdate,
      ...(nextStepUpdate === 'delivered' && { userInfoStateDelivered: user })
    };

    updateItem({
      variables
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    Object.entries(location.state.initStyles).forEach((style) => {
      containerRef.current.style.setProperty(style[0], style[1]);
    });
  }, [location.state.initStyles]);

  useEffect(() => {
    let time;
    if (boxRef.current) {
      time = setTimeout(() => {
        boxRef.current.classList.add(styles.caseStudy);
        setExpand(true);
      }, 100);
    }
    return () => {
      clearTimeout(time);
    };
  }, [data]);

  useEffect(() => {
    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {location.state.initStyles && data && (
        <div className={cn(styles.animated, styles.box)} ref={boxRef}>
          <Card
            id={dataItem.id}
            image={dataItem.images[0]}
            description={dataItem.description}
            state={dataItem.state}
            userInfoStateLost={dataItem.userInfoStateLost}
            userInfoStateDelivered={dataItem.userInfoStateDelivered}
            expand={expand}
            nextStep={NEXT_STATE[dataItem.state] ? NEXT_STATE[dataItem.state].text : ''}
            onChangeState={handleShowModal}
          />
        </div>
      )}
      {showModal && (
        <Portal>
          <DialogModal
            wrappRef={modalRef}
            handleAcceptButton={handleSubmit}
            closeModal={setShowModal}
            title="¿ Deseas cambiar el estado a este objeto ?"
          />
        </Portal>
      )}
    </div>
  );
}

export default DetailPost;
