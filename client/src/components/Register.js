import React, { Component } from "react";

import { AvForm, AvField } from "availity-reactstrap-validation";

import { Alert, Row, Col } from "reactstrap";

import { register } from "../actions/userActions";
import { clearErrors } from "../actions/errorActions";

import { connect } from "react-redux";

import PropTypes from "prop-types";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
      message: null,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    RegisterSuccess: PropTypes.object,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  confirmpass = (value) => {
    if (value == this.state.password) {
      return (
        <div className="alert alert-danger" role="alert">
          Le mot de passe doit contenir plus de 6 caractéres.
        </div>
      );
    }
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ message: error.msg.message });
      } else {
        this.setState({ message: null });
        this.props.clearErrors();
        this.props.history.push("/login");
      }
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister(e) {
    e.preventDefault();

    const { firstname, lastname, email, password, role } = this.state;

    const newUser = {
      firstname,
      lastname,
      email,
      password,
      role,
    };

    this.props.register(newUser);
  }

  render() {
    return (
      <div>
        <div className="property_details_banner">
          <div className="container">
            <div className="row ">
              <div className="col-xl-12 d-flex justify-content-center">
                <div className="col-md-6">
                  <div className="card card-container">
                    <h2>Créer un compte</h2>
                    <br />
                    {this.state.message ? (
                      <Alert color="danger">{this.state.message}</Alert>
                    ) : null}
                    <AvForm onValidSubmit={this.handleRegister}>
                      <Row>
                        <Col>
                          <AvField
                            label="Nom"
                            type="text"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.onChange}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Ce champs est requis.",
                              },
                              pattern: {
                                value: "^[A-Za-z]+$",
                                errorMessage:
                                  "Ce champs doit contenir que des lettres.",
                              },
                            }}
                          />
                        </Col>

                        <Col>
                          <AvField
                            type="text"
                            label="Prenom"
                            name="lastname"
                            value={this.state.lastname}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Ce champs est requis.",
                              },
                              pattern: {
                                value: "^[A-Za-z]+$",
                                errorMessage:
                                  "Ce champs doit contenir que des lettres.",
                              },
                            }}
                            onChange={this.onChange}
                          />
                        </Col>
                      </Row>

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

                      <AvField
                        type="password"
                        label="Confirmer mot de passe"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.onChange}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Ce champs est requis.",
                          },
                          match: {
                            value: "password",
                            errorMessage:
                              "Les mots de passe doivent être identiques.",
                          },
                        }}
                      />
                      <div className="form-group">
                        <button className="genric-btn primary radius btn-block">
                          Sign Up
                        </button>
                      </div>
                    </AvForm>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  RegisterSuccess: state.user.success,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
