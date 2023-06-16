import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Components
import Login from './Login';
import Map from './Map';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic and set loggedIn to true upon successful login
    setLoggedIn(true);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          < Login />
        </Route>
        <Route path="/">
            <Map />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
