import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Navigation />
          <Route exact path='/' component={Home} />
          <Route exact path='/posts/:id' component={PostPage} />
          <AuthRoute exact path='/register' component={Register} />
          <AuthRoute exact path='/login' component={Login} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
