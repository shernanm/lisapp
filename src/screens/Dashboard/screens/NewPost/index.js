/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { firebaseStore } from '../../../../config';
import { GET_POSTS } from '../Home';
import filterActions from '../../../../redux/Filter/actions';

import NewPostForm from './components/NewPostForm';
import styles from './styles.module.scss';

const ADD_TODO = gql`
  mutation lostItem($lostItem: LostItemInput!) {
    createLostItem(lostItem: $lostItem) {
      description
      state
      userInfoStateLost
      id
    }
  }
`;

function NewPost({ history }) {
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const { email } = useSelector((state) => state.auth);
  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();

  const [addTodo, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_TODO, {
    onCompleted: () => history.push('/home'),
    refetchQueries: (postResult) => {
      const { state } = postResult.data.createLostItem;
      dispatch(filterActions.setCurrentFilter(state));
      return [{ query: GET_POSTS, variables: { state } }];
    },
    awaitRefetchQueries: true
  });

  const handleChange = (e) => {
    const fileR = e[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(fileR);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(fileR);
  };

  const handleSubmit = async (post) => {
    const storageRef = firebaseStore().ref();
    if (post.state) {
      try {
        setLoading(true);
        const uploadImage = await storageRef.child(`images/${file.name}`).put(file);
        const imgUrl = await uploadImage.ref.getDownloadURL();
        addTodo({
          variables: {
            lostItem: {
              description: post.description,
              state: post.state,
              userInfoStateLost: post.state === 'finded' ? email : null,
              userInfoStateDelivered: post.state === 'delivered' ? email : null,
              images: [imgUrl]
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className={styles.containerPreview}>
        {imagePreview && <img src={imagePreview} className={styles.imagePreview} alt="preview image" />}
      </div>
      <NewPostForm onSubmit={handleSubmit} isLoading={loading || mutationLoading} />
      <div className={styles.uploadContainer}>
        <label htmlFor="file" className={styles.uploadLabel}>
          Subir Imagen{' '}
        </label>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          className={styles.uploadFile}
          onChange={(e) => handleChange(e.target.files)}
        />
      </div>
      {mutationError && <h1>mutationError</h1>}
    </>
  );
}

export default NewPost;
