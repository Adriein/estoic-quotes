const reducer = (state, action) => {
  switch (action.type) {
    case 'POST_QUOTE':
      console.log('action')
      console.log(action)
      return {
        quotes: [...state.quotes, action.response.data[0]],
      };
    case 'ERROR':
      console.log(action)
      break;
    default:
      return state;
  }
};
export default reducer;
