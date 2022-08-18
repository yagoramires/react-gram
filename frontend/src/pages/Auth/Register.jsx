import { Link } from 'react-router-dom';
// Redux
import { register, reset } from '../../slices/authSlice';

// Hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import './Auth.css';
import Message from '../../components/Message/Message';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth); // Permite trazer a informação de qualquer reducer, no caso auth

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);
    dispatch(register(user));
  };

  // Limpa todos os states de Auth
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className='register'>
      <h2>ReactGram</h2>
      <p className='subtitle'>Cadastre-se para ver a foto de seus amigos.</p>
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

        {!loading && <input type='submit' value='Cadastrar' />}
        {loading && <input type='submit' value='Aguarde' disabled />}
        {error && <Message type={'error'} msg={error} />}
      </form>
      <p>
        Já possui uma conta? <Link to='/login'>Entre aqui.</Link>
      </p>
    </div>
  );
};

export default Register;
