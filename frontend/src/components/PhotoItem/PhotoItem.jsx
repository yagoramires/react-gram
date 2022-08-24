import './PhotoItem.css';

import { uploads } from '../../utils/config';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetails } from '../../slices/userSlice';
import { useState } from 'react';

const PhotoItem = ({ photo }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    dispatch(getUserDetails(photo.userId));
  }, [dispatch, photo]);

  useEffect(() => {
    if (photo.userId === user._id) {
      setProfileImage(user.profileImage);
    }
    if (photo.userId === user._id) {
      setUserName(user.name);
    }
  }, [photo, user]);

  return (
    <div className='photo-item-image'>
      <div className='photo-user-info'>
        {profileImage && (
          <img
            src={`${uploads}/users/${profileImage}`}
            alt={photo.userName}
            className='post-profile-image'
          />
        )}
        <p className='photo-author'>
          <Link to={`/users/${photo.userId}`}> {userName}</Link>
        </p>
      </div>
      {photo.image && (
        <div
          style={{
            backgroundImage: `url('${uploads}/photos/${photo.image}')`,
          }}
          className='photo-item-image'
        ></div>
      )}
      <h2 className='photo-item-title'>{photo.title}</h2>
    </div>
  );
};

export default PhotoItem;
