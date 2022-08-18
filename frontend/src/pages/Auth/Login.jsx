import { Link } from 'react-router-dom';
import Message from '../../components/Message/Message';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { login, reset } from '../../slices/authSlice';

import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className='login'>
      <h2>ReactGram</h2>
      <p className='subtitle'>Entre para ver o que há de novo</p>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='E-mail'
          required
        />
        <input
          type='password'
          name='password'
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Senha'
          required
        />

        {!loading && <input type='submit' value='Entrar' />}
        {loading && <input type='submit' value='Aguarde' disabled />}
        {error && <Message type={'error'} msg={error} />}
      </form>
      <p>
        Não possui uma conta? <Link to='/register'>Registre-se.</Link>
      </p>
    </div>
  );
};

export default Login;
