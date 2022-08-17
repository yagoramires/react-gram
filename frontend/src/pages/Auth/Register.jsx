import { Link } from 'react-router-dom';
// Redux
import { register, reset } from '../../slices/authSlice'

// Hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch()

  const  { loading , error } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user)

  };

  return (
    <div className="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver a foto de seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          placeholder='Nome'
        />
        <input
          type='email'
          name='email'
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='E-mail'
        />
        <input
          type='password'
          name='password'
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Senha'
        />
        <input
          type='password'
          name='confirmPassword'
          value={confirmPassword || ''}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirme a senha'
        />
        <input type='submit' value='Cadastrar' />
      </form>
      <p>Já possui uma conta? <Link to='/login'>Entre aqui.</Link></p>
    </div>
  );
};

export default Register;
