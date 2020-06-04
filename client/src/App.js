import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import {Provider} from 'react-redux';
import store from './store';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Navbar from "./components/navbar.component";

class App extends Component {

  render() {
    return (
      <Router>
        <Provider store={store}>
        <div className="App">
          <Navbar/>
          <div className="container mt-3">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </div>
        </Provider>
      </Router>
    );
  }
} 

export default App;
