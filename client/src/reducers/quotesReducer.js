const reducer = (state, action) => {
  switch (action.type) {
    case 'POST_QUOTE':
      return {
        quotes: [...state.quotes, action.response.data[0]],
      };
    case 'ERROR':
      return {
        return {
          quotes:[...state.quotes],
          errormsg: action.error[0].message
        }
      }
    default:
      return state;
  }
};
export default reducer;
