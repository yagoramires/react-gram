import { NavLink, Link } from 'react-router-dom';
import {
  BsSearch,
  BsHouseDoorFill,
  BsPersonFill,
  BsCameraFill,
} from 'react-icons/bs';

import './Navbar.css';

const Navbar = () => {
  return (
    <header className='header'>
      <Link to='/'>ReactGram</Link>
      <form className='nav-form'>
        <BsSearch color='white' />
        <input type='text' placeholder='Pesquisar' />
      </form>
      <ul className='nav-links'>
        <li>
          <NavLink to='/'>
            <BsHouseDoorFill />
          </NavLink>
        </li>
        <li>
          <NavLink to='/login'>Entrar</NavLink>
        </li>
        <li>
          <NavLink to='/register'>Cadastrar</NavLink>
        </li>

        {/* 
        <NavLink to='/'>
          <BsPersonFill/>
        </NavLink>
        <NavLink to='/'>
          <BsCameraFill/>
        </NavLink> 
        */}
      </ul>
    </header>
  );
};

export default Navbar;
