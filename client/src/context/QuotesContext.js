import React, { createContext, useReducer } from 'react';
import quotesReducer from '../reducers/quotesReducer.js';

export const QuotesContext = createContext();
export const DispatchContext = createContext();

const defaultQuotes = {
  quotes: [],
};
export function QuotesProvider(props) {
  const [quotes, dispatch] = useReducer(quotesReducer, defaultQuotes);
  return (
    <QuotesContext.Provider value={quotes}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </QuotesContext.Provider>
  );
}
