import axios from 'axios';
const URL = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
  withCredentials: true,
});

const PocFetch = {
  changeProfileImage: async (data) => {
    let response = await URL.patch('profile', data);
    console.log(response);
  },
  logout: async () => {
    let response = await URL.get('logout');
    return response;
  },
  isLogged: async () => {
    try {
      let result = await URL.get('islogged');
      return result.data;
    } catch (error) {
      return error.response;
    }
  },
  isAdmin: async () => {
    try {
      let result = await URL.get('protected-next-level');
      return result.data;
    } catch (error) {
      return error.response;
    }
  },
  googleLogin: async (response) => {
    console.log('dentro da função da api service', response);
    const { accessToken } = response;
    console.log('accessToken', accessToken);
    if (!accessToken) return null;
    const googleresponse = {
      access_token: accessToken,
    };
    let result = await URL.post('login/google', googleresponse);
    return result.data;
  },
  getUserInformation: async () => {
    let response = await URL.get('protected');
    return response.data.user;
  },
  create: async (data) => {
    return await URL.post('/register', data);
  },
  login: async (data) => {
    return await URL.post('/login', data);
  },
};

export default PocFetch;
