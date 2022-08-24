import './Profile.css';

import { uploads } from '../../utils/config';

import Message from '../../components/Message/Message';
import { Link, useParams } from 'react-router-dom';
import { BsEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUserDetails } from '../../slices/userSlice';
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from '../../slices/photoSlice';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const [editId, setEditId] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // carregando dados do usuário
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const hideShowForm = () => {
    newPhotoForm.current.classList.toggle('hide');
    editPhotoForm.current.classList.toggle('hide');
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      id: editId,
      title: editTitle,
    };

    dispatch(updatePhoto(photoData));
  };
  const handleCancelEdit = (e) => {
    hideShowForm();
  };

  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains('hide')) {
      hideShowForm();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    // construindo form data
    const formData = new FormData();

    Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key]),
    );

    dispatch(publishPhoto(formData));

    setTitle('');
    setImage('');

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  if (loading) {
    return <p>Carregando ...</p>;
  }

  return (
    <div className='profile'>
      <div className='profile-header'>
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className='profile-description'>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className='new-photo' ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título para a foto:</span>
                <input
                  type='text'
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Insira um título '
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type='file' onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type='submit' value='Enviar' />}
              {loadingPhoto && (
                <input type='submit' value='Aguarde...' disabled />
              )}
            </form>
          </div>
          <div className='edit-photo hide' ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <div
                style={{
                  backgroundImage: `url('${uploads}/photos/${editImage}')`,
                }}
                className='photo-item-image edit'
              ></div>
            )}
            <form onSubmit={handleUpdate}>
              <input
                type='text'
                value={editTitle || ''}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder='Insira um título '
              />
              <input type='submit' value='Atualizar' />
              <button className='cancel-btn' onClick={handleCancelEdit}>
                Cancelar
              </button>
            </form>
          </div>
          {errorPhoto && <Message type='error' msg={errorPhoto} />}
          {messagePhoto && <Message type='success' msg={messagePhoto} />}
        </>
      )}
      <div className='user-photos'>
        {photos.length === 0 ? (
          <h2>O usuário ainda não possui fotos publicadas</h2>
        ) : (
          <h2>Fotos publicadas:</h2>
        )}
        <div className='photos-container'>
          {photos &&
            photos.map((photo) => (
              <div className='photo' key={photo._id}>
                {photo.image && (
                  <div
                    style={{
                      backgroundImage: `url('${uploads}/photos/${photo.image}')`,
                    }}
                    className='photos-container-image'
                  ></div>
                )}
                {id === userAuth._id ? (
                  <div className='actions'>
                    <Link to={`/photos/${photo._id}`}>
                      <BsEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className='btn' to={`/photos${photo._id}`} />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
