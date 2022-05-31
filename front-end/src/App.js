import React from 'react';
import './App.css';
import Certificate from './containers/Certificate/Certificate';
import NotFound from './containers/NotFound/NotFound';
import Home from './containers/Home/Home';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/address/:addr" component={Certificate} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
