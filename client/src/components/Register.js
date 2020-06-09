import Form from "react-validation/build/form";
import React, { Component } from "react";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { register } from "../actions/userActions";
import { clearErrors } from "../actions/errorActions";

import { isEmail } from "validator";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Alert } from "reactstrap";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoir!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Email invalid!
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe doit contenir plus de 6 caractéres.
      </div>
    );
  }
};

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

  componentDidUpdate(prevProps) {
    const { error, RegisterSuccess } = this.props;

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

    this.form.validateAll();
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          {this.state.message ? (
            <Alert color="danger">{this.state.message}</Alert>
          ) : null}
          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div>
              <div className="form-group">
                <label htmlFor="firstname">First name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Last name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  validations={[required, email]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>

            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
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
