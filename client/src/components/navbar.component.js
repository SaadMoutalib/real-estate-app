import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AuthService from "../services/auth.service";

class Navbar extends Component {
  constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
        currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
        this.setState({
            currentUser: user
        });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser } = this.state;

        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                Immobilier
                </Link>
                <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                    Acceuil
                    </Link>
                </li>

                {currentUser && (
                    <li className="nav-item">
                    <Link to={"/creerannonces"} className="nav-link">
                        Créer annonce
                    </Link>
                    </li>
                )}
                </div>

                {currentUser ? (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                        {currentUser.firstname}
                    </Link>
                    </li>
                    <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                        Se deconnecter
                    </a>
                    </li>
                </div>
                ) : (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                        Se connecter
                    </Link>
                    </li>

                    <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                        S'enregistrer
                    </Link>
                    </li>
                </div>
                )}
            </nav>
        );
    }
}

export default Navbar;