import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import CardList from '../../../../components/CardList';
import Input from '../../../../components/Input';
import { ReactComponent as Lupa } from '../../../../assets/search.svg';

import { debounce } from './utils';
import styles from './styles.module.scss';

const GET_POSTS = gql`
  query descripcion($description: String) {
    lostItems(description: $description) {
      description
      state
      userInfoStateLost
      userInfoStateDelivered
      images
      id
    }
  }
`;

function Search({ history }) {
  const [description, setDescription] = useState('');

  const { data, loading, fetchMore } = useQuery(GET_POSTS, { variables: { description } });

  const resultSearch = useMemo(() => (description.length > 0 ? data : []), [description, data]);

  const handleSearchDescription = (value) => {
    setDescription(value[0]);
  };

  const handleChangeDebounced = debounce(handleSearchDescription);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    handleChangeDebounced(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <Lupa className={styles.icon} />
        <Input
          theme={styles.inputSearch}
          type="text"
          input={{ onChange: handleSearchChange }}
          placeholder="Bucar objetos..."
        />
      </div>
      {description && resultSearch && resultSearch.lostItems && resultSearch.lostItems.length === 0 && (
        <h1 className={styles.notFound}>
          No se puede encontrar resultados asociados con{' '}
          <strong className={styles.strong}>{description}</strong>
        </h1>
      )}
      <div className={styles.itemsContainer}>
        {resultSearch && resultSearch.lostItems && !loading && (
          <CardList
            hasMore={false}
            data={resultSearch}
            loading={loading}
            fetchMore={fetchMore}
            history={history}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
