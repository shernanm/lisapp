import gql from 'graphql-tag';

export const NEXT_STATE = {
  lost: {
    text: 'Encontrado',
    nextState: 'finded'
  },
  finded: {
    text: 'Remitir',
    nextState: 'remitted'
  },
  remitted: {
    text: 'Reclamar',
    nextState: 'delivered'
  }
};

export const GET_POST = gql`
  query getPost($id: ID) {
    lostItems(id: $id) {
      description
      state
      userInfoStateLost
      userInfoStateDelivered
      images
      id
    }
  }
`;

export const UPDATE_STATE = gql`
  mutation updateItem($id: ID!, $state: String!, $userInfoStateDelivered: String) {
    updateLostItem(id: $id, state: $state, userInfoStateDelivered: $userInfoStateDelivered) {
      state
      userInfoStateLost
      userInfoStateDelivered
    }
  }
`;
