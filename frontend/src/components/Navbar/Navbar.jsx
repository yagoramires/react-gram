// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-react-gram.png';

import { logout, reset } from '../../slices/authSlice';

import {
  BsSearch,
  BsHouseDoorFill,
  BsPersonFill,
  BsCameraFill,
} from 'react-icons/bs';

import './Navbar.css';
import { useState } from 'react';

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <header className='header'>
      <div>
        <Link to='/'>
          <img src={Logo} alt='logo' className='logo' />
        </Link>
        <form className='nav-form' onSubmit={handleSearch}>
          <BsSearch color='white' />
          <input
            type='text'
            placeholder='Pesquisar'
            value={query || ''}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <ul className='nav-links'>
          {auth ? (
            <>
              <li>
                <NavLink to='/'>
                  <BsHouseDoorFill />
                </NavLink>
              </li>

              {user && (
                <li>
                  <NavLink to={`/users/${user._id}`}>
                    <BsCameraFill />
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to='/profile'>
                  <BsPersonFill />
                </NavLink>
              </li>
              <li>
                <span onClick={handleLogout}>Sair</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to='/login'>Entrar</NavLink>
              </li>
              <li>
                <NavLink to='/register'>Cadastrar</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
