import Form from "react-validation/build/form";
import React, { Component } from "react";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import {isEmail} from "validator";

const required = value => {
    if(!value){
        return (
            <div className="alert alert-danger" role="alert">
                Ce champ est obligatoir!
            </div>
        );
    }
};

const email = value => {
    if(!isEmail(value)){
        return (
            <div className="alert alert-danger" role="alert">
                Email invalid!
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6) {
        return (
        <div className="alert alert-danger" role="alert">
            Le mot de passe doit contenir plus de 6 caractéres.
        </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role : "user",
        successful: false,
        message: ""
        };
    }

    onChangeFirstname(e) {
        this.setState({
        firstname: e.target.value
        });
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        });
        }

    onChangeEmail(e) {
        this.setState({
        email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
        password: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
        message: "",
        successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
        AuthService.register(
            this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.password,
            this.state.role
        ).then(
            response => {
            this.setState({
                message: response.data.message,
                successful: true
            });
            },
            error => {
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            this.setState({
                successful: false,
                message: resMessage
            });
            }
        );
        }
    }

    render() {
        return (
        <div className="col-md-12">
            <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
            />

            <Form
                onSubmit={this.handleRegister}
                ref={c => {
                this.form = c;
                }}
            >
                {!this.state.successful && (
                <div>
                    <div className="form-group">
                    <label htmlFor="firstname">First name</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.onChangeFirstname}
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
                        onChange={this.onChangeLastname}
                        validations={[required]}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
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
                        onChange={this.onChangePassword}
                        validations={[required, vpassword]}
                    />
                    </div>

                    <div className="form-group">
                    <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </div>
                )}

                {this.state.message && (
                <div className="form-group">
                    <div
                    className={
                        this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                    >
                    {this.state.message}
                    </div>
                </div>
                )}
                <CheckButton
                style={{ display: "none" }}
                ref={c => {
                    this.checkBtn = c;
                }}
                />
            </Form>
            </div>
        </div>
        );
    }
}
