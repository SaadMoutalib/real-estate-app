import React, { Component } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Alert, Spinner } from "reactstrap";

import { loginAdmin } from "../actions/userActions";
import { clearErrors } from "../actions/errorActions";
import { useHistory } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { isAuthenticated, isLoading } = useSelector((state) => state.user);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setMessage(error.msg.message);
    } else {
      setMessage(null);
    }

    if (isAuthenticated) {
      dispatch(clearErrors());
      history.push("/");
    }
  }, [error, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(loginAdmin(user));
  };

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Connexion</h1>
                    </div>
                    <AvForm onValidSubmit={handleLogin} class="user">
                      <div class="form-group">
                        <AvField
                          type="email"
                          name="email"
                          class="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                      </div>
                      <div class="form-group">
                        <AvField
                          type="password"
                          name="password"
                          class="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Mot de passe"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                      </div>
                      <br />
                      <button
                        href=""
                        class="btn btn-primary btn-user btn-block"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner size="sm" color="dark" />
                        ) : (
                          <span>Se Connecter</span>
                        )}
                      </button>
                    </AvForm>
                    <br />
                    {message && <Alert color="danger">{message}</Alert>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
