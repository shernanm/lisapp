import React, { useRef, useCallback } from 'react';

import Card from '../Card';

function CardList({ data, loading, fetchMore, hasMore, history }) {
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore({
            variables: {
              offset: data ? data.lostItems.length : 0
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }
              return { lostItems: [...prev.lostItems, ...fetchMoreResult.lostItems] };
            }
          });
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, fetchMore, data, hasMore]
  );

  const handleCardClick = (id, cardRef) => {
    const bounds = cardRef.current.getBoundingClientRect();
    const width = cardRef.current.offsetWidth;

    const detailInitialPosition = {
      top: bounds.top,
      bottom: window.innerHeight - bounds.bottom,
      left: bounds.left,
      width
    };

    const initStyles = {
      '--case-detail-initial-top': `${detailInitialPosition.top}px`,
      '--case-detail-initial-bottom': `${detailInitialPosition.bottom}px`,
      '--case-detail-initial-left': `${detailInitialPosition.left}px`,
      '--case-detail-initial-width': `${detailInitialPosition.width}px`
    };

    history.push(`/detail/${id}`, { initStyles });
  };

  return (
    <>
      {data.lostItems.map((item, index) => {
        if (data.lostItems.length === index + 1) {
          return (
            <div key={item.id}>
              <Card
                id={item.id}
                image={item.images[0]}
                description={item.description}
                state={item.state}
                userInfoStateLost={item.userInfoStateLost}
                userInfoStateDelivered={item.userInfoStateDelivered}
                onClick={handleCardClick}
              />
            </div>
          );
        }
        return (
          <Card
            key={item.id}
            id={item.id}
            image={item.images[0]}
            description={item.description}
            state={item.state}
            userInfoStateLost={item.userInfoStateLost}
            userInfoStateDelivered={item.userInfoStateDelivered}
            onClick={handleCardClick}
          />
        );
      })}
    </>
  );
}

export default CardList;
