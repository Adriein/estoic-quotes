const reducer = (state, action) => {
  switch (action.type) {
    case 'POST_QUOTE':
      return {
        selected: action.payload,
        quotes: [...state.quotes, action.payload.data[0]],
        open: true,
        form: true,
        errormsg: '',
        inputs: {
          topic: '',
          author: '',
          translatedAuthor: '',
          origin: '',
          translatedOrigin: '',
          quote: '',
          translatedQuote: '',
        },
      };
    case 'UPDATE_QUOTE':
      return {
        selected: action.selected,
        quotes: [],
        open: true,
        form: false,
        errormsg: '',
        inputs: {
          topic: '',
          author: '',
          translatedAuthor: '',
          origin: '',
          translatedOrigin: '',
          quote: '',
          translatedQuote: '',
        },
      };
    case 'ERROR':
      return {
        selected: '',
        quotes: [...state.quotes],
        open: true,
        form: true,
        errormsg: action.payload.data.errors[0].message,
        inputs: {
          topic: '',
          author: '',
          translatedAuthor: '',
          origin: '',
          translatedOrigin: '',
          quote: '',
          translatedQuote: '',
        },
      };
    case 'CLOSE':
      return {
        quotes: [...state.quotes],
        open: false,
        form: true,
        errormsg: '',
        inputs: {
          topic: '',
          author: '',
          translatedAuthor: '',
          origin: '',
          translatedOrigin: '',
          quote: '',
          translatedQuote: '',
        },
      };
    case 'FETCH_QUOTES':
      console.log(action.payload.data);
      return {
        quotes: [...action.payload.data],
        open: false,
        form: false,
        errormsg: '',
      };
    case 'TOGGLE_CREATE':
      return {
        selected: action.payload,
        quotes: [...state.quotes],
        open: false,
        form: true,
        errormsg: '',
        inputs: {
          topic: '',
          author: '',
          translatedAuthor: '',
          origin: '',
          translatedOrigin: '',
          quote: '',
          translatedQuote: '',
        },
      };
    case 'TOGGLE_VIEW':
      return {
        quotes: [...state.quotes],
        open: false,
        form: false,
        errormsg: '',
      };
    case 'EDIT':
      const selectedQuote = state.quotes.find(
        (quote) => quote._id === action.payload
      );
      return {
        selected: action.payload,
        quotes: [...state.quotes],
        open: false,
        form: true,
        errormsg: '',
        inputs: {
          topic: selectedQuote.topic,
          author: selectedQuote.author,
          translatedAuthor: selectedQuote.translations
            ? selectedQuote.translations.find(
                (translation) => translation.type === 'author'
              ).spanish
            : '',
          origin: selectedQuote.origin,
          translatedOrigin: selectedQuote.translations
            ? selectedQuote.translations.find(
                (translation) => translation.type === 'origin'
              ).spanish
            : '',
          quote: selectedQuote.quote,
          translatedQuote: selectedQuote.translations
            ? selectedQuote.translations.find(
                (translation) => translation.type === 'quote'
              ).spanish
            : '',
        },
      };
    case 'DELETE':
      const updatedQuotes = state.quotes.filter(
        (quote) => quote._id !== action.selected
      );
      return {
        selected: '',
        quotes: [...updatedQuotes],
        open: true,
        form: false,
        errormsg: '',
        inputs: {
          topic: '',
          author: '',
          translatedAuthor: '',
          origin: '',
          translatedOrigin: '',
          quote: '',
          translatedQuote: '',
        },
      };
    case 'CLOSE_DELETE_INFO':
      return {
        quotes: [...state.quotes],
        open: false,
        form: false,
        errormsg: '',
        inputs: {
          topic: '',
          author: '',
          translatedAuthor: '',
          origin: '',
          translatedOrigin: '',
          quote: '',
          translatedQuote: '',
        },
      };
    default:
      return state;
  }
};
export default reducer;
