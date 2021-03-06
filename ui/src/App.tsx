import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Boards from './pages/Boards';
import Home from './pages/Home';
import Login from './pages/Login';
import Settings from './pages/Settings';
import SignUp from './pages/Signup';
import AccountProvider from './providers/AccountProvider';
import AuthProtect from './providers/AuthProtect';


function App() {
  return (
    <div>
      <AccountProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/auth/login" exact component={Login}/>
            <Route path="/auth/register" exact component={SignUp}/>
            <AuthProtect>
              <Route path="/" exact component={Home}/>
              <Route path="/boards" exact component={Boards}/>
              <Route path="/settings" exact component={Settings}/>
            </AuthProtect>
          </Switch>
        </BrowserRouter>
      </AccountProvider>
    </div>
  );
}

export default App;
