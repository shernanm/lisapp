import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';

import Portal from '../../../../components/Portal';
import Filter from '../../../../components/Filter';
import CardList from '../../../../components/CardList';

import styles from './styles.module.scss';

export const GET_POSTS = gql`
  query getPosts($state: String, $offset: Int, $limit: Int, $id: ID) {
    lostItems(state: $state, limit: $limit, offset: $offset, id: $id) {
      description
      state
      userInfoStateLost
      userInfoStateDelivered
      images
      id
    }
  }
`;

function Home({ history }) {
  const [hasMore, setHasmore] = useState(true);
  const filterIsOpen = useSelector((state) => state.filter.isOpen);
  const currentFilter = useSelector((state) => state.filter.current);

  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      state: currentFilter,
      offset: 0,
      limit: 5
    },
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (data && data.lostItems.length === 0) {
      setHasmore(false);
    }
  }, [data]);

  return (
    <div className={styles.itemsContainer}>
      {loading && <h3>loading...</h3>}
      {error && <h3>error</h3>}
      {data && !loading && (
        <CardList hasMore={hasMore} data={data} loading={loading} fetchMore={fetchMore} history={history} />
      )}
      {filterIsOpen && (
        <Portal>
          <Filter />
        </Portal>
      )}
    </div>
  );
}

export default Home;
