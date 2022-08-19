import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { uploads } from '../../utils/config';

import { profile, resetMessage } from '../../slices/userSlice';

import Message from '../../components/Message/Message';

import './EditProfile.css';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  console.log(user);

  const handleFile = (e) => {
    //Image preview

    const image = e.target.files[0];

    setPreviewImage(image);
    setProfileImage(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='edit-profile'>
      <h2>Edite seus dados</h2>
      <p className='subtitle'>
        Adicione uma imagem de perfil e conte mais sobre você ...
      </p>
      {(user.profileImage || previewImage) && (
        <img
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
          className='profile-image'
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Nome'
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
        <input type='email' placeholder='E-mail' value={email || ''} disabled />

        <label>
          <span>Imagem do Perfil</span>
          <input type='file' onChange={handleFile} />
        </label>
        <label>
          <span>Bio</span>
          <input
            type='text'
            placeholder='Descrição do perfil'
            value={bio || ''}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label>
          <span>Deseja alterar sua senha?</span>
          <input
            type='password'
            placeholder='Digite sua nova senha'
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type='submit' value='Atualizar' />
      </form>
    </div>
  );
};

export default EditProfile;
