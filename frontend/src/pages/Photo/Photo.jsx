import './Photo.css';

import { uploads } from '../../utils/config';

import Message from '../../components/Message/Message';
import { Link, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { dislike, getPhoto, like } from '../../slices/photoSlice';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import LikeContainer from '../../components/LikeContainer/LikeContainer';

const Photo = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo,
  );

  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(like(photo._id));
  };

  const handleDislike = () => {
    dispatch(dislike(photo._id));
  };

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  if (loading) {
    <p>Carregando ...</p>;
  }

  return (
    <div className='photo-container'>
      <PhotoItem photo={photo} />
      <LikeContainer
        photo={photo}
        user={user}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />
    </div>
  );
};

export default Photo;
