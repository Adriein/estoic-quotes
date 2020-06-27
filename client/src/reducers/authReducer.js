const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        id: action.response.data[0]._id,
        username: action.response.data[0].username,
        email: action.response.data[0].email,
        errormsg: undefined,
      };
    case 'LOGIN_ERROR':
      return {
        id: '',
        username: '',
        email: '',
        token: undefined,
        errormsg: /*action.error[0].message*/'Invalid Credentials',
      };
    case 'LOGOUT':
      return state;
    default:
      return state;
  }
};
export default reducer;
