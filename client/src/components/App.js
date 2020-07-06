import React from 'react';
import '../App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { QuotesProvider } from '../context/QuotesContext';
import { ProtectedRoute } from './ProtectedRoute';

import Login from './Login';
import Landing from './Landing';
import Dashboard from './Dashboard';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact component={Login} />
        <QuotesProvider>
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />
        </QuotesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
