import { api, requestConfig } from '../utils/config';

// service serve para se conectar diretamente a api

const register = async (data) => {
  const config = await requestConfig('POST', data);

  try {
    const res = await fetch(api + '/users/register', config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem('user', JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const login = async (data) => {
  const config = await requestConfig('POST', data);

  try {
    const res = await fetch(api + '/users/login', config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem('user', JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
