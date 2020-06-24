import axios from 'axios';

const reducer = async (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      const [response] = (
        await axios.post('api/auth/signin', action.credentials)
      ).data;
      if (response.errors)
        return {
          id: '',
          username: '',
          email: '',
          loggedIn: false,
          errormsg: response.errors.message,
        };
      return {
        id: '',
        username: '',
        email: '',
        loggedIn: true,
        errormsg: response.errors.message,
      };
    case 'LOGOUT':
      return state;
    default:
      return state;
  }
};
export default reducer;
