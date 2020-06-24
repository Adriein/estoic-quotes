import React, { createContext, useReducer } from 'react';
import authReducer from '../reducers/authReducer.js';

export const AuthContext = createContext();
export const DispatchContext = createContext();

const defaultAuth = {
  id: '',
  username: '',
  email: '',
  loggedIn: false,
  errormsg: '',
};
export function AuthProvider(props) {
  const [auth, dispatch] = useReducer(authReducer, defaultAuth);
  return (
    <AuthContext.Provider value={auth}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </AuthContext.Provider>
  );
}
