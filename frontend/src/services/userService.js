import { api, requestConfig } from '../utils/config';

// Get users details

const profile = async (data, token) => {
  const config = requestConfig('GET', data, token);

  try {
    const res = await fetch(api + '/users/profile', config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (data, token) => {
  const config = requestConfig('PUT', data, token, true);

  try {
    const res = await fetch(api + '/users/', config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile,
};

export default userService;