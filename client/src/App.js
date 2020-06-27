import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { connect } from "react-redux";

import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Home from "./components/Home";
import { loadUser } from "./actions/userActions";
import AnnoncePage from "./components/AnnoncePage";
import Footer from "./components/Footer";
import Annonces from "./components/Annonces";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

class App extends Component {
  componentWillMount = () => {
    this.props.loadUser();
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/annonce/:annonceId" component={AnnoncePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/annonces" component={Annonces} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect(null, { loadUser })(App);
