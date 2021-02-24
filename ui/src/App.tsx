import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Boards from './pages/Boards';
import Home from './pages/Home';
import Login from './pages/Login';
import AccountProvider from './providers/AccountProvider';
import AuthProtect from './providers/AuthProtect';
import { theme } from './theme';

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AccountProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/auth/login" exact component={Login}/>
              <AuthProtect>
                <Route path="/" exact component={Home} />
                <Route path="/boards" exact component={Boards}/>
              </AuthProtect>
            </Switch>
          </BrowserRouter>
        </AccountProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
