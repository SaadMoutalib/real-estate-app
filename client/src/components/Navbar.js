import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { user } = this.props;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    this.props.logout();
  }

  render() {
    const { user, isAuthenticated } = this.props.user;
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

          {isAuthenticated && (
            <li className="nav-item">
              <Link to={"/annonces/create"} className="nav-link">
                Créer annonce
              </Link>
            </li>
          )}
        </div>

        {isAuthenticated ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {user.firstname}
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

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
