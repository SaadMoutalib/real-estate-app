import React, { Component } from "react";

import { AvForm, AvField } from "availity-reactstrap-validation";

import { Alert, Spinner } from "reactstrap";

import { login } from "../actions/userActions";
import { clearErrors } from "../actions/errorActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      email: "",
      password: "",
      message: "",
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.title = "Login " + document.title;
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ message: error.msg.message });
      } else {
        this.setState({ message: null });
      }
    }
    if (isAuthenticated) {
      clearErrors();
      this.props.history.push("/");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };

    this.props.login(user);
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="property_details_banner">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 d-flex justify-content-center">
              <div className="col-md-5">
                <div className="card card-container">
                  <img
                    src="/img/final_footer.png"
                    alt="profile-img"
                    className="profile-img-card"
                  />

                  <AvForm onValidSubmit={this.handleLogin}>
                    <AvField
                      type="email"
                      name="email"
                      label="Email"
                      value={this.state.email}
                      onChange={this.onChange}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Ce champs est requis.",
                        },
                        email: {
                          value: true,
                          errorMessage: "Email invalid.",
                        },
                      }}
                    />

                    <AvField
                      type="password"
                      label="Mot de passe"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Ce champs est requis.",
                        },
                        minLength: {
                          value: 6,
                          errorMessage:
                            "Le mot de passe doit contenir au moins 6 caractères.",
                        },
                      }}
                    />

                    <div className="form-group">
                      <button
                        className="genric-btn primary radius btn-block"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner size="sm" color="dark" />
                        ) : (
                          <span>Se Connecter</span>
                        )}
                      </button>
                    </div>

                    {this.state.message && (
                      <Alert color="danger">{this.state.message}</Alert>
                    )}
                  </AvForm>
                </div>
              </div>
            </div>
          </div>
          <p style={{ color: "white" }} class="text-center">
            Vous n'avez pas de compte?
            <Link to="/register" style={{ color: "#fd955d" }} href="#">
              {" "}
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  isLoading: state.user.isLoading,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
