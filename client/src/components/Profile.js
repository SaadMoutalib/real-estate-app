import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/userActions";
import AnnonceWizard from "./AnnonceWizard";
import ManageAnnonces from "./ManageAnnonces";
import PersonalInformation from "./PersonalInformation";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import PropTypes from "prop-types";
import MesFavoris from "./MesFavoris";

class Profile extends Component {
  logOut = () => {
    this.props.logout();
    this.props.history.push("/");
  };
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
  };
  render() {
    const { user, isAuthenticated } = this.props.user;
    return (
      <>
        <div className="bradcam_area bradcam_bg_1">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="bradcam_text text-center">
                  <h3>Profile</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav
          className="navbar navbar-expand-lg navbar-dark "
          style={{ backgroundColor: "#001d38" }}
        >
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="nav-link"
                  to={`${this.props.match.url}/information`}
                >
                  Information personnel
                </NavLink>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      exact
                      activeClassName="active"
                      className="nav-link"
                      to={`${this.props.match.url}/post`}
                    >
                      Ajouter annonce
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      className="nav-link"
                      to={`${this.props.match.url}/gerer`}
                    >
                      Gérer annonces
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active"
                      className="nav-link"
                      to={`${this.props.match.url}/favoris`}
                    >
                      Mes Favoris
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
            <button
              onClick={this.logOut}
              className="btn btn-outline-danger my-2 my-sm-0"
              type="submit"
            >
              Se deconnecter
            </button>
          </div>
        </nav>
        <Switch>
          <Route
            path={`${this.props.match.path}/post`}
            component={AnnonceWizard}
          />
          <Route
            exact
            path={`${this.props.match.path}/gerer`}
            render={(props) => <ManageAnnonces {...props} />}
          />
          <Route
            path={`${this.props.match.path}/information`}
            render={(props) => <PersonalInformation {...props} />}
          />
          <Route
            path={`${this.props.match.path}/favoris`}
            render={(props) => <MesFavoris {...props} />}
          />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Profile);
