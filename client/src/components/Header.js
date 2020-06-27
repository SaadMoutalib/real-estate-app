import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../actions/userActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.logout();
  }

  render() {
    const { user, isAuthenticated } = this.props.user;
    return (
      <header>
        <div className="header-area ">
          <div className="header-top_area d-none d-lg-block">
            <div className="container">
              <div className="row">
                <div className="col-xl-5 col-md-5 ">
                  <div className="header_left">
                    <p>Bienvenu a Maroc Estate</p>
                  </div>
                </div>
                <div className="col-xl-7 col-md-7">
                  <div className="header_right d-flex">
                    <div className="short_contact_list">
                      <ul>
                        <li>
                          <a href="#">
                            {" "}
                            <i className="fa fa-envelope"></i>{" "}
                            support@marocestate.ma
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            {" "}
                            <i className="fa fa-phone"></i> +212 575 963 212
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="social_media_links">
                      <a href="#">
                        <i className="fa fa-linkedin"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="sticky-header" className="main-header-area">
            <div className="container">
              <div className="header_bottom_border">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-2">
                    <div className="logo">
                      <a href="/">
                        <img
                          style={{ width: "200px" }}
                          src="/img/final.png"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-7">
                    <div className="main-menu  d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li>
                            <NavLink exact activeClassName="active" to="/">
                              Acceuil
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              exact
                              activeClassName="active"
                              to="/annonces"
                            >
                              Annonces
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              exact
                              activeClassName="active"
                              to="/contact"
                            >
                              Contact
                            </NavLink>
                          </li>
                          {isAuthenticated ? (
                            <li>
                              <NavLink activeClassName="active" to="/profile">
                                <i
                                  className="fa fa-user-o"
                                  aria-hidden="true"
                                  style={{ fontSize: "15px" }}
                                ></i>
                                {" " + user.firstname + " " + user.lastname}
                              </NavLink>
                            </li>
                          ) : (
                            <>
                              <li>
                                <NavLink
                                  exact
                                  activeClassName="active"
                                  to="/login"
                                >
                                  Connexion
                                </NavLink>
                              </li>
                            </>
                          )}
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                    <div className="Appointment">
                      <div className="book_btn d-none d-lg-block">
                        <Link
                          to={
                            isAuthenticated
                              ? "/profile/post/" + user._id
                              : "/login"
                          }
                        >
                          Ajouter une annonce
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Header);
