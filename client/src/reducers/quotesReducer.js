const reducer = (state, action) => {
  switch (action.type) {
    case 'POST_QUOTE':
      console.log(action);
      return {
        quotes: [...state.quotes, action.response.data[0]],
        open: true,
        form: true,
      };
    case 'ERROR':
      console.log(action);
      break;
    case 'CLOSE':
      return {
        quotes: [...state.quotes],
        open: false,
        form: true,
      };
    case 'FETCH_QUOTES':
      console.log(action.payload);
      return {
        quotes: [...action.payload.data],
        open: false,
        form: false,
      };
    case 'TOGGLE_CREATE':
      return {
        quotes: [...state.quotes],
        open: false,
        form: true,
      };
    case 'TOGGLE_VIEW':
      return {
        quotes: [...state.quotes],
        open: false,
        form: false,
      };
    default:
      return state;
  }
};
export default reducer;
