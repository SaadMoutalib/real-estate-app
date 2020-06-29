import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert, Spinner } from "reactstrap";
import { changePassword } from "../actions/userActions";
import { clearErrors } from "../actions/errorActions";

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.state = {
      password: "",
      newPassword: "",
      message: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangePassword = () => {
    const { user } = this.props.user;

    this.props.changePassword(
      this.state.newPassword,
      this.state.password,
      user.email,
      user._id
    );
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      if (error.id === "CHANGE_PASSWORD_FAIL") {
        this.setState({ message: error.msg.message });
      } else {
        this.setState({ message: null });
        this.props.clearErrors();
        this.props.history.push("/login");
      }
    }
  }

  render() {
    const { user, isLoading } = this.props.user;
    return (
      <div style={{ paddingTop: "50px" }} className="property_details_banner">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 d-flex justify-content-center">
              <div className="col-md-5">
                <div className="card card-container">
                  {isLoading ? (
                    <div className="col">
                      <Spinner size="lg" color="dark" />
                    </div>
                  ) : (
                    <AvForm onValidSubmit={this.handleChangePassword}>
                      <AvField
                        type="email"
                        name="email"
                        label="Email"
                        disabled
                        value={user.email}
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
                        label="Nouveau mot de passe"
                        name="newPassword"
                        value={this.state.newPassword}
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
                            value: "newPassword",
                            errorMessage:
                              "Les mots de passe doivent être identiques.",
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
                            <span>Confirmer</span>
                          )}
                        </button>
                      </div>

                      {this.state.message && (
                        <Alert color="danger">{this.state.message}</Alert>
                      )}
                    </AvForm>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PersonalInformation.propTypes = {
  changePassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errot: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
});

export default connect(mapStateToProps, { clearErrors, changePassword })(
  PersonalInformation
);
