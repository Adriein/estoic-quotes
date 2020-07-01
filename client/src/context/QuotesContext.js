import React, { createContext, useReducer } from 'react';
import reducer from '../reducers/quotesReducer.js';

export const QuotesContext = createContext();
export const QuoteDispatchContext = createContext();

const defaultQuotes = {
  quotes: [],
  open: false,
  form: false,
};
export function QuotesProvider(props) {
  const [quotes, quoteDispatch] = useReducer(reducer, defaultQuotes);
  return (
    <QuotesContext.Provider value={quotes}>
      <QuoteDispatchContext.Provider value={quoteDispatch}>
        {props.children}
      </QuoteDispatchContext.Provider>
    </QuotesContext.Provider>
  );
}
