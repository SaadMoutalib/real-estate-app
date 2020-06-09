import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import AnnoncesList from "./components/AnnoncesList";
import { loadUser } from "./actions/userActions";
import AnnonceWizard from "./components/AnnonceWizard";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <Navbar />
            <Container>
              <Switch>
                <Route exact path="/home" component={AnnoncesList} />
                <Route
                  exact
                  path="/annonces/create"
                  component={AnnonceWizard}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </Container>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
