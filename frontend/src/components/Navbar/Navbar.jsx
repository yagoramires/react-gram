// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import { logout, reset } from '../../slices/authSlice';

import {
  BsSearch,
  BsHouseDoorFill,
  BsPersonFill,
  BsCameraFill,
} from 'react-icons/bs';

import './Navbar.css';

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate('/login');
  };

  return (
    <header className='header'>
      <Link to='/'>ReactGram</Link>
      <form className='nav-form'>
        <BsSearch color='white' />
        <input type='text' placeholder='Pesquisar' />
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
    </header>
  );
};

export default Navbar;
