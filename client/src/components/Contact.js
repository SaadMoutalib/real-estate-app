import React, { Component } from "react";
import emailjs from "emailjs-com";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Alert, Spinner } from "reactstrap";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: "",
    };
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentDidMount() {
    document.title = "Contact - Maroc Estate";
  }

  beforeSubmit = (event) => {
    event.persist();
  };

  sendEmail(event, values) {
    event.preventDefault();
    this.setState({ loading: true });

    emailjs
      .sendForm(
        "gmail",
        "contactus",
        event.target,
        "user_enuAZWcVYOwv64ST7gpWc"
      )
      .then(
        (result) => {
          this.setState({ loading: false, message: result.text });
        },
        (error) => {
          this.setState({ loading: false, message: error.text });
        }
      );
  }

  render() {
    return (
      <>
        <div className="bradcam_area bradcam_bg_1">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="bradcam_text text-center">
                  <h3>Cantactez nous</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="contact-title">Entrer en contact</h2>
              </div>
              <div className="col-lg-8">
                <AvForm
                  className="form-contact contact_form"
                  onValidSubmit={this.sendEmail}
                  id="contactForm"
                  beforeSubmitValidation={this.beforeSubmit}
                >
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <AvField
                          className="form-control w-100"
                          name="message"
                          id="message"
                          cols="30"
                          rows="9"
                          type="textarea"
                          placeholder="Message"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Ce champs est requis.",
                            },
                            minLength: {
                              value: 10,
                              errorMessage:
                                "Your name must be between 20 and 255 characters",
                            },
                            maxLength: {
                              value: 255,
                              errorMessage:
                                "Your name must be between 20 and 255 characters",
                            },
                          }}
                        ></AvField>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <AvField
                          className="form-control valid"
                          name="from_name"
                          id="name"
                          type="text"
                          placeholder="Entrez votre nom"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Ce champs est requis.",
                            },
                            pattern: {
                              value: "^[A-Za-z ]+$",
                              errorMessage:
                                "Ce champs doit contenir que des lettres.",
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <AvField
                          className="form-control valid"
                          name="from_email"
                          id="email"
                          type="email"
                          placeholder="Email"
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
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <AvField
                          className="form-control"
                          name="from_subject"
                          id="subject"
                          type="text"
                          placeholder="Entez le sujet"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Ce champs est requis.",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <button
                      type="submit"
                      className="button button-contactForm boxed-btn"
                      disabled={this.state.loading}
                    >
                      {this.state.loading ? (
                        <Spinner size="sm" color="dark" />
                      ) : (
                        <span>Envoyer</span>
                      )}
                    </button>
                    <br />
                  </div>
                </AvForm>
                {this.state.message == "OK" ? (
                  <Alert color="success">Votre e-mail a bien été envoyé</Alert>
                ) : this.state.message != "" ? (
                  <Alert color="danger">
                    Une erreur s'est produite, votre e-mail n'a pas pu être
                    envoyé
                  </Alert>
                ) : null}
              </div>
              <div className="col-lg-3 offset-lg-1">
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-home"></i>
                  </span>
                  <div className="media-body">
                    <h3>Casablanca, Maroc.</h3>
                    <p>Bouskoura, 20100</p>
                  </div>
                </div>
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-tablet"></i>
                  </span>
                  <div className="media-body">
                    <h3>+212 575 963 212</h3>
                    <p>Lundi au Vendredi 9h a 18h</p>
                  </div>
                </div>
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-email"></i>
                  </span>
                  <div className="media-body">
                    <h3>support@marocestate.ma</h3>
                    <p>Envoyer-nous votre requête a tout moment!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
